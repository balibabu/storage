import React from 'react'
import { StorageProvider } from './components/context/StorageContext';
import Files from './components/Files/Files';
import Credentials from './components/Credentials';

export default function App() {
  return (
    <StorageProvider>
      <div className='bg-gray-800 h-dvh text-gray-300'>
        <Credentials />
        <Files />
      </div>
    </StorageProvider>
  )
}
