import express from "express";
import cors from "cors";
import session from "express-session";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import ChatbotRuleRoute from "./routes/ChatbotRuleRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import default_responses from "./routes/default_responses.js";
import handleChatbotRoute from "./routes/handleChatbotRoute.js";
import intent from "./routes/IntentRoute.js"
import ChatApp from "./routes/ChatRoute.js";
import http from "http";
import { initSocket } from "./socket/socket.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({ db });

(async () => {
    try {
        await db.authenticate(); // Test koneksi database
        console.log("Database connected...");
        await db.sync(); // Sinkronisasi tabel
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // Keluar jika database gagal terhubung
    }
})();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: "auto" }
}));

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173"
}));

app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(ChatbotRuleRoute);
app.use(AuthRoute);
app.use(default_responses);
app.use(handleChatbotRoute);
app.use(ChatApp);
app.use(intent);

const server = http.createServer(app);
initSocket(server);

server.listen(process.env.APP_PORT, () => {
    console.log(`Backend listening on port ${process.env.APP_PORT}`);
}).on('error', (err) => {
    console.error("Server failed to start:", err.message);
});
