import React, { createContext, useContext, useEffect, useState } from 'react';
import { fileSetter, updateFilesOnGit, uploadFile } from './fileCRUD';
import Confirmation from '../Files/Utility';

const FileContext = createContext();
export default FileContext;

export const FileProvider = ({ children }) => {
    const [files, setFiles] = useState([]);
    const [fileSha, setFileSha] = useState(null);


    async function fetchFiles() {
        // const response = await fileMetaData(gitusername, gitrepo, gitfilespath, temp);
        // if (response.status === 200) {
        //     const filestr = atob(response.data.content);
        //     console.log(filestr);

        //     setFileSha(response.data.sha);
        //     setFiles(JSON.parse(filestr));
        //     console.log('fetched successfully');
        // } else {
        //     alert('something went wrong please refresh page');
        // }
        await fileSetter(setFiles);
    }

    async function uploadF(file) {
        // if (!fileSha) { await fetchFiles() };
        // const chunks = await getChunks(file) // generator fun like yield
        // const uploadedChunks = [];
        // for (const chunk of chunks) {
        //     const [repo, path] = await uploadInRepo(chunk);
        //     uploadedChunks.push({ repo, path });
        // }
        // const createdFile = {
        //     title: file.name,
        //     size: file.size,
        //     chunks: uploadedChunks
        // }
        // console.log(createdFile);

        // const updatedFiles = [...files, createdFile];
        // await updateFilesOnGit(updatedFiles, fileSha, setFileSha);
        // setFiles(updatedFiles);
        await uploadFile(file);
        await fileSetter(setFiles);
    }

    async function deleteFile(index) {
        if (Confirmation('are you sure?')) {
            const filteredFiles = files.filter((file, i) => i !== index);
            await updateFilesOnGit(filteredFiles);
            setFiles([...filteredFiles]);
        }
    }

    const contextData = {
        files,
        fetchFiles,
        uploadFile,
        deleteFile
    };

    return (
        <FileContext.Provider value={contextData}>
            {children}
        </FileContext.Provider>
    );
};





