import React, {Component} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class Settings extends Component {
  render() {
    return (
      <div className="iv-setting">
        {this.props.buttons.map((value, index) => {
          return <div key={index} title="Open modal" onClick={() => {value.onClick()}}>
            <FontAwesomeIcon icon={['fas', value.icon]} key={index} className="iv-icon iv-icon--small"/>
          </div>
        })}
      </div>
    );
  }
}

export default Settings;
