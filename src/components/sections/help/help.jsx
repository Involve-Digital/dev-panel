import React from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import Section from "../parts/section";
import Slat from "../parts/slat";
import Settings from "../parts/settings";
import Modal from "../parts/modal";
import SaveButton from "../parts/saveButton";

import Shortcuts from "../parts/shortcuts";

class Help extends Section {
  constructor(props) {
    super(props, 'help');
  }

  render() {
    return (
      <div className="iv-accordion">
        <Slat
          isOpened={this.state.isOpened}
          toggle={this.toggle}
          icon="question-circle"
          text="Help"
        />

        <div className={'iv-accordion__content' + (this.state.isOpened ? ' opened' : '')}>
          <p>
            For random number you can use variable <strong>(rand[min-max])</strong>,
            which will be replaced with random number from <i>min</i> to <i>max</i>.
            <br/>e.g: <u>customer(rand[1000-2000])@test.cz</u>
          </p>

          <p>
            For random string you can use variable <strong>(rand[str1,str2,...])</strong>,
            which will be replaced with random value from given set.
            <br/>e.g: <u>(rand[John,David,Mark])</u>
          </p>

          <hr className="iv-hr"/>

          <Shortcuts
            shortcuts={[
              {key: 'x', description: 'expand / minimalize'},
              {key: 'f', description: 'use default formfiller'},
              {key: 'a', description: 'log-in as admin'},
              {key: 'o', description: 'log-in as customer'},
              {key: 't', description: 'clean temp / cache'},
            ]}
          />

          <hr className="iv-hr"/>
          <Settings buttons={[{icon: 'question', onClick: this.toggleModal}]}/>
        </div>

        <Modal
          opened={this.state.isModalOpened}
          close={this.toggleModal}
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

export default Help;
