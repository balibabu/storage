import { getChunks, uploadInRepo } from "../Files/Utility";
import { fileMetaData, updater } from "../services/basics";
import { gitfilespath, gitrepo, gitusername, temp } from "./StaticVars";

let files = null;
let filesha = null;

export async function fetchFiles() {
    const response = await fileMetaData(gitusername, gitrepo, gitfilespath, temp);
    if (response.status === 200) {
        filesha = response.data.sha;
        const strFiles = atob(response.data.content);
        files = JSON.parse(strFiles);
        console.log('fetched successfully');
    } else {
        alert('something went wrong please refresh page');
    }
}

export async function uploadFile(file) {
    if (!filesha) { await fetchFiles() };
    const chunks = await getChunks(file) // generator fun like yield
    const uploadedChunks = [];
    for (const chunk of chunks) {
        const [repo, path] = await uploadInRepo(chunk);
        uploadedChunks.push({ repo, path });
    }
    const createdFile = {
        title: file.name,
        size: file.size,
        chunks: uploadedChunks
    }
    const updatedFiles = [...files, createdFile];
    const response = await updater(gitusername, gitrepo, gitfilespath, JSON.stringify(updatedFiles), temp, filesha);
    filesha = response.data.content.sha;
    files.push(createdFile);
}


export async function fileSetter(setList) {
    if (!files) {
        await fetchFiles();
    }
    setList([...files]);
}

export async function updateFilesOnGit(updatedFiles) {
    const response = await updater(gitusername, gitrepo, gitfilespath, JSON.stringify(updatedFiles), temp, filesha);
    filesha = response.data.content.sha;
    files = updatedFiles;
}