import React, { useState, useCallback, useMemo } from 'react';
import { FaImage } from 'react-icons/fa';
import { BsChatLeftTextFill } from 'react-icons/bs';
import { IoColorPalette } from 'react-icons/io5';
import { BiHeart } from 'react-icons/bi';
import { useSnapshot } from 'valtio';
import Canvas from '../canvas/index';
import state from '../store';
import { AIHelper, ColorPicker, FilePicker } from '../components';
import { DecalTypes } from '../config/constants';
import { reader } from '../config/helpers';
import curvedLineImage from "../assets/curvedLine.png"
import curvedLine2Image from "../assets/curvedLine2.png"
import { CgGames } from 'react-icons/cg';
import Scale from './Scale';
import Rotate from './Rotate';
// Extracted constants for better maintainability
const STEPS = [
  { id: 'filepicker', label: <FaImage size={22} /> ,right:"25%",subtext: ' IMAGE+5€'},
  { id: 'addText', label: <BsChatLeftTextFill size={22} />,right:"17%", subtext: ' TEXT+5€' },
  { id: 'colorpicker', label: <IoColorPalette size={22} />,right:"23%", subtext: ' COLORS+5€' },
];

const COLOR_OPTIONS = [
  // { color: "#FDF8C7",text:"Gaming",label:<h1 className=' text-2xl'>🕹️</h1>, size: "40px" ,rightText:"-5%", position: "10%", right: "21%" }, // Yellow
  { color: "#C8B6FF",text:"",label:<h1 className=' text-xl font-medium'>Rotaion</h1>,  size: "40px" ,rightText:"-10%", position: "25%", right: "15%",active:"Rotate" }, // Purple
  { color: "#FFA3B3",text:"",label:<h1 className=' text-xl font-medium'>Scale</h1>,  size: "40px" ,rightText:"-10%", position: "60%", right: "10%",active:"Scale" }, // Pink (largest in center)
  // { color: "#92DCE5",text:"Sports",label:<h1 className=' text-2xl'></h1>,  size: "40px" ,rightText:"-15%", position: "60%", right: "6%" }, // Teal
  // { color: "#C7EFB5",text:"Animals", label:<h1 className=' text-2xl'>🐓</h1>, size: "40px" ,rightText:"-15%", position: "75%", right: "14%" }, // Green
];

const PRICE = '35,00 €';
const DEFAULT_COLOR = '#FFB6C1'; // Light pink

