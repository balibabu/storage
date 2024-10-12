import axios from "axios";

export async function creater(owner, repo, path, contentB64, token) {
    console.log('creater api');
    const response = await axios.put(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        { message: 'created using api', content: contentB64 },
        {
            headers: {
                Authorization: `token ${token}`,
                Accept: 'application/vnd.github.v3+json'
            }
        })
    return response;
}

export async function fileMetaData(owner, repo, path, token) {
    console.log('fileMetaData api');
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        {
            headers: {
                Authorization: `token ${token}`,
                Accept: 'application/vnd.github.v3+json',
            }
        }
    )
    return response;
}

export async function getContent(owner, repo, token, sha) {
    console.log('getContent api');
    const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/git/blobs/${sha}`,
        {
            headers: {
                Authorization: `token ${token}`,
            },
        }
    );
    return response;
}

export async function updater(owner, repo, path, contentB64, token, sha) {
    console.log('updater api');
    const response = await axios.put(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        { message: 'updating using api', content: contentB64, sha: sha },
        {
            headers: {
                Authorization: `token ${token}`,
                Accept: 'application/vnd.github.v3+json',
            }
        }
    )
    return response;
}

export async function createRepo(token, name) {
    console.log('createRepo api');
    const response = await axios.post('https://api.github.com/user/repos',
        {
            name: name,
            private: true,
        },
        {
            headers: {
                Authorization: `token ${token}`,
                Accept: 'application/vnd.github.v3+json',
            },
        }
    );
    return response;
}

