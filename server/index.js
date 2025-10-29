import "dotenv/config.js";
import express from "express";
import cors from "cors";
import connectDB from "./src/lib/db.js";
import router from "./src/routes/router.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.use("/api", router);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
  });
});
