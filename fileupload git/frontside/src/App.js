import './App.css';
import FileUpload from './FileUpload';
import S3upload from './S3upload';

function App() {
  return (
    <div className="App">
    {/* <S3upload/> */}
    <FileUpload/>
    </div>
  );
}

export default App;
