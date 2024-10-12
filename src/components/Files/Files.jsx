import React, { useContext, useState } from 'react'
import FileContext from '../context/FileContext';
import Download from '../svg/Download';
import Cross from '../svg/Cross';
import IntelligentSize from '../services/IntelligentSize';

export default function Files() {
    const { files, fetchFiles, fileUploader, deleteFile, downloadFile } = useContext(FileContext);
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    async function uploadHandler() {
        setFile(null);
        await fileUploader(file);
    }


    return (
        <div>
            <div className='flex justify-between pt-2 px-3'>
                <input type='file' onChange={handleFileChange} />
                {file && <button onClick={uploadHandler}>upload</button>}
            </div>
            <hr className='my-2' />
            {files.map((file, i) => <div key={i} className='flex justify-between bg-sky-800 my-1 p-1'>
                <div className='flex gap-1'>
                    <button onClick={() => deleteFile(i)} className='text-red-500 w-5'><Cross /></button>
                    <div className=''>{file.title}</div>
                </div>
                <div className='flex gap-1'>
                    <div>size: {IntelligentSize(file.size)}</div>
                    <button onClick={() => downloadFile(i)} className='text-green-500 w-5'><Download /></button>
                </div>
            </div>)}
            {files.length === 0 && <button onClick={fetchFiles}>fetch files</button>}
        </div>
    )
}
