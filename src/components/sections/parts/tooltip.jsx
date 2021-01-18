import React, {Component} from "react";


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class Tooltip extends Component {
  render() {
    return (
      <span className="iv-tooltip" data-tip={this.props.text}>
        <FontAwesomeIcon icon={['fas', 'question']}/>
      </span>
    );
  }
}

export default Tooltip;
