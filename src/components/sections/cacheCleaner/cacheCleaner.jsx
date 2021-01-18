import React from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import Section from "../parts/section";
import Slat from "../parts/slat";
import Settings from "../parts/settings";
import Modal from "../parts/modal";
import SaveButton from "../parts/saveButton";
import Tooltip from "../parts/tooltip";

import Shortcuts from "../parts/shortcuts";
import {store} from "react-notifications-component";

class CacheCleaner extends Section {
  constructor(props) {
    super(props, 'cache-cleaner');

    this.state.cacheCleaner = JSON.parse(JSON.stringify(window.devPanel.cacheCleaner));

    this.save = this.save.bind(this);

    this.handleQuickCacheCleanup = this.handleQuickCacheCleanup.bind(this);
  }

  componentDidMount() {
    super.componentDidMount();
    window.addEventListener('keydown', this.handleQuickCacheCleanup);
  }

  handleQuickCacheCleanup(e) {
    if (this.shouldBeEventStopped(e)) {
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
    store.addNotification({
      title: "dev-panel",
      message: "data saved successfully",
      type: "success",
      insert: "top",
      container: "bottom-left",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeIn"],
      dismiss: {
        duration: 2000,
        onScreen: true
      }
    });

    window.devPanel.cacheCleaner = JSON.parse(JSON.stringify(this.state.cacheCleaner));
    window.saveDevPanelData();

    this.toggleModal();
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
                      <Tooltip text="Link that will be hit; Backend logic for cleaning temp / cache files is on specified URL"/>
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
