import './App.css';
import { useState } from 'react';
import Timer from './Timer';
import Settings from './Settings';
import SettingsContext from './SettingsContext';

function App() {

  const [breakMinutes, setBreakMinutes] = useState(5);
  const [workMinutes, setWorkMinutes] = useState(25);
  
  return (
    <div id='app'>
      <h2 id='heading'>Pomodoro Timer</h2>
      <div id='grid'>
        <SettingsContext.Provider value={{
          workMinutes,
          breakMinutes,
          setBreakMinutes,
          setWorkMinutes
        }} >
          <Settings />
          <Timer />
        </SettingsContext.Provider>
      </div>
    </div>
  );
}

export default App;
