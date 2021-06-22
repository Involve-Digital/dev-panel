import React from 'react';

import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {store} from 'react-notifications-component';

import DevPanel from "./components/devPanel";
import ReactNotification from 'react-notifications-component'

import './App.css';
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css';

library.add(fas);

store.flashMessage = function (message, type) {
  if (typeof type === 'undefined') {
    type = 'success';
  }

  store.addNotification({
    title: 'dev-panel',
    message: message,
    type: type,
    insert: "top",
    container: "bottom-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeIn"],
    dismiss: {
      duration: 2000,
      onScreen: true
    }
  });
};

function App() {
  return (
    <>
      <DevPanel/>
      <ReactNotification/>
    </>
  );
}

export default App;
