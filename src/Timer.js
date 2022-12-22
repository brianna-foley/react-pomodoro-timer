import PlayPauseButton from "./PlayPauseButton";
import ResetButton from "./ResetButton";
import { useContext, useState, useEffect, useRef } from "react";
import SettingsContext from "./SettingsContext";
import alarmSound from './assets/alarmSound.wav'

function Timer() {

  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [mode, setMode] = useState('work')

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  const audioBeep = document.getElementById('beep');

  const tick = () => {
    secondsLeftRef.current = secondsLeftRef.current - 1;
    setSecondsLeft(secondsLeftRef.current);
  }

  const switchModeToWork = () => {
    const nextMode = modeRef.current === 'work' ? 'break' : 'work';
    const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;

    setMode(nextMode);
    modeRef.current = nextMode;

    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

  const changeSeconds = () => {
    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);
  }

  const setDefaultTimes = () => {
    settingsInfo.setBreakMinutes(5);
    settingsInfo.setWorkMinutes(25);
  }

  const stopAndResetAudio = (audioTag) => {
    audioTag.pause();
    audioTag.currentTime = 0;
  }

  const pauseTimer = () => {
    setIsPaused(true);
    isPausedRef.current = true;
  }

  useEffect(() => {

    const switchMode = () => {
      const nextMode = modeRef.current === 'work' ? 'break' : 'work';
      const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = (modeRef.current === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;
    setSecondsLeft(secondsLeftRef.current);


    const sound = document.getElementById('beep');

    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      if (secondsLeftRef.current === 0) {
        sound.play();
        switchMode();
        setTimeout(() => {
          tick();
        }, 1000);
      } else {
        tick();
      }

    }, 1000)

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const reset = () => {
    setDefaultTimes();
    mode === 'work' ? changeSeconds() : switchModeToWork();
    pauseTimer();
    stopAndResetAudio(audioBeep);
  };

  const handlePlayPauseClick = () => {
    if (isPaused) {
      setIsPaused(false);
      isPausedRef.current = false;
    } else {
      pauseTimer();
    }
  }

  let minutes = Math.floor(secondsLeft / 60);
  if (minutes < 10) minutes = `0${minutes}`
  let seconds = secondsLeft % 60
  if (seconds < 10) seconds = `0${seconds}`

  return (
    <div id="timer">
      <div id='timer-label'>
      {mode}
      </div>
      <div id="time-left">{`${minutes}:${seconds}`}</div>
      <audio id="beep" src={alarmSound}></audio>
      <PlayPauseButton onClick={handlePlayPauseClick} isPaused={isPaused}/>
      <ResetButton onClick={reset}/>
    </div>
  );
}

export default Timer;
