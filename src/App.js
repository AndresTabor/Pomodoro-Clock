import React, { useEffect, useState } from 'react'
import './index.css';
import { IoPlaySkipForward } from 'react-icons/io5'
import { GrPowerReset } from 'react-icons/gr'
import { BsPlusLg } from 'react-icons/bs'
import { HiMinus } from 'react-icons/hi'

function App() {
  const [breakTime, setBreakTime] = useState( 5 );
  const [sessionTime, setSessionTime] = useState( 25 );
  const [sessionMinutes, setSessionMinutes] = useState( sessionTime );
  const [breakMinutes, setBreakMinutes] = useState( breakTime );
  const [curretTimer, setCurretTimer] = useState( false );
  const [seconds, setSeconds] = useState( '0'+ 0 )
  const [timerController, setTimerController] = useState({
    timer:'',
    reset:''
  })
  
  const lengthIncrement = ( currentFocus ) => {
    switch (currentFocus) {
      case 'session':
        setSessionTime( sessionTime + 1 );
        setSessionMinutes( sessionTime + 1 );
        break;

      case 'break':
        setBreakTime( breakTime + 1 ); 
        setBreakMinutes( breakTime + 1 );  
        break;

      default:
        break;
    }
  }

  const lengthDecrement = ( currentFocus ) => {
    switch (currentFocus) {
      case 'session':
        if ( sessionTime > 1 ) {
          setSessionTime( sessionTime - 1 );
          setSessionMinutes( sessionMinutes - 1 );
        }
        break;

      case 'break':
        if ( breakTime > 1 ) {
          setBreakTime( breakTime -1 );
          setBreakMinutes( breakMinutes - 1 );   
        } 
        break;

      default:
        break;
    }
  }

  const changeTimer = ( curretTimer ) => {
    console.log( !curretTimer );
    setCurretTimer( !curretTimer )
  }

  useEffect(() => {
    console.log('montaje');
    
  }, [])

  const initIterval = () => {
    console.log( 'inicio' ); 
    let segundos = 60; 
    let minutos;
    if ( curretTimer === true ) {
      minutos = sessionMinutes;
      setSessionMinutes( minutos - 1 );
      if ( minutos === 1 ) {
        setSessionMinutes( '0'+ 0 );
        minutos = minutos - 1;
      }      
    }else{
      minutos = breakMinutes ;
      console.log(minutos);
      setBreakMinutes( minutos - 1 );
      minutos = minutos - 1;
      if ( minutos === 1) {
        setSessionMinutes( '0'+ 0 );
        minutos = minutos - 1;
      }
    }
    // intervalo de segundos
    const secondsInterval = setInterval(() => {
      segundos = segundos -1 ;
      if ( segundos > 9) {
        setSeconds( segundos );        
      }else{
        setSeconds( '0' + segundos );
      }
      if ( segundos <= 0 ) {
        segundos = 60;
      }
      
    },1000);
    //intervalo de minutos
    const minutesInterval = setInterval(() => {
      console.log(minutos);
      minutos = minutos - 1;
      console.log(minutos);
      curretTimer === true ? setSessionMinutes( minutos )
      : setBreakMinutes( minutos );
      if ( minutos === 0) {
        curretTimer === true ? setSessionMinutes( '0'+ minutos )
        :setBreakMinutes( '0'+ minutos );
      } 
      if ( minutos < 0 ) {
        console.log('reinicio');
        changeTimer( curretTimer );
        clearInterval( secondsInterval );
        clearInterval( minutesInterval );
      }     
    },60000)

    setTimerController({ ...timerController,timer:secondsInterval})
  }
  
  const reset = () =>{
    clearInterval(timerController.timer)
    setBreakTime( 5 );
    setBreakMinutes( 5 );
    setSessionTime( 25 );
    setSessionMinutes( 25 );
    setCurretTimer( true );
    setTimerController( true )  
    
  }

  return (
    <div className="App" id='app'>
      <div id='container'>
        <h1>Pomodoro Clock</h1>
        <div id='length-controls'>
          <div id='break-controls'>
            <label id="break-label">break length</label>
            <div className='b-length'>
              <button id="break-increment" className='buttons-length' onClick={() => lengthIncrement( 'break' )}><BsPlusLg/></button>
              <label id="break-length">{breakTime}</label>
              <button id="break-decrement" className='buttons-length' onClick={() => lengthDecrement( 'break' )}><HiMinus/></button>
            </div>
          </div>
          <div id='session-controls'>
            <label id="session-label">session length</label>
            <div className='b-length'>
              <button id="session-increment" className='buttons-length' onClick={() => lengthIncrement( 'session' )}><BsPlusLg/></button>
              <label id="session-length">{sessionTime}</label>
              <button id="session-decrement" className='buttons-length' onClick={() => lengthDecrement( 'session' )}><HiMinus/></button>
            </div>
          </div>
        </div>
        <div id='counter-container'>
          <label id="timer-label">{curretTimer === true ? 'session': 'break'}</label>
          <label id="time-left">
            { curretTimer === true ? sessionMinutes + ':' + seconds
              : breakMinutes + ':' + seconds
            }          
          </label>
          <div id='counter-controls'>
            <button id='start_stop' className='buttons-length' onClick={()=> initIterval()}><IoPlaySkipForward/></button>
            <button id='reset' className='buttons-length' onClick={() => reset()}><GrPowerReset/></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
