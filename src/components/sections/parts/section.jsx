import {Component} from "react";

import Cookies from "universal-cookie";

class Section extends Component {
  cookies = new Cookies();

  constructor(props, name) {
    super(props);

    this.name = name;

    this.state = {
      isOpened: this.cookies.get('dev-panel-' + name + '-opened') === 'true',
      isModalOpened: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

    this.handleToggleModalViaKeyboard = this.handleToggleModalViaKeyboard.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleToggleModalViaKeyboard);
  }

  handleToggleModalViaKeyboard(e) {
    if (e.code === 'Escape' && this.state.isModalOpened) {
      this.toggleModal();
    }
  }

  toggle() {
    const isOpened = !this.state.isOpened;

    this.setState({
      isOpened: isOpened
    });

    this.cookies.set('dev-panel-' + this.name + '-opened', isOpened);
  };

  toggleModal() {
    this.setState({
      isModalOpened: !this.state.isModalOpened
    });
  }

  shouldBeEventStopped(e) {
    var focusedElement = document.activeElement.tagName;
    var focusedElementIsInput = focusedElement === 'INPUT' || focusedElement === 'TEXTAREA' || focusedElement === 'SELECT';

    return focusedElementIsInput || (!e.shiftKey && e.ctrlKey);
  }
}

export default Section;
