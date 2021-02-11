import { useState } from 'react';
import './App.css';
import { useDropzone } from "react-dropzone";

function App() {
  const [name, setName] = useState('');
  const onDrop = async (files) => {
    await Promise.all(Array.from(files).map(f => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const config = JSON.parse(event.target.result);

        fetch('https://test.uebok.com/v1/lotties/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            name,
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

  const handleNameChange = ({ target }) => {
    setName(target.value);
  }

  return (
    <div>
      <input onChange={handleNameChange} placeholder="Name" />
      <div {...getRootProps()}>
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
