import React, {Component} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class SaveButton extends Component {
  render() {
    return (
      <div className="iv-modal__footer">
        <button onClick={() => {this.props.onClick()}} className="iv-button iv-button--success">
          <FontAwesomeIcon icon={['fas', 'save']}/>
          &nbsp;
          Save
        </button>
      </div>
    );
  }
}

export default SaveButton;
