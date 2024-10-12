import { chunkIdRepoSize, getFreeRepo } from "../context/currentCRUD";
import { gitusername, maxreposize, temp } from "../context/StaticVars";
import { creater } from "../services/basics";

export async function blobToBinBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.onload = async (event) => {
            const binaryData = event.target.result;
            const base64 = btoa(
                new Uint8Array(binaryData)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            resolve(base64);
        }
    });
}

export async function getChunks(file) {
    const chunks = [];
    const totalChunks = Math.ceil(file.size / maxreposize);
    for (let i = 0; i < totalChunks; i++) {
        const start = i * maxreposize;
        const end = Math.min(file.size, start + maxreposize);
        const chunk = file.slice(start, end);
        chunks.push(chunk);
    }
    return chunks;
}

export async function uploadInRepo(chunk) {
    const [freeRepo, chunkName] = await getFreeRepo(chunk.size);
    const str64 = await blobToBinBase64(chunk);
    const response = await creater(gitusername, freeRepo, chunkName, str64, temp);
    if (response.status === 201) {
        await chunkIdRepoSize(chunk.size);
    }
    return [freeRepo, chunkName];
}

export default function Confirmation(message) {
    const confirmDelete = window.confirm(message);
    if (!confirmDelete) { return false; }
    return true;
}