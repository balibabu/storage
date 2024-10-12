import { createRepo, fileMetaData, updater } from "../services/basics";
import { gitcurrentpath, gitrepo, gitusername, temp } from "./StaticVars";

let current = null;
let currentSha = null;

async function fetchCurrentStatus() {
    const response = await fileMetaData(gitusername, gitrepo, gitcurrentpath, temp);
    if (response.status === 200) {
        currentSha = response.data.sha;
        const strContent = atob(response.data.content);
        current = JSON.parse(strContent);
        console.log('fetched successfully');
    } else {
        alert('something went wrong please refresh page');
    }
}


export async function createNewRepo() {
    const reponame = `repo-${current.repoId}`
    await createRepo(temp, reponame);
    current = {
        repo: reponame,
        size: 524288000, //500mb in bytes
        chunkId: current.chunkId,
        repoId: current.repoId + 1
    }
    const response = await updater(gitusername, gitrepo, gitcurrentpath, btoa(JSON.stringify(current)), temp, currentSha);
    currentSha = response.data.content.sha;
}

export async function getFreeRepo(size) {
    if (!current) {
        await fetchCurrentStatus();
    }
    if (current.size < size) {
        await createNewRepo();
    }
    // current = { ...current, size: current.size - size, chunkId: current.chunkId + 1 }
    return [current.repo, `chunk-${current.chunkId}`]
}

export async function chunkIdRepoSize(size) {
    current = { ...current, size: current.size - size, chunkId: current.chunkId + 1 }
    const response = await updater(gitusername, gitrepo, gitcurrentpath, btoa(JSON.stringify(current)), temp, currentSha);
    currentSha = response.data.content.sha;
}


// current = {
//     repo: '',
//     size: 0,
//     chunkId: 0,
//     repoId: 0
// }