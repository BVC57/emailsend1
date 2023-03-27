import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import{filedownload} from 'js-file-download';
import './fu.css';
// import pdfimg from '../src/dashmesh-logo.png';
import jsPDF from 'jspdf';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [Data1, setData] = useState([]);
  const [dowdata,setdowdata]=useState([]);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    
    console.log(file);
    

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(file)
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:4000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
  };

  
  // this api call is create function
  
  
    
  // const handleClick = () => {
    const getdata=async()=>{
      var getdata1=await axios.get("http://localhost:4000/fetchdata")
      // console.log(getdata1);
      setData(getdata1.data.Contents);//to declare the which data you should call getdata(all data).data(andar no data).contents(result se)
  
    }
    
    // console.log("*******",Data1)
    useEffect(()=>{
      getdata();
      // alert("Data Fetch Done SHOW The Result Press ok");
    },[]);


    const pdfcreate=async(dowdata)=>{
      console.log(dowdata);

      const filedownload = await axios.get(`http://localhost:4000/download/${dowdata.Key}`)
      console.log(filedownload)
        var doc=new jsPDF('landscape','px','a4');
        doc.addPage();
        doc.text(20,20,filedownload.data);
        doc.save(filedownload.data);
        alert("download done");
    }

    


    
  


  return (
    <>
    <form onSubmit={handleSubmit} className="form-data">
    <h1> file upload into S3 bucket using react</h1>
      <input type="file"  onChange={handleFileChange} className="form-input" />
      <button type="submit" className='sbtn'>Upload</button>
      <br/>
      <br/>
      <br/>
    </form>
    <div className='dbtn'><button>DOWNLOAD JSON PDF</button></div>
    <div className='result'>
    <div className='table'>
    <table border={5}>
            <thead><tr>
              <th>File Name</th>
              <th>Lastmodify Date</th>
              <th>Size In KB</th>
              <th>Download PDF</th>
            </tr>
            </thead>
          {Data1 && Data1.map(item => (
        <tbody>
          <td>{item.Key}</td>
          <td>{item.LastModified}</td>
          <td>{item.Size}</td>
          <td><button className='pbtn' onClick={()=>pdfcreate(item)}>Download PDF</button></td>

        </tbody>
 
          
      ))}
      </table>
         
    </div>
    </div>
    </>
  );
}

export default FileUpload;
