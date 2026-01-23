import app from "./app.js"
import { connectdb } from "./database/db.database.js"
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
})


try { 
    connectdb();
} catch (error) {
    console.log("Error connecting to the database", error);
}

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

