//importing multer for file upload handling
import multer from "multer";

//importing path for file path handling like getting the file extension and file originalname while uploading the file
import path from "path";

//importing uuid for generating unique file names to avoid overwriting files with the same name
import {v4 as uuid} from "uuid";


//set image size
let file_size=1*1024*1024


//creating a storage configuration for multer
const storage=multer.diskStorage({
   
    //destination where the uploaded files will be stored
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    //filename function to define how the uploaded files will be named
    //using the original file name with a unique identifier to avoid overwriting files with the same
    filename:(req,file,cb)=>{
        const extension=path.extname(file.originalname);
        
        //const newName=`img--${Math.round(Math.random()*1e9)}${extension}`;
        
        const newName=`${uuid()}${extension}`;
        

        cb(null,newName);
    },
})
 
const fileFilter=(req,file,cb)=>{
    //we are allowing these file types
    const allowedTypes=/jpeg|jpg|png|pdf/

    //Checking the given file is among the seted file type it will return (true or false)
    const isAllowed=allowedTypes.test(file.mimetype)

    if(isAllowed){
        cb(null,true);
    }
    else {
        cb(new Error("Only JPEG, PNG, or PDF files are allowed"),false)
    }
}

//creating an upload instance with the storage configuration
const upload=multer({

      storage:storage,
      limits:{
        fileSize:file_size
      },
      fileFilter:fileFilter,
});

export default upload;