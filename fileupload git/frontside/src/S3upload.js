import './App.css';
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";

function S3upload() {
  

  const fileupload=()=>{
      alert("okkk")
      var file=file.target.files[0];

      // const target={Bucket:"fileupins3",Key:file.name,Body:file};
      // const creds={
      //   AccesskeyId:"AKIAVJREMHXCIKIMPLN5" ,
        	
      //   SecretaccesskeyId:"64y2FhOEMV13O3omgfMqg/vtW5TXbKdzUevC+xi2"
      // };
      // try {
        
      //   const parallelUploads3 = new Upload({
      //     client: new S3Client({region:"ap-south-1", credentials:creds}),
      //     leavePartsOnError: false, // optional manually handle dropped parts
      //     params:target,
      //   });

      //       parallelUploads3.on("httpUploadProgress", (progress) => {
      //           console.log(progress);
      //         });
            
      //          parallelUploads3.done();
      //   } 
      // catch (e) {
      //   console.log(e);
      // }

  }
  return (
    <div className="App">
      <>
    <h1> file upload into s3 bucket using react</h1>
    <div className='form'>
      <input type="file" name="fupl" onChange={fileupload}/>
    </div></>
    </div>
  );
}

export default S3upload;
