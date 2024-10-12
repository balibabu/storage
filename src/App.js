import React, { useEffect, useState } from 'react'
import { createRepo } from './components/services/basics';
import { StorageProvider } from './components/context/StorageContext';
import Files from './components/Files/Files';

export default function App() {
  const [list, setList] = useState([]);
  const [singleRunner, setSingleRunner] = useState(false);
  useEffect(() => {
    setSingleRunner(prev => {
      if (!prev) {

      }
      return true;
    })
  }, [])



  async function perform() {
    // createRepo('','mysto');
  }

  return (
    <StorageProvider>
      <div className='bg-gray-800 h-dvh text-gray-300'>
        
        <Files />
      </div>
    </StorageProvider>
  )
}



const files = [
  {
    title: 'file1.txt',
    size: '1223 in bytes',

    id: 1,
    inside: 0,
    chunks: ['reponame/filename', 'reponame/filename'],
  }
]

const folders = [
  { title: 'folder1', inside: 0 }
]

const f=[
  {id:1}
]