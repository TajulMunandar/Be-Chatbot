import { Server } from 'socket.io';
import ChatApp from "../models/ChatAppModel.js";
import User from "../models/UsersModel.js";

let io; // Variabel untuk menyimpan instance Socket.IO

export const initSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', // Pastikan nilai ini dapat diatur via .env
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected');

        // Event saat user bergabung
        socket.on('join', async (userId) => {
            try {
                if (!userId) {
                    return socket.emit('error', { msg: 'Invalid userId' });
                }

                // Validasi apakah user dengan userId tersebut ada
                const user = await User.findOne({ where: { uuid: userId } });
                if (!user) {
                    return socket.emit('error', { msg: 'User not found' });
                }

                // Pastikan pengguna bergabung ke room terkait
                socket.join(`room-${userId}`);

                // Ambil pesan sebelumnya berdasarkan user.id (ID numerik)
                const messages = await ChatApp.findAll({
                    where: { userId: user.id },
                    include: [{ model: User, attributes: ['name', 'email'] }],
                    order: [['createdAt', 'ASC']]
                });

                // Kirim riwayat pesan ke klien
                socket.emit('previousMessages', messages);
            } catch (error) {
                socket.emit('error', { msg: `Failed to join room: ${error.message}` });
            }
        });

        // Event pengiriman pesan
        socket.on('sendMessage', async (data) => {
            try {
                const { message, userId } = data;

                if (!message || !userId) {
                    return socket.emit('error', { msg: 'Invalid data' });
                }

                // Verifikasi userId
                const user = await User.findOne({ where: { uuid: userId } });
                if (!user) {
                    return socket.emit('error', { msg: 'User not found' });
                }

                // Simpan pesan ke database
                const chat = await ChatApp.create({ message, userId: user.id });

                // Ambil pesan lengkap dengan informasi pengguna
                const fullChat = await ChatApp.findOne({
                    where: { id: chat.id },
                    include: [{ model: User, attributes: ['name', 'email'] }]
                });

                // Kirim pesan hanya ke room yang sesuai
                io.to(`room-${userId}`).emit('message', fullChat);
            } catch (error) {
                socket.emit('error', { msg: `Failed to send message: ${error.message}` });
            }
        });

        // Event saat pengguna terputus
        socket.on('disconnect', () => {
            try {
                console.log('User disconnected');
            } catch (error) {
                console.error('Error in disconnect event:', error.message);
            }
        });
    });

    return io; // Kembalikan instance io untuk memastikan inisialisasi berhasil
};

// Getter untuk mengakses instance io
export const getIO = () => {
    if (!io) {
        throw new Error("Socket.IO not initialized. Call initSocket first.");
    }
    return io;
};
