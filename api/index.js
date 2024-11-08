const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const userRoute = require("./routes/user");
const app = express();

dotenv.config();
mongoose.connect(process.env.MONGO_URL , console.log("Conected to mongoDB"));

app.use("/images" , express.static(path.join(__dirname , "public/images")));

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//image uploading
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null , "public/images");
    },
    filename:(req,file,cb)=>{
        cb(null , req.body.name);
    },
});

const upload = multer({storage});
app.post("/api/upload" , upload.single("file") , (req , res) => {
    try{
        return res.status(200).json("Image uploaded successfully.");
    }catch(error){
        console.log(error);
    }
});

app.use('/api/user' , userRoute);

app.listen(8800, () => {
    console.log("Server is running");
})