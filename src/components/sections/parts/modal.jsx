import React, {Component} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class Modal extends Component {
  render() {
    return (
      <div
        onClick={(e) => {
          if (e.target.className !== 'iv-overlay is--open') {
            return;
          }

          if (document.activeElement.tagName === 'INPUT') {
            return;
          }

          this.props.close();
        }}
        className={'iv-overlay' + (this.props.opened ? ' is--open' : '')}
      >
        <div
          className={'iv-modal' + (this.props.opened ? ' is--open' : '')}
        >
          <div className="iv-modal__header">
            {this.props.title}

            <a onClick={() => {this.props.close()}} className="iv-modal__close">
              <FontAwesomeIcon icon={['fas', 'times']}/>
            </a>
          </div>

          <div className="iv-modal__body">
            {this.props.content}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
