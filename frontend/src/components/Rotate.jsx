import { useSnapshot } from "valtio";
import state from "../store";
import { useState } from "react";
import Button from "./Button";

export default function Rotate({setActiveControleTab}) {
  const [progressText, setProgressText] = useState(0);
  const [progressImage, setProgressImage] = useState(0);
  const snap = useSnapshot(state);

  const handleProgressChangeText = (e) => {
    const newProgress = e.target.value;
    const newRotation = [180, 0, newProgress * Math.PI / 180];
    state.textRotation = newRotation;
    setProgressText(newProgress);
  };

  const handleProgressChangeIMage = (e) => {
    const newProgress = e.target.value;
    const newRotation = [180, 0, newProgress * Math.PI / 180];
    state.logoRotation = newRotation;
    setProgressImage(newProgress);
  };

  function handleClose(){
    
  }

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-xl p-6 w-64 border border-gray-200 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Rotation Controls
      </h2>
      
      <div className="space-y-6">
        {/* Text Rotation Control */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor='text-rotation' className='text-sm font-medium text-gray-700'>
              Text Rotation
            </label>
            <span className="text-sm text-gray-600 font-mono">
              {progressText}°
            </span>
          </div>
          <input
            id='text-rotation'
            type='range'
            min='0'
            max='360'
            value={progressText}
            step='1'
            className='w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer 
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-4 
            [&::-webkit-slider-thumb]:h-4 
            [&::-webkit-slider-thumb]:bg-blue-600 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:shadow-md
            hover:[&::-webkit-slider-thumb]:bg-blue-700'
            onChange={handleProgressChangeText}
          />
        </div>

        {/* Image Rotation Control */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor='image-rotation' className='text-sm font-medium text-gray-700'>
              Image Rotation
            </label>
            <span className="text-sm text-gray-600 font-mono">
              {progressImage}°
            </span>
          </div>
          <input
            id='image-rotation'
            type='range'
            min='0'
            max='360'
            value={progressImage}
            step='1'
            className='w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer 
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-4 
            [&::-webkit-slider-thumb]:h-4 
            [&::-webkit-slider-thumb]:bg-green-600 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:shadow-md
            hover:[&::-webkit-slider-thumb]:bg-green-700'
            onChange={handleProgressChangeIMage}
          />
        </div>
      </div>
      <div className=" w-full flex justify-center pt-6">
      <div className=" w-fit">
      <Button
          type='filled'
          title='Close'
          handleClick={()=>setActiveControleTab(null)}
          customStyles='px-4 py-2 text-sm '
        />
      </div>
      </div>
    </div>
  );
}