import React, { useContext, useState } from 'react'
import FileContext from '../context/FileContext';

export default function Files() {
    const { files, fetchFiles, uploadFile } = useContext(FileContext);
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Capture the selected file
    };

    async function uploadHandler() {
        await uploadFile(file);
        setFile(null);
    }


    return (
        <div>
            <input type='file' onChange={handleFileChange} />
            {file && <div onClick={uploadHandler}>upload</div>}
            <hr className='my-2'/>
            {files.map((file, i) => <div key={i} className='flex gap-2'>
                <button>delete</button>
                <div>{file.title}</div>
                <button>donwload</button>
            </div>)}
            {!files && <button onClick={fetchFiles}>fetch files</button>}
        </div>
    )
}
