import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

const Clock = () => {  
  const [seconds, updateSeconds] = React.useState(new Date().getSeconds());
  const [minutes, updateMinutes] = React.useState(new Date().getMinutes());
  const [hours, updateHours] = React.useState(new Date().getHours());
  const [value, updateValue] = React.useState(1);
  
  const savedCallback = React.useRef();
  
  const handleChange = (e) => {
    updateValue(e.target.value)
  }
  
  const callback = () => {
    updateSeconds(seconds - value);

    if(seconds < 0) {
      updateSeconds(59 + seconds);
      updateMinutes(minutes - 1);

      if(minutes <=0){
        updateMinutes(59);
        updateHours(hours - 1)
        
        if(hours <=0){
          updateHours(23)
        }
      }
    }
  }
  
  const tick = () => {
     savedCallback.current();
  }
  
  React.useEffect(() => {
    savedCallback.current = callback;
  })
  
  React.useEffect(() => {
    let tiktok = setInterval(tick, 1000);
    
    return () => clearInterval(tiktok);
  }, [])
  
  
    return (
      <div>
        <h3> <strong>{ hours }</strong> <span>Hours</span></h3>
        <h3> <strong>{ minutes }</strong> <span>Minutes</span></h3>
        <h3> <strong>{ seconds }</strong> <span>Seconds</span></h3>
        <input
          id="seconds"
          type="number"
          min="1"
          max="9"
          onChange={handleChange}
          placeholder="Please input from 1 - 9"

        />
      </div>
    )
  
}

ReactDOM.render(<Clock />, document.getElementById('clock'));

export default Clock;