const express = require('express');
const multer = require('multer');
const ms3=require("multer-s3");
const aws = require('aws-sdk');
const app = express();
const fs=require('fs');
const cors = require("cors");

// this code is use when cors to parse data between nodejs api and fornt end side call api
app.use(cors());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})

//give the s3 keys
const s3 = new aws.S3({
  accessKeyId: 'AKIAVJREMHXCIKIMPLN5',
  secretAccessKey: '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',
});

const upload = multer({ dest: 'uploads/' });


// this code is create api to connect with s3 server
app.post('/api/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  console.log(file)
  const params = {
    Bucket: 'bvc123',
    Key: file.originalname,
    Body: file.filename,
  };
  console.log(params)
  try {
    await s3.upload(params).promise();
    res.send('File uploaded successfully');
  } catch (error) {
    console.error('Error uploading file: ', error);
    res.status(500).send('Error uploading file',error);
  }
});


app.get('/fetchdata',async(req,res)=>{
  try {
      aws.config.setPromisesDependency();
      aws.config.update({
          accessKeyId: 'AKIAVJREMHXCIKIMPLN5',
          secretAccessKey: '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',
          region:'ap-south-1'
      });
      // res.send("data fetched")
      const s3=new aws.S3();
      const response= await s3.listObjectsV2({
          Bucket:'bvc123'
      }).promise();
      // console.log(response)
      res.send(response)
      
  // alert(response)
  } catch (e) {
      console.log("error to fetch",e);
  }
  debugger;
})

// const Bucket="bvc123";
// app.get("/download/:filename",async(req,res)=>{
//   const filename=req.params.filename;
//   console.log(filename)
//   const option={
//     Bucket:Bucket,
//     Key:filename
//   }
//   let x= await s3.getSignedUrl("getObject",option)
//   res.send(x);

// });

const Bucket="bvc123";
app.get("/download/:filename",async(req,res)=>{
  const filename=req.params.filename;
  let x= await s3.getSignedUrl("getObject",{Bucket:Bucket,Key:filename})
  res.send(x);
  console.log('file download successfully');
});


// create server to run api
app.listen(4000, () => {
  console.log('Server listening on port 4000');
});
