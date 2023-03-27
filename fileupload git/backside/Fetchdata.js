const aws=require("aws-sdk");
const conf=require("./package.json");
const express=require("express");
const app=express();
const cors = require("cors");

app.use(cors());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})


app.listen(5000,(req,res)=>{
    console.log("port no is 5000");
});


// app.get("/",(req,res)=>{

//     app.use(function (req, res, next) {
//         res.removeHeader('X-Powered-By');
//         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000/');
//         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//         res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
//         res.setHeader('Access-Control-Allow-Credentials', true);
//         next();
//       });
      

//     aws.config.update({
//         accessKeyId: 'AKIAVJREMHXCIKIMPLN5',
//         secretAccessKey: '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',
//         region:'ap-south-1'
//     });
//         res.send("wellcome");
//         var params = {
//             Bucket: 'bvc123',
//             Prefix: 'media',
//          };
//          const s3=new aws.S3();
//          s3.listObjects(params, function (err, data) {
//              if (err) console.log(err, err.stack);
//              else {
//                  console.log('objects list', data);
//                  res.send(data) // successful response
//              }
//          });
// })



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
}
);
