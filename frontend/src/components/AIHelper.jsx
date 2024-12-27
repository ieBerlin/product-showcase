import React, { useState } from 'react';
import Button from './Button';
import state from '../store';
import { useSnapshot } from 'valtio';

const AIHelper = ({ setText, readText,setActiveEditorTab }) => {
  const snap = useSnapshot(state);
  const [progress, setProgress] = useState(snap.textRotation); // Rotation progress
  const [progressScaleX, setProgressScaleX] = useState(1.0);  // Scale X progress
  const [progressScaleY, setProgressScaleY] = useState(1.0);  // Scale Y progress
  const [isTransparent, setIsTransparent] = useState(false); // Text background transparency

  const handleProgressChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    const newRotation = [180, 0, newProgress * Math.PI / 180];
    
    state.textRotation = newRotation;
    setProgress(newProgress);
  };

  const handleProgressChangeScaleX = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgressScaleX(newProgress);
    state.scaleTextX = newProgress;
  };

  const handleProgressChangeScaleY = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgressScaleY(newProgress);
    state.scaleTextY = newProgress;
  };

  const toggleBackgroundTransparency = () => {
    const newTransparency = !isTransparent;
    setIsTransparent(newTransparency);
    state.textBackgroundTransparent = newTransparency;
  };

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-xl p-6 w-72 border border-gray-200 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Text Configuration
      </h2>

      {/* Text Input */}
      <div className="mb-4">
        <label 
          htmlFor="text-input" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Enter Text
        </label>
        <input
          id="text-input"
          type="text"
          placeholder="Type your text here"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          onChange={(e) => setText(e.target.value)}
        />
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

      {/* Transparency Toggle */}
      <div className="mb-4">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isTransparent}
            onChange={toggleBackgroundTransparency}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900">
            Transparent Background
          </span>
        </label>
      </div>

      {/* Buttons Wrapper */}
      <div className="flex justify-center mt-6">
        <Button
          type='filled'
          title='Add Text'
          customStyles='px-4 py-2 text-sm'
          handleClick={() => readText()}
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

export default AIHelper;