import React, { Suspense, useState } from "react";
import { Canvas} from '@react-three/fiber'
import Earth from './components/Earth';
import { OrbitControls } from '@react-three/drei'
import { Switch } from 'antd';

import './App.scss';
import Moon from "./components/Moon";
import EarthText from "./components/EarthText";
import MoonText from "./components/MoonText";
import Loading from "./components/Loading";

const App:React.FC = () => {
  const [earthSwitch, setEarthSwitch] = useState<boolean>(true)
  const [textSwitch, setTextSwitch] = useState<boolean>(true)

  const onChangeEarthSwitch = (checked: boolean) => {
    setEarthSwitch((value)=> !value);
  };
  
  const onChangeTextSwitch = (checked: boolean) => {
    setTextSwitch((value)=> !value);
  };
  
  return (
    <div className="App">
      <div className="switcher_block">
          <Switch className="switcher" checkedChildren="Switch to the Moon" unCheckedChildren="Switch to the Earth" defaultChecked onChange={onChangeEarthSwitch}/>
          <Switch className="switcher" checkedChildren="Hide text" unCheckedChildren="Show text" defaultChecked onChange={onChangeTextSwitch}/>
      </div>
      { textSwitch && (
        <div className="text_container">
          {earthSwitch ? <EarthText /> : <MoonText />}
        </div>
      )}
      <div className="canvas">
        <Suspense fallback={<Loading/>}>
          <Canvas> 
            {earthSwitch ? <Earth /> : <Moon/>}                  
            <OrbitControls/>
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
