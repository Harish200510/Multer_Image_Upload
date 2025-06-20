import express from "express";
import multer from "multer";
import path from "path";
import upload from "./upload.js";

import { fileURLToPath } from "url";
import {dirname} from "path"

const __filename=fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);


const app=express();
const folderLocation=path.join(__dirname,"uploads")

app.use("/uploads",express.static(folderLocation));




//const upload = multer({ dest: 'uploads/' })


app.get("/",(req,res)=>{
    res.send("Api is Working Buddy")
    
})

app.post("/upload/file",upload.single("image"),(req,res)=>{
    res.json({message:"File Uploaded Successfully",data:req.file})
})

app.post("/upload/files",upload.array("images",3),(req,res)=>{
    res.send({message:"Files Uploaded Successfully",data:req.files})
}) 


app.use((err,req,res,next)=>{
    if(err instanceof multer.MulterError){
        switch (err.code){
            case "LIMIT_FILE_SIZE":
                return res.status(400).json({message:"Error:file too Large! Maximum size is 1MB"});
            default:
                return res.status(400).json({message:`Multer Error:${err}`})
            }
    }
    else res.status(400).json({Error:err.message})
})




app.listen(8000,()=>{
    console.log("Server is running on http://localhost:8000");
})