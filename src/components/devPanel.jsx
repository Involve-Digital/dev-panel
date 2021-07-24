import React, {Component} from "react";

import Cookies from 'universal-cookie';

import Slat from "./parts/slat";
import Body from "./parts/body";
import ReactTooltip from 'react-tooltip';

class DevPanel extends Component {
  static cookies = new Cookies();

  static shouldBeEventStopped(e) {
    var focusedElement = document.activeElement.tagName;

    var focusedElementIsInput= focusedElement === 'INPUT'
      || focusedElement === 'TEXTAREA'
      || focusedElement === 'SELECT';

    return focusedElementIsInput || !e.shiftKey || (e.shiftKey && e.ctrlKey);
  }

  static clone(object) {
    return JSON.parse(JSON.stringify(object));
  }

  static equals(object1, object2) {
    return JSON.stringify(object1) === JSON.stringify(object2)
  }

  constructor(props) {
    super(props);

    this.state = {
      isOpened: DevPanel.cookies.get('dev-panel-opened') === 'true'
    };

    this.toggle = this.toggle.bind(this);

    this.handleQuickToggle = this.handleQuickToggle.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleQuickToggle);
  }

  handleQuickToggle(e) {
    if (DevPanel.shouldBeEventStopped(e)) {
      return;
    }

    if (e.code === 'KeyX') {
      this.toggle();
    }
  };

  toggle() {
    const isOpened = !this.state.isOpened;

    this.setState({
      isOpened: isOpened
    });

    DevPanel.cookies.set('dev-panel-opened', isOpened);
  };

  render() {
    return (
      <div className={'iv-panel' + (this.state.isOpened ? ' is--open' : '')}>
        <Slat toggle={this.toggle}/>
        <Body toggle={this.toggle}/>
        <ReactTooltip
          backgroundColor="#f5fcff"
          borderColor="#1c6f9d"
          textColor="#1c6f9d"
          border={true}
        />
      </div>
    );
  }

}

export default DevPanel;
