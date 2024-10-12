import axios from "axios";
export async function ping() {
    const response = await axios.get('https://reqres.in/api/users/2');
    console.log(response);
}

export async function creater(owner, repo, path, content, token) {
    const response = await axios.put(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        { message: 'created using api', content: btoa(content) },
        {
            headers: {
                Authorization: `token ${token}`,
                Accept: 'application/vnd.github.v3+json'
            }
        })
    return response;
}

export async function fileMetaData(owner, repo, path, token) {
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
    const blobResponse = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/git/blobs/${sha}`,
        {
            headers: {
                Authorization: `token ${token}`,
            },
        }
    );
    const blobContent = blobResponse.data.content;
    const contentBytes = atob(blobContent);
    return contentBytes;
}

export async function updater(owner, repo, path, content, token, sha) {
    console.log('updater', sha);

    const response = await axios.put(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        { message: 'updating using api', content: btoa(content), sha: sha },
        {
            headers: {
                Authorization: `token ${token}`,
                Accept: 'application/vnd.github.v3+json',
            }
        }
    )
    console.log(response);

    return response;
}

export async function createRepo(token, name) {
    const response = await axios.post(
        'https://api.github.com/user/repos',
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
    console.log(response);
}

