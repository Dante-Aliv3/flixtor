/*import logo from './logo.svg';*/
import logo from './spinner-brand.svg';
import React, { useState } from 'react';
import {  useEffect } from "react";
import './App.css';
import '../src/css/global.css';
import $ from 'jquery';
import { Button } from 'semantic-ui-react'

const defaultState = {
  defaultmessage: 'The toggle animation is currently:',
  Toggle: {
    condition: true, // New first name from the input
    isActive: 'on',
    location: 'src/App.js'
  }
};

let imageTransition;

$(document).ready(function(){
  //alert('restarting reactjs');
  //alert(state.Toggle.isActive);
});


function App() {
  // const [Toggle, setToggle] = useState(0);
  const [state, setState] =
      useState({
        ...defaultState, // Copy the global fields
        /*defaultmessage: 'The toggle is currently:',
        Toggle: {
          ...defaultState.Toggle,
          condition: false, // New first name from the input
          location: 'src/App.js'
        }*/
      });

  useEffect(() => {
    // Update the document title using the browser API
    //document.title = `You clicked ${count} times`;
    console.log(state);
  });
  function updateToggle(){
    //console.log(state);
    setState({
      ...state, // Copy the old fields
      Toggle: {
        condition: (state.Toggle.condition ? false : true), // But override this one
        isActive: (state.Toggle.condition ? 'off' : 'on') // But override this one
      }
    });
  }

  function loadPage(){
    alert('this has been clicked!');
  }

  //console.log(state.Toggle.condition);
  if(state.Toggle.condition){
    if (!imageTransition) {
      imageTransition = setInterval(function () {
        let $featured_image = $('.App-logo');
        //console.log('run interval');
        //console.log({$featured_image});

        let $new_image = (($featured_image.get(0).src.indexOf("spinner-brand") >= 0) ? '/logo.svg' : '/spinner-brand.svg');
        //console.log({$new_image});
        $featured_image.first().toggleClass("fadeIn fadeOut");
        setTimeout(() => {
          $('.App-logo').first().toggleClass("fadeIn fadeOut")
        }, "500");
        setTimeout(() => {
          let image = $new_image;
          $('.App-logo').first().attr("src", $new_image);
        }, "500");
        // $featured_image.fadeOut('slow', function() {
        //   $featured_image.attr("src", $new_image) // change src
        //       .load(function() {
        //         // after load complete
        //         // fade in the image
        //         $featured_image.removeAttr("srcset");
        //         $featured_image.fadeIn(400);
        //       });
        // });
      }, 3000);
      // let $new_image = (state.Toggle.condition ? false : true);
    }
  } else {
    clearInterval(imageTransition);
    imageTransition = null;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo fadeIn" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <ToggleButton  runOnClick={updateToggle}/>
        <a className='toggle-display__link' style={{cursor: "pointer", padding: "20px 0px"}}><h2>{state.defaultmessage}{' '}{state.Toggle.isActive}</h2></a>
        <a
          className="App-link"
          href="#"
          rel="noopener noreferrer"
          onClick={loadPage}
        >
          Learn React
        </a>
        {/*{console.log(state)}*/}
      </header>
    </div>
  );
}

function ToggleButton({runOnClick}) {
  const [buttonState, setButtonState] = useState({active: true});
  function handleClick() {setButtonState((prevState) => ({ active: !prevState.active }));{runOnClick()}}

  //console.log({buttonState});

  return (
      <Button toggle active={buttonState.active} onClick={handleClick}>
        Toggle Animation
      </Button>
  )
}
export default App;