export default function Content() {
  const snap = useSnapshot(state);
  const [file, setFile] = useState('');
  const [text, setText] = useState('');
  const [prompt, setPrompt] = useState('');
  const [activeEditorTab, setActiveEditorTab] = useState('');
  const [activeControleTab, setActiveControleTab] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState({
    caseLogo: true,
    phoneCase: false,
  });
  const [activeStep, setActiveStep] = useState('material');
  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLOR);

  // Memoized tab content to reduce unnecessary re-renders
  const tabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker setActiveEditorTab={setActiveEditorTab} />;
      case 'filepicker':
        return (
          <FilePicker 
          setActiveEditorTab={setActiveEditorTab}
            file={file} 
            setFile={setFile} 
            readFile={handleFileRead} 
          />
        );
      case 'addText':
        return (
          <AIHelper
          setActiveEditorTab={setActiveEditorTab}
            prompt={prompt}
            setPrompt={setPrompt}
            setText={setText}
            readText={handleTextRead}
            handleSubmit={handleImageGenSubmit}
          />
        );
      default:
        return null;
    }
  };
  const Controle = () => {
    switch (activeControleTab) {
      case 'Rotate':
        return <Rotate setActiveControleTab={setActiveControleTab}/>;
      case 'Scale':
        return <Scale setActiveControleTab={setActiveControleTab}/>
      default:
        return null;
    }
  };
  // Improved error handling and async image generation
  const handleImageGenSubmit = useCallback(async (type) => {
    if (!prompt) {
      alert('Please enter a prompt!');
      return;
    }

    try {
      // TODO: Implement actual backend image generation
      console.log('Generating image with prompt:', prompt);
      // Uncomment when backend is ready
      // const response = await generateImage(prompt);
      // handleDecals(type, response);
    } catch (error) {
      console.error('Image generation error:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setActiveEditorTab('');
    }
  }, [prompt]);

  // Centralized decal handling
  const handleDecals = useCallback((type, result) => {
    const decalType = DecalTypes[type];
    if (decalType) {
      state[decalType.stateProperty] = result;

      if (!activeFilterTab[decalType.filterTab]) {
        handleActiveFilterTab(decalType.filterTab);
      }
    }
  }, [activeFilterTab]);

  // Extracted file and text reading methods
  const handleFileRead = useCallback((type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab('');
    }).catch((error) => {
      console.error('File reading error:', error);
      alert('Failed to read file. Please try again.');
    });
  }, [file, handleDecals]);

  const handleTextRead = useCallback(() => {
    state.text = text;
    state.isTextTexture = true;
  }, [text]);

  // Toggle filter tabs with improved state management
  const handleActiveFilterTab = useCallback((tabName) => {
    state.isLogoTexture = tabName === 'caseLogo' 
      ? !activeFilterTab[tabName] 
      : false;
    
    state.isFullTexture = tabName === 'phoneCase' 
      ? !activeFilterTab[tabName] 
      : false;

    setActiveFilterTab((prevState) => ({
      ...prevState,
      [tabName]: !prevState[tabName],
    }));
  }, [activeFilterTab]);

  // Color selection with added validation
  const handleColorSelection = useCallback((color) => {
    if (COLOR_OPTIONS.some(opt => opt.color === color)) {
      setSelectedColor(color);
      state.color = color;
    } else {
      console.warn(`Invalid color: ${color}`);
    }
  }, []);

  return (
    <div className="flex justify-between w-4/5 items-center mb-16 max-w-6xl mx-auto mt-0">
      {/* Left Navigation */}
      <div className="w-48 space-y-4">
        <div
  className="relative flex-col justify-around w-52 flex items-center h-screen bg-white"
  style={{
    backgroundImage: `url(${curvedLineImage})`, // Correct syntax
    backgroundPosition: "center",
    backgroundRepeat:"no-repeat",
    height:"300px"
  }}
>
          {STEPS.map((step) => (
            <div
            style={{backgroundColor:"white"}}
              key={step.id}
              className={`flex items-center justify-center space-x-3 cursor-pointer group ${
                activeStep === step.id ? 'opacity-100' : 'opacity-500'
              }`}
              onClick={() => {
                setActiveEditorTab(step.id);
                setActiveStep(step.id);
              }}
            >
              <div style={{left:step.right,position:"absolute"}}>
              {step.subtext && <div className=" relative top-7 text-gray-500" style={{fontSize:"13px",left:"-120%"}}>{step.subtext}</div>}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activeStep === step.id
                      ? 'bg-gray-200 text-gray-600'
                      :  'bg-gray-700 text-white'
                  } group-hover:bg-white group-hover:text-black transition-colors`}
                  
                >
                
                  {step.label}
                </div>
              </div>
              
            </div>
          ))}
          {tabContent()}
        </div>
       
        <button 
          className="mt-8 h-12 w-full flex items-center justify-center space-x-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Save for later"
        >
          <BiHeart className="w-4 h-4" />
          <span>Save for later</span>
        </button>
      </div>

      {/* Central Canvas */}
      <div className="flex-1 flex flex-col items-center">
        <h2 className="text-xl font-medium mt-5">CHOOSE YOUR COLOR</h2>
        <div className="w-96 h-96 bg-white rounded-full mb-3 shadow-lg">
          <Canvas caseRotation={[0,0,0]} caseSize={["600px","400px"]} />
        </div>
        <div className=' w-1/2 h-32 flex justify-between'>
        <div><Canvas caseRotation={[0,180,0]} caseSize={["100px","100px"]} /></div>
        <div><Canvas caseRotation={[0,0,180]} caseSize={["100px","100px"]} /></div>
        <div><Canvas caseRotation={[0,-180,0]} caseSize={["100px","100px"]} /></div>
        </div>
        <div className="mt-6 flex items-center space-x-4">
          <div className="text-2xl font-medium">{PRICE}</div>
          <button 
            className="px-8 py-2 bg-black text-white text-sm hover:bg-gray-800 transition-colors"
            aria-label="Buy now"
          >
            BUY
          </button>
        </div>
      </div>

      {/* Right Color Picker */}
      
      <div
  className="relative w-52 flex items-center justify-center h-screen bg-white"
  style={{
    backgroundImage: `url(${curvedLine2Image})`, // Correct syntax
    backgroundPosition: "center",
    backgroundRepeat:"no-repeat",
    height:"300px",
    marginBottom:"50px"
  }}
>
      {/* Colored Circles */}
      {COLOR_OPTIONS.map((option, index) => (
        <div key={index}>
        <h1  className={`absolute rounded-full transform hover:scale-110 transition-transform duration-300 ${
            selectedColor === option.color
              ? "ring-2 ring-offset-2 ring-black"
              : ""
          }`}
          style={{
  backgroundColor: "white",
  width: option.size,
  height:"23px",
  right:option.rightText , // Horizontal positioning
  top: option.position, // Vertical positioning
  transform: "translate(-50%, -50%)",
}}

          >{option.text}</h1>
        <button
          
          className={`absolute rounded-full transform hover:scale-110 transition-transform duration-300 ${
            selectedColor === option.color
              ? "ring-2 ring-offset-2 ring-black"
              : ""
          }`}
          style={{
            backgroundColor:"white",
            width: option.size,
            height: option.size,
            right: option.right, // Horizontal positioning
            top: option.position, // Vertical positioning
            transform: "translate(-50%, -50%)",
          }}
          onClick={() => setActiveControleTab(option.active)}
          aria-label={`Select ${option.color}`}
        >{option.label}</button>
        </div>
      ))}

      {Controle()}
    </div>
    </div>
  );
}




