import { chunkIdRepoSize, getFreeRepo } from "../context/currentCRUD";
import { gitcurrentpath, gitfilespath, gitrepo, gitusername, temp } from "../context/StaticVars";
import { creater, updater } from "../services/basics";

export async function blobToStr(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const content = event.target.result;
            resolve(content);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob); // Converts to base64
    });
}

export async function getChunks(file) {
    const chunks = [];
    const max_chunk_size = 50000;
    const totalChunks = Math.ceil(file.size / max_chunk_size);
    for (let i = 0; i < totalChunks; i++) {
        const start = i * max_chunk_size;
        const end = Math.min(file.size, start + max_chunk_size);
        const chunk = file.slice(start, end);
        chunks.push(chunk);
    }
    return chunks;
}

export async function uploadInRepo(chunk) {
    const [freeRepo, chunkName] = await getFreeRepo(chunk.size);
    const str64 = await blobToStr(chunk);
    const response = await creater(gitusername, freeRepo, chunkName, str64, temp);
    if (response.status === 201) {
        await chunkIdRepoSize(chunk.size);
    }
    return [freeRepo, chunkName];
}

// export async function updateFilesOnGit(updatedFiles, fileSha, setFileSha) {
//     console.log(updatedFiles);
//     console.log(fileSha);

//     const response = await updater(gitusername, gitrepo, gitfilespath, JSON.stringify(updatedFiles), temp, fileSha);
//     setFileSha(response.data.content.sha);
// }

export default function Confirmation(message) {
    const confirmDelete = window.confirm(message);
    if (!confirmDelete) { return false; }
    return true;
}