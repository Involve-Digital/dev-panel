import React from 'react';

import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'

import DevPanel from "./components/devPanel";
import ReactNotification from 'react-notifications-component'

import './App.css';
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css';

library.add(fas);

function App() {
  return (
    <>
      <DevPanel/>
      <ReactNotification/>
    </>
  );
}

export default App;
