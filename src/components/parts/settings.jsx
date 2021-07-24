import React, {Component} from "react";

import Cookies from 'universal-cookie';
import { store } from 'react-notifications-component';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import DevPanel from "../devPanel";
import Modal from "../sections/_parts/modal";

class Settings extends Component {
  cookies = new Cookies();

  constructor(props) {
    super(props);

    this.state = {
      newConfigurationName: '',
      isNewConfigurationModalOpened: false,
      isHelpModalOpened: false,
      currentConfiguration: window.devPanel.getCurrentConfiguration()
    };

    this.toggleHelpModal = this.toggleHelpModal.bind(this);

    this.setCurrentConfiguration = this.setCurrentConfiguration.bind(this);
    this.exportConfiguration = this.exportConfiguration.bind(this);

    this.handleToggleModalViaKeyboard = this.handleToggleModalViaKeyboard.bind(this);
    this.handleQuickConfigurationSwitch = this.handleQuickConfigurationSwitch.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleToggleModalViaKeyboard);
    window.addEventListener('keydown', this.handleQuickConfigurationSwitch);
  }

  toggleHelpModal() {
    this.setState({
      isHelpModalOpened: !this.state.isHelpModalOpened
    });
  };

  handleToggleModalViaKeyboard(e) {
    if (e.code === 'Escape' && this.state.isHelpModalOpened) {
      this.toggleHelpModal();
    }
  }

  handleQuickConfigurationSwitch(e) {
    if (DevPanel.shouldBeEventStopped(e)) {
      return;
    }

    if (e.code !== 'KeyQ') {
      return;
    }

    let configurations = window.devPanel.configurations;

    if (configurations.length === 1) {
      return;
    }

    let configuration = window.devPanel.getCurrentConfiguration();
    let configurationToSet;

    for (let i = 0; i < configurations.length; i++) {
      if (configurations[i] !== configuration) {
        continue;
      }

      if (i + 1 === configurations.length) {
        configurationToSet = configurations[0];
      } else {
        configurationToSet = configurations[i + 1];
      }
    }

    this.setCurrentConfiguration(configurationToSet);
  }

  setCurrentConfiguration(configuration) {
    DevPanel.cookies.set('dev-panel-configuration', configuration);

    this.state.currentConfiguration = configuration;

    window.devPanel.loadData(configuration);

    window.devPanel.hasConfigurationJustChanged = true;
    this._reactInternalFiber._debugOwner.stateNode.forceUpdate();
    window.devPanel.hasConfigurationJustChanged = false;

    store.flashMessage('Loaded configuration: ' + configuration);
  }

  exportConfiguration() {
    window.devPanel.exportConfiguration();
  }

  render() {
    return (
      <div className="iv-panel__settings">
        <div className="iv-configuration">
          <div>Configuration</div>
          <select value={this.state.currentConfiguration} onChange={(e) => this.setCurrentConfiguration(e.target.value)}>
            {window.devPanel.configurations.map((value) => {
              return <option value={value} key={value}>{value}</option>
            })}
          </select>

          <FontAwesomeIcon icon={['fas', 'download']} onClick={this.exportConfiguration}/>
        </div>

        <div className="iv-help">
          <div>Help</div>
          <FontAwesomeIcon icon={['fas', 'question-circle']} onClick={this.toggleHelpModal}/>
        </div>

        <Modal
          opened={this.state.isHelpModalOpened}
          close={this.toggleHelpModal}
          width={500}
          title="Help"
          content={
            <>
              <h3>Useful links</h3>
              <ul className="iv-list">
                <li>This section allows you to add links, that you will have easy access to.</li>
                <li>For example links for pages, that are not in menu, or can be accessed only via address bar.</li>
              </ul>

              <h3>Form fillers</h3>
              <ul className="iv-list">
                <li>This is an easy tool, that allows you to fill forms without need to type manually.</li>
                <li>You can have multiple form fillers for various scenarious, or one form filler for whole app.</li>
                <li>
                  Explanations:
                  <ol>
                    <li><b>Form filler title</b> - text, that will be shown on button</li>
                    <li><b>Is default</b> - when selected, this allows you to use keyboard combo <b>shift + f</b> that will perform form filling action of selected form filler</li>
                    <li><b>Crosshair icon</b> - this allows you to pick input right from the page, name and value will be filled automatically, this way you can prefile whole form and then just pick all the desired inputs</li>
                    <li><b>Bullseye icon</b> - adds new row and then performs same as Crosshair icon, already picked inputs will be colored green</li>
                  </ol>
                </li>
              </ul>

              <h3>User logins</h3>
              <ul className="iv-list">
                <li>This section allows you to quickly log in / out without need to do it manually.</li>
                <li>Requires backend logic. Each user login is separate button.</li>
                <li>
                  Explanations:
                  <ol>
                    <li><b>Log-in link</b> - link to script, that will handle log-ins</li>
                    <li><b>Log-out link</b> - link to script, that will handle log-out</li>
                    <li><b>Admin redirect link</b> - link to where will you be redirected when logging as admin via keyboard combo <b>shift + a</b>, which user login will be used as admin login is determined by checkbox <b>ad.</b> in user login rows</li>
                    <li><b>Customer redirect link</b> - link to where will you be redirected when logging as customer via keyboard combo <b>shift + k</b>, which user login will be used as admin login is determined by checkbox <b>cu.</b> in user login rows</li>
                  </ol>
                </li>
              </ul>

              <h3>Temp / cache cleaner</h3>
              <ul className="iv-list">
                <li>This is a simple tool, that allows you delete temporary files or cahce from your project without need to do it manually.</li>
                <li>Requires backend logic. Called via ajax request.</li>
                <li>
                  Explanations:
                  <ol>
                    <li><b>Cache cleaner link</b> - link to script, that will delete temp / cache</li>
                    <li>Reload page - determines, if page will be reloaded after cache is deleted</li>
                  </ol>
                </li>
              </ul>
            </>
          }
        />
      </div>
    );
  }
}

export default Settings;
