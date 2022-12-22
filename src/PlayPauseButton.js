import React from 'react';

function PlayPauseButton(props) {

  return (
    <button {...props} id='start_stop' className='timer-buttons'>
      <i className={ props.isPaused ? "fa-solid fa-play" : "fa-solid fa-pause"}></i>
    </button>
  );
}

export default PlayPauseButton;
