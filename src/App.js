import { useState } from 'react';
import './App.css';
import { useDropzone } from "react-dropzone";

function App() {
  const onDrop = async (files) => {
    await Promise.all(Array.from(files).map(f => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const config = JSON.parse(event.target.result);

        console.log(f);

        fetch('https://test.uebok.com/v1/lotties/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            name: f.name.split('.').shift(),
            config
          })
        })
      };

      reader.readAsText(f);
    }))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'application/json'
  });

  return (
    <div>
      <div {...getRootProps()} style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <input className="dropzone-input" {...getInputProps()} />
        <div className="text-center">
          {isDragActive ? (
            <p className="dropzone-content">Release to drop the files here</p>
          ) : (
            <p className="dropzone-content">
              Drag 'n' drop some files here, or click to select files
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
