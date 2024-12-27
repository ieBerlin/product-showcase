import { useSnapshot } from "valtio";
import state from "../store";
import { useState } from "react";
import Button from "./Button";

export default function Scale({setActiveControleTab}) {
  const [progressScaleTextX, setProgressScaleTextX] = useState(1.0);
  const [progressScaleTextY, setProgressScaleTextY] = useState(1.0);
  const [progressScaleImageX, setProgressScaleImageX] = useState(1.0);
  const [progressScaleImageY, setProgressScaleImageY] = useState(1.0);
  
  const snap = useSnapshot(state);

  const handleProgressChangeScaleTextX = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgressScaleTextX(newProgress);
    state.scaleTextX = newProgress;
  };

  const handleProgressChangeScaleTextY = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgressScaleTextY(newProgress);
    state.scaleTextY = newProgress;
  };

  const handleProgressChangeScaleImageX = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgressScaleImageX(newProgress);
    state.scaleX = newProgress;
  };

  const handleProgressChangeScaleImageY = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgressScaleImageY(newProgress);
    state.scaleY = newProgress;
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-xl p-6 w-72 border border-gray-200 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Scale Controls
      </h2>

      <div className="space-y-6">
        {/* Text Scale X Control */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor='text-scaleX' className='text-sm font-medium text-gray-700'>
              Text Scale X
            </label>
            <span className="text-sm text-gray-600 font-mono">
              {progressScaleTextX.toFixed(2)}x
            </span>
          </div>
          <input
            id='text-scaleX'
            type='range'
            min='0.5'
            max='5'
            value={progressScaleTextX}
            step='0.01'
            className='w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer 
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-4 
            [&::-webkit-slider-thumb]:h-4 
            [&::-webkit-slider-thumb]:bg-blue-600 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:shadow-md
            hover:[&::-webkit-slider-thumb]:bg-blue-700'
            onChange={handleProgressChangeScaleTextX}
          />
        </div>

        {/* Text Scale Y Control */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor='text-scaleY' className='text-sm font-medium text-gray-700'>
              Text Scale Y
            </label>
            <span className="text-sm text-gray-600 font-mono">
              {progressScaleTextY.toFixed(2)}x
            </span>
          </div>
          <input
            id='text-scaleY'
            type='range'
            min='0.5'
            max='5'
            value={progressScaleTextY}
            step='0.01'
            className='w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer 
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-4 
            [&::-webkit-slider-thumb]:h-4 
            [&::-webkit-slider-thumb]:bg-blue-600 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:shadow-md
            hover:[&::-webkit-slider-thumb]:bg-blue-700'
            onChange={handleProgressChangeScaleTextY}
          />
        </div>

        {/* Image Scale X Control */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor='image-scaleX' className='text-sm font-medium text-gray-700'>
              Image Scale X
            </label>
            <span className="text-sm text-gray-600 font-mono">
              {progressScaleImageX.toFixed(2)}x
            </span>
          </div>
          <input
            id='image-scaleX'
            type='range'
            min='0.5'
            max='5'
            value={progressScaleImageX}
            step='0.01'
            className='w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer 
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-4 
            [&::-webkit-slider-thumb]:h-4 
            [&::-webkit-slider-thumb]:bg-green-600 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:shadow-md
            hover:[&::-webkit-slider-thumb]:bg-green-700'
            onChange={handleProgressChangeScaleImageX}
          />
        </div>

        {/* Image Scale Y Control */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor='image-scaleY' className='text-sm font-medium text-gray-700'>
              Image Scale Y
            </label>
            <span className="text-sm text-gray-600 font-mono">
              {progressScaleImageY.toFixed(2)}x
            </span>
          </div>
          <input
            id='image-scaleY'
            type='range'
            min='0.5'
            max='5'
            value={progressScaleImageY}
            step='0.01'
            className='w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer 
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-4 
            [&::-webkit-slider-thumb]:h-4 
            [&::-webkit-slider-thumb]:bg-green-600 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:shadow-md
            hover:[&::-webkit-slider-thumb]:bg-green-700'
            onChange={handleProgressChangeScaleImageY}
          />
        </div>

        <div className=" w-full flex justify-center pt-4">
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
    </div>
  );
}