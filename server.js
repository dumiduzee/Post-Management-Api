import { configDotenv } from "dotenv";
import express, { json } from "express";
import router from "./routes/auth.route.js";
import { database } from "./database/db.js";
import post_router from "./routes/post.route.js";
const app = express();
configDotenv();
app.use(json());

database(process.env.MONGO_URL);

app.use("/api/v4", router);
app.use("/api/v4/post", post_router);
app.listen(process.env.PORT, () => {
  console.log(`Server running http://localhost:${process.env.PORT}`);
});
