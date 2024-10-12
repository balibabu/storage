import React, { useState } from 'react'
import { setCredentials } from './context/StaticVars';

export default function Credentials() {
    const [creden, setCreden] = useState({});
    const [collapsed, setCollapsed] = useState(true);

    function onCredentialChange(e) {
        setCreden((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function savedCredendentials() {
        console.log(creden);
        setCredentials(creden);
        setCollapsed(true);
    }

    return (
        <div>
            {collapsed ?
                <>
                    <button onClick={() => setCollapsed(false)}>set credentials</button>
                </> :
                <>
                    <p>Github Username</p>
                    <input type="text" name='gitusername' value={creden.gitusername || ''} onChange={onCredentialChange} placeholder='eg. balibabu' />
                    <p>App Data Repo</p>
                    <input type="text" name='gitrepo' value={creden.gitrepo || ''} onChange={onCredentialChange} placeholder='eg. my-note-app' />
                    <p>files storage path</p>
                    <input type="text" name='gitfilespath' value={creden.gitfilespath || ''} onChange={onCredentialChange} placeholder='eg. source/files.txt' />
                    <p>other meta data storage path</p>
                    <input type="text" name='gitcurrentpath' value={creden.gitcurrentpath || ''} onChange={onCredentialChange} placeholder='eg. source/current.txt' />
                    <p>Github Access Token</p>
                    <input type="text" name='temp' value={creden.temp || ''} onChange={onCredentialChange} placeholder='eg. ghp_8zSiWabakw6El3M5tJFr4zsc3kar2T' />
                    <hr />
                    <div className='flex justify-between px-5'>
                        <button onClick={savedCredendentials}>save</button>
                        <button onClick={() => setCollapsed(true)}>cancel</button>
                    </div>
                </>
            }
        </div>
    )
}
