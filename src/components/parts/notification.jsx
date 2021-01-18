import React, {Component} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShown: window.devPanelNotification
    };

    setTimeout(
      () => this.setState({ isShown: false }),
      2000
    );
  }

  render() {
    return (
      <div className={"notification" + (this.state.isShown ? ' is--active' : '')}>
        <FontAwesomeIcon icon={['fas', 'info-circle']}/>
        &nbsp;
        dev-panel data saved
      </div>
    );
  }
}

export default Notification;
