import { getChunks, uploadInRepo } from "../Files/Utility";
import { fileMetaData, getContent, updater } from "../services/basics";
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
    const response = await updater(gitusername, gitrepo, gitfilespath, btoa(JSON.stringify(updatedFiles)), temp, filesha);
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
    const response = await updater(gitusername, gitrepo, gitfilespath, btoa(JSON.stringify(updatedFiles)), temp, filesha);
    filesha = response.data.content.sha;
    files = updatedFiles;
}

export async function chunkDownloader(repo, path) {
    const res1 = await fileMetaData(gitusername, repo, path, temp);
    if (res1.data.content) {
        return base64ToBytes(res1.data.content);
    } else {
        const sha = res1.data.sha;
        console.log(sha);
        
        const res2 = await getContent(gitusername, repo, temp, sha);
        return base64ToBytes(res2.data.content);
    }
}

async function base64ToBytes(contentB64) {
    const string = atob(contentB64);
    const byteArray = new Uint8Array(string.length);
    for (let i = 0; i < string.length; i++) {
        byteArray[i] = string.charCodeAt(i);
    }
    return byteArray;
}