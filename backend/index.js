import express from "express"
import "dotenv/config"
import cors from "cors"
import path from 'path'
import cookieParser from "cookie-parser";
import ConnectDB from "./config/ConnectDB.js";
import userRoute from "./routers/user.route.js";
import chatRoute from "./routers/chat.route.js";


const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));
app.use(cookieParser());
const __dirname = path.resolve();
app.use(`/backend/uploads/files`, express.static(`${__dirname}/backend/uploads/files`))
app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    });
}
const port = process.env.PORT || 1234;
app.listen(port, () => {
    ConnectDB();
    console.log(`Server is running at 
http://localhost:${port}`);
})