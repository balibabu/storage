import React, { createContext, useState } from 'react';
import { chunkDownloader, fileSetter, updateFilesOnGit, uploadFile } from './fileCRUD';
import Confirmation from '../Files/Utility';
import { saveAs } from 'file-saver';

const FileContext = createContext();
export default FileContext;

export const FileProvider = ({ children }) => {
    const [files, setFiles] = useState([]);

    async function fetchFiles() {
        await fileSetter(setFiles);
    }

    async function fileUploader(file) {
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

    async function downloadFile(index) {
        const file = files.find((file, i) => i === index);
        const chunks = [];
        for (const chunkInfo of file.chunks) {
            const chunk = await chunkDownloader(chunkInfo.repo, chunkInfo.path);
            chunks.push(chunk);
        }
        saveAs(new Blob(chunks), file.title);
    }

    const contextData = {
        files,
        fetchFiles,
        fileUploader,
        deleteFile,
        downloadFile
    };

    return (
        <FileContext.Provider value={contextData}>
            {children}
        </FileContext.Provider>
    );
};





