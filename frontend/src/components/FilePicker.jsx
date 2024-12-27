import React, { useState, useRef } from 'react';
import Button from './Button';
import state from '../store';
import { useSnapshot } from 'valtio';

const FilePicker = ({ file, setFile, readFile,setActiveEditorTab }) => {
  const snap = useSnapshot(state);
  const fileInputRef = useRef(null);
  const [progress, setProgress] = useState(snap.logoRotation); // Rotation progress
  const [progressScaleX, setProgressScaleX] = useState(snap.scaleX); // Scale X progress
  const [progressScaleY, setProgressScaleY] = useState(snap.scaleY); // Scale Y progress

  const handleProgressChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    const newRotation = [360, 0, newProgress * Math.PI / 180];
    setProgress(newProgress);
    state.logoRotation = [...newRotation];
  };

  const handleProgressChangeScaleX = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgressScaleX(newProgress);
    state.scaleX = newProgress;
  };

  const handleProgressChangeScaleY = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgressScaleY(newProgress);
    state.scaleY = newProgress;
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-xl p-6 w-72 border border-gray-200 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Image Upload
      </h2>

      {/* File Upload */}
      <div className="mb-4">
        <input
          ref={fileInputRef}
          id='file-upload'
          type='file'
          accept='image/*'
          onChange={handleFileUpload}
          className="hidden"
        />
        <button
          onClick={triggerFileInput}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
        >
          Choose Image
        </button>
        
        <p className="mt-2 text-sm text-gray-600 text-center truncate">
          {file ? file.name : 'No file selected'}
        </p>
      </div>

      {/* Rotation Control (Commented Out) */}
      {/* <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor='rotation-progress' className='text-sm font-medium text-gray-700'>
            Rotation
          </label>
          <span className="text-sm text-gray-600 font-mono">
            {progress}°
          </span>
        </div>
        <input
          id='rotation-progress'
          type='range'
          min='0'
          max='360'
          value={progress}
          step='1'
          className='w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer 
          [&::-webkit-slider-thumb]:appearance-none 
          [&::-webkit-slider-thumb]:w-4 
          [&::-webkit-slider-thumb]:h-4 
          [&::-webkit-slider-thumb]:bg-blue-600 
          [&::-webkit-slider-thumb]:rounded-full 
          [&::-webkit-slider-thumb]:shadow-md
          hover:[&::-webkit-slider-thumb]:bg-blue-700'
          onChange={handleProgressChange}
        />
      </div> */}

      {/* Scale X Control (Commented Out) */}
      {/* <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor='scaleX-progress' className='text-sm font-medium text-gray-700'>
            Scale X
          </label>
          <span className="text-sm text-gray-600 font-mono">
            {progressScaleX.toFixed(2)}x
          </span>
        </div>
        <input
          id='scaleX-progress'
          type='range'
          min='0.5'
          max='5'
          value={progressScaleX}
          step='0.01'
          className='w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer 
          [&::-webkit-slider-thumb]:appearance-none 
          [&::-webkit-slider-thumb]:w-4 
          [&::-webkit-slider-thumb]:h-4 
          [&::-webkit-slider-thumb]:bg-blue-600 
          [&::-webkit-slider-thumb]:rounded-full 
          [&::-webkit-slider-thumb]:shadow-md
          hover:[&::-webkit-slider-thumb]:bg-blue-700'
          onChange={handleProgressChangeScaleX}
        />
      </div> */}

      {/* Scale Y Control (Commented Out) */}
      {/* <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor='scaleY-progress' className='text-sm font-medium text-gray-700'>
            Scale Y
          </label>
          <span className="text-sm text-gray-600 font-mono">
            {progressScaleY.toFixed(2)}x
          </span>
        </div>
        <input
          id='scaleY-progress'
          type='range'
          min='0.5'
          max='5'
          value={progressScaleY}
          step='0.01'
          className='w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer 
          [&::-webkit-slider-thumb]:appearance-none 
          [&::-webkit-slider-thumb]:w-4 
          [&::-webkit-slider-thumb]:h-4 
          [&::-webkit-slider-thumb]:bg-blue-600 
          [&::-webkit-slider-thumb]:rounded-full 
          [&::-webkit-slider-thumb]:shadow-md
          hover:[&::-webkit-slider-thumb]:bg-blue-700'
          onChange={handleProgressChangeScaleY}
        />
      </div> */}

      {/* Buttons Wrapper */}
      <div className="flex justify-center space-x-4 mt-6">
        <Button
          type='outline'
          title='Logo'
          handleClick={() => readFile('logo')}
          customStyles='px-4 py-2 text-sm'
        />
        <Button
          type='filled'
          title='Full'
          handleClick={() => readFile('full')}
          customStyles='px-4 py-2 text-sm'
        />
      </div>
      <div className=" w-full flex justify-center pt-6">
      <div className=" w-fit">
      <Button
          type='filled'
          title='Close'
          handleClick={()=>setActiveEditorTab(null)}
          customStyles='px-4 py-2 text-sm '
        />
      </div>
      </div>
    </div>
  );
};

export default FilePicker;