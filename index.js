var express = require('express');
const app = express();
var cloudinary = require('cloudinary').v2; 
var path = require('path');
var fileupload = require('express-fileupload');
app.use(fileupload({
    useTempFiles: true
}));

cloudinary.config({
    cloud_name: 'sample-upload',
    api_key: '219285811648692',
    api_secret: '99_CaZm6W_VAi0qXDgN68z_NE_Y'
});

app.get("/", (req, res, next) => {
    // res.status(200).send("Hello World");
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.post("/upload", function(req, res, next) {
    const file = req.files.photo;
    console.log(file);
    cloudinary.uploader.upload(file.tempFilePath, function(err, result) {
        console.log("Error: ", err);
        console.log("Result: ", result);
    });
    res.status(200).send("Image Uploaded!");
    res.status(500).send("Error!");
    // file.mv("./uploads/" + file.name, function(err, result){
    //     if(err)
    //         throw err;
    //     res.send({
    //         success: true,
    //         message: "File uploaded!"
    //     });
    // });
})


app.listen(3000, () => {
    console.log("Started on port 3000");
});
