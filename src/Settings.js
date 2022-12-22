import {useContext} from 'react';
import SettingsContext from './SettingsContext';

function Settings() {

  const settingsInfo = useContext(SettingsContext)

  const lessThan = (minutes, number) => {
    return minutes < number;
  };
  const greaterThan = (minutes, number) => {
    return minutes > number;
  };
  const targetID = (e, elementID) => {
    return e.target.id === elementID;
  };
  const incrementUserChoice = (e) => {
    if(targetID(e, 'break-increment') && lessThan(settingsInfo.breakMinutes, 60)) {
      settingsInfo.setBreakMinutes((prev) => prev + 1)
    } else if(targetID(e, 'session-increment') && lessThan(settingsInfo.workMinutes, 60)) {
      settingsInfo.setWorkMinutes((prev) => prev + 1)
    }
  };
  const decrementUserChoice = (e) => {
    if(targetID(e, 'break-decrement') && greaterThan(settingsInfo.breakMinutes, 1)) {
      settingsInfo.setBreakMinutes((prev) => prev - 1)
    } else if(targetID(e, 'session-decrement') && greaterThan(settingsInfo.workMinutes, 1)) {
      settingsInfo.setWorkMinutes((prev) => prev - 1)
    }
  };
  return (
    <div id="time-controls">
      <div id="time-controls-grid">
        <div id='break-label'>Break</div>
        <div id='break-controls' className='controls'>
          <button onClick={incrementUserChoice} id='break-increment' className='btn-caret'><i id='break-caret-up' className="fa-solid fa-caret-up btn-icon"></i></button>
          <div id='break-length'>{settingsInfo.breakMinutes}</div>
          <button onClick={decrementUserChoice} id='break-decrement' className='btn-caret'><i id='break-caret-down' className="fa-solid fa-caret-down btn-icon"></i></button>
        </div>
        <div id='session-label'>Work</div>
        <div id='session-controls' className='controls'>
          <button onClick={incrementUserChoice} id='session-increment' className='btn-caret'><i id='session-caret-up' className="fa-solid fa-caret-up btn-icon"></i></button>
          <div id='session-length'>{settingsInfo.workMinutes}</div>
          <button onClick={decrementUserChoice} id='session-decrement' className='btn-caret'><i id='session-caret-down' className="fa-solid fa-caret-down btn-icon"></i></button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
