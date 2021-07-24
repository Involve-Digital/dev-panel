import React, {Component} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class Slat extends Component {
  render() {
    return (
      <div className={"iv-accordion__headline" + (this.props.isOpened ? ' is--active' : '')} onClick={() => {this.props.toggle()}}>
        <div className="iv-accordion__icon">
          <FontAwesomeIcon icon={['fas', this.props.icon]}/>
        </div>
        {this.props.text}
      </div>
    );
  }
}

export default Slat;
