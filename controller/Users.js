import Users from "../models/UsersModel.js";
import argon2 from 'argon2';

export const getUsers =  async(req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['uuid', 'name', 'email', 'role'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createUser = async (req, res) => {
    const { name, email, password, confPassword, role } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Password and confirm password do not match" });
    
    try {
        const hashPassword = await argon2.hash(password);
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({ msg: "Registration Successful" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updateUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const { name, email, password, confPassword, role } = req.body;
    
    if (password && password !== confPassword) return res.status(400).json({ msg: "Password and confirm password do not match" });

    let hashedPassword;
    if (password) {
        hashedPassword = await argon2.hash(password);
    } else {
        hashedPassword = user.password;
    }

    try {
        await Users.update({
            name: name || user.name,
            email: email || user.email,
            password: hashedPassword,
            role: role || user.role
        }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User not found" });
    
    try {
        await Users.destroy({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const register = async (req, res) => {
    const { name, email, password, confPassword } = req.body;

    // Validasi input
    if (!name || !email || !password || !confPassword) {
        return res.status(400).json({ msg: "All fields must be filled" });
    }

    // Validasi password dan confirm password
    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password and confirm password do not match" });
    }

    try {
        // Hash password menggunakan argon2
        const hashPassword = await argon2.hash(password);

        // Buat pengguna baru
        await Users.create({
            name: name,
            email: email,  // Tambahkan email di sini
            password: hashPassword,
            role: "user"
        });

        // Sukses
        res.status(201).json({ msg: "User Registered Successfully" });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const getTotalUsers = async (req, res) => {
    try {
      // Hitung total pengguna di koleksi Users
      const totalUsers = await Users.count(); 
  
      // Periksa apakah totalUsers berisi data
      if (totalUsers !== null) {
        // Kirimkan respons dengan data total pengguna
        res.status(200).json({ total: totalUsers });
      } else {
        // Jika totalUsers adalah null, tangani kondisi ini
        res.status(500).json({ msg: "Gagal menghitung total pengguna", error: "Total pengguna tidak ditemukan." }); 
      }
    } catch (error) {
      console.error("Gagal menghitung total pengguna:", error.message);
      res.status(500).json({ msg: "Gagal menghitung total pengguna", error: error.message });
    }
  };
  