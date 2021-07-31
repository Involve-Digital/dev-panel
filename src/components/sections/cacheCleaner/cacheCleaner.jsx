import React from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import DevPanel from "../../devPanel";
import Section from "../_parts/section";
import Slat from "../_parts/slat";
import Settings from "../_parts/settings";
import Modal from "../_parts/modal";
import SaveButton from "../_parts/saveButton";
import Tooltip from "../_parts/tooltip";

import Shortcuts from "../_parts/shortcuts";
import {store} from "react-notifications-component";
import ReactTooltip from "react-tooltip";

class CacheCleaner extends Section {
  constructor(props) {
    super(props, 'cache-cleaner');

    this.state.cacheCleaner = JSON.parse(JSON.stringify(window.devPanel.data.cacheCleaner));

    this.save = this.save.bind(this);

    this.handleQuickCacheCleanup = this.handleQuickCacheCleanup.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleQuickCacheCleanup);
  }

  shouldComponentUpdate() {
    if (!window.devPanel.hasConfigurationJustChanged) {
      return true;
    }

    if (!DevPanel.equals(this.state.cacheCleaner, window.devPanel.data.cacheCleaner)) {
      this.state.cacheCleaner = DevPanel.clone(window.devPanel.data.cacheCleaner);
    }

    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    ReactTooltip.rebuild();
  }

  handleQuickCacheCleanup(e) {
    if (DevPanel.shouldBeEventStopped(e)) {
      return;
    }

    if (e.code === 'KeyT') {
      this.cleanCache();
    }
  }

  saveLink(value) {
    const cacheCleaner = this.state.cacheCleaner;
    cacheCleaner.link = value;

    this.setState({
      cacheCleaner: cacheCleaner
    });
  }

  saveReload(value) {
    const cacheCleaner = this.state.cacheCleaner;
    cacheCleaner.reload = value;

    this.setState({
      cacheCleaner: cacheCleaner
    });
  }

  save() {
    window.devPanel.data.cacheCleaner = JSON.parse(JSON.stringify(this.state.cacheCleaner));
    window.devPanel.saveData();

    this.toggleModal();

    store.flashMessage('data saved successfully');
  }

  cleanCache() {
    var request = new XMLHttpRequest();
    request.open('GET', this.state.cacheCleaner.link, true);

    if (this.state.cacheCleaner.reload) {
      request.onload = function () {
        window.location.reload();
      };
    }

    request.send();
  }

  render() {
    return (
      <div className="iv-accordion">
        <Slat
          isOpened={this.state.isOpened}
          toggle={this.toggle}
          icon="trash-alt"
          text="Temp / cache cleaner"
        />

        <div className={'iv-accordion__content' + (this.state.isOpened ? ' opened' : '')}>
          <div className="iv-t-center">
            <button className="iv-button iv-button--alert" onClick={() => this.cleanCache()}>
              <FontAwesomeIcon icon={['fas', 'trash-alt']}/>
              Delete temp & cache
            </button>
          </div>
          <hr className="iv-hr"/>

          <Shortcuts shortcuts={[{key: 't', description: 'delete temp / cache'}]}/>

          <hr className="iv-hr"/>

          <Settings buttons={[{icon: 'cogs', onClick: this.toggleModal}]}/>
        </div>

        <Modal
          opened={this.state.isModalOpened}
          close={this.toggleModal}
          width={300}
          title="Temp / cache cleaner"
          content={
            <>
              <table className="iv-table">
                <thead>
                  <tr>
                    <td>
                      Cache cleaner link
                      <Tooltip
                        text="Link that will be hit; Backend logic for cleaning temp / cache files is on specified URL"/>
                    </td>
                    <td>
                      Reload page
                      <Tooltip text="Reload page after temp / cache is deleted?"/>
                    </td>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      <input
                        className="iv-input"
                        type="text"
                        onChange={(e) => this.saveLink(e.target.value)}
                        value={this.state.cacheCleaner.link}
                      />
                    </td>

                    <td>
                      <input
                        className="iv-checkbox"
                        type="checkbox"
                        onChange={(e) => this.saveReload(e.target.checked)}
                        checked={this.state.cacheCleaner.reload}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <hr className="iv-hr"/>

              <SaveButton onClick={this.save}/>
            </>
          }
        />
      </div>
    );
  }
}

export default CacheCleaner;
