import { SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';
import state from '../store';
import Button from './Button';

const ColorPicker = ({setActiveEditorTab}) => {
  const snap = useSnapshot(state);

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-xl p-6 w-72 border border-gray-200 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Color Picker
      </h2>
      <div className="flex justify-center">
        <SketchPicker
          color={snap.color}
          disableAlpha
          onChange={(color) => (state.color = color.hex)}
          styles={{
            default: {
              picker: {
                boxShadow: 'none',
                width: '100%'
              }
            }
          }}
        />
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Selected Color: 
          <span 
            className="ml-2 inline-block w-6 h-6 rounded-full border border-gray-300"
            style={{ backgroundColor: snap.color }}
          ></span>
          <span className="ml-2 font-mono text-gray-700">{snap.color}</span>
        </p>
      </div>

      <div className=" w-full flex justify-center pt-4">
      <div className=" w-fit">
      <Button
          type='filled'
          title='Close'
          handleClick={()=>{setActiveEditorTab(null)}}
          customStyles='px-4 py-2 text-sm '
        />
      </div>
      </div>
    </div>
  );
};

export default ColorPicker;