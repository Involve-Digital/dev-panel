import React from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import Section from "../parts/section";
import Slat from "../parts/slat";
import Settings from "../parts/settings";
import Modal from "../parts/modal";
import SaveButton from "../parts/saveButton";
import Tooltip from "../parts/tooltip";

import Shortcuts from "../parts/shortcuts";

import FormFillersRow from "./formFillersRow";
import {store} from "react-notifications-component";

class FormFillers extends Section {
  constructor(props) {
    super(props, 'form-fillers');

    this.state.formFillers = JSON.parse(JSON.stringify(window.devPanel.formFillers));
    this.state.tab = 0;

    this.addRow = this.addRow.bind(this);
    this.saveRow = this.saveRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.save = this.save.bind(this);

    this.handlePick = this.handlePick.bind(this);

    this.handleQuickFormFill = this.handleQuickFormFill.bind(this);
  }

  componentDidMount() {
    super.componentDidMount();

    window.addEventListener('keydown', this.handleQuickFormFill);
  }

  handleQuickFormFill(e) {
    if (this.shouldBeEventStopped(e)) {
      return;
    }

    let formFillers = window.devPanel.formFillers;

    if (e.code === 'KeyF') {
      for (let i = 0; i < formFillers.length; i++) {
        if (formFillers[i].default) {
          this.useFormFiller(formFillers[i]);
          return;
        }
      }
    }
  }

  toggleTab(index) {
    this.setState({
      tab: parseInt(index)
    });
  }

  addFormFiller() {
    const formFillers = this.state.formFillers;
    formFillers.push({title: '', values: [{name: '', value: ''}]});

    this.setState({
      formFillers: formFillers
    });
  }

  deleteFormFiller(index) {
    const formFillers = this.state.formFillers;
    formFillers.splice(index, 1);

    this.setState({
      formFillers: formFillers
    });
  }

  saveTitle(index, value) {
    const formFillers = this.state.formFillers;
    formFillers[index].title = value;

    this.setState({
      formFillers: formFillers
    });
  }

  saveDefault(index, value) {
    const formFillers = this.state.formFillers;

    for (let i = 0; i < formFillers.length; i++) {
      formFillers[i].default = false;
    }

    formFillers[index].default = value;

    this.setState({
      formFillers: formFillers
    });
  }

  addRow(formFillerIndex) {
    const formFillers = this.state.formFillers;
    formFillers[formFillerIndex].values.push({title: '', link: ''});

    this.setState({
      formFillers: formFillers
    });
  }

  saveRow(formFillerIndex, index, field, value) {
    const formFillers = this.state.formFillers;
    formFillers[formFillerIndex].values[index][field] = value;

    this.setState({
      formFillers: formFillers
    });
  }

  deleteRow(formFillerIndex, index) {
    const formFillers = this.state.formFillers;

    if (formFillers[formFillerIndex].values.length <= 1) {
      formFillers[formFillerIndex].values[index] = {name: '', value: ''};
    } else {
      formFillers[formFillerIndex].values.splice(index, 1);
    }

    this.setState({
      formFillers: formFillers
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

    window.devPanel.formFillers = JSON.parse(JSON.stringify(this.state.formFillers));
    window.saveDevPanelData();

    this.toggleModal();
  }

  useFormFiller(formFiller) {
    for (let i = 0; i < formFiller.values.length; i++) {
      let elements = document.getElementsByName(formFiller.values[i].name);
      let valueToFill = formFiller.values[i].value;

      if (valueToFill && valueToFill.includes('(rand)')) {
        valueToFill = valueToFill.replace('(rand)', Math.floor(Math.random() * 10000));
      }

      for (let i2 = 0; i2 < elements.length; i2++) {
        let type = elements[i2].getAttribute('type');
        if (type === 'text' || type === 'password' || type === 'email' || type === 'tel') {
          elements[i2].value = valueToFill;
          continue;
        }

        if (type === 'checkbox' && !elements[i2].getAttribute('value')) {
          elements[i2].checked = true;
          continue;
        }

        if ((type === 'checkbox' || type === 'radio') && elements[i2].getAttribute('value') === valueToFill) {
          elements[i2].checked = true;
          continue;
        }

        if (elements[i2].tagName === 'SELECT') {
          for (let i3 = 0; i3 < elements[i2].options.length; i3++) {
            if (elements[i2].options[i3].getAttribute('value') === valueToFill) {
              elements[i2].selectedIndex = i3;
              break;
            }
          }
        }

        if (elements[i2].tagName === 'TEXTAREA') {
          elements[i2].innerHTML = valueToFill;
        }
      }
    }

    store.addNotification({
      title: "dev-panel",
      message: "form filler used: " + formFiller.title,
      type: "info",
      insert: "top",
      container: "bottom-left",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeIn"],
      dismiss: {
        duration: 1500,
        onScreen: true
      }
    });
  }

  handlePick(formFillerIndex, index) {
    const toggleDevPanel = this.props.toggle;
    const toggleModal = this.toggleModal;

    const values = this.state.formFillers[formFillerIndex].values;

    for (let i = 0; i < values.length; i++) {
      const inputs = document.querySelectorAll('[name="' + values[i].name + '"]');

      for (let i2 = 0; i2 < inputs.length; i2++) {
        inputs[i2].classList.add('dev-panel-picked');
      }
    }

    toggleDevPanel();
    toggleModal();

    const addRow = this.addRow;

    document.addEventListener('click', function (e) {
      let inputs = document.getElementsByClassName('dev-panel-picked');

      while (inputs.length) {
        inputs[0].classList.remove('dev-panel-picked');
      }

      if (typeof index !== 'undefined') {
        values[index].name = e.target.getAttribute('name');
        values[index].value = e.target.value;
      } else {
        addRow(formFillerIndex);

        values[values.length - 1].name = e.target.getAttribute('name');
        values[values.length - 1].value = e.target.value;
      }

      toggleDevPanel();
      toggleModal();

      if (typeof index === 'undefined') {
        index = values.length - 1;
      }

      document.getElementById('ffv-' + formFillerIndex + '-' + index).focus();
    }, {once: true});
  }

  render() {
    return (
      <div className="iv-accordion">
        <Slat
          isOpened={this.state.isOpened}
          toggle={this.toggle}
          icon="pencil-alt"
          text="Form fillers"
        />

        <div className={'iv-accordion__content' + (this.state.isOpened ? ' opened' : '')}>
          <ul className="iv-list iv-list--links">
            {window.devPanel.formFillers.map((value, index) => {
              return <li key={index}><a type="button" onClick={() => this.useFormFiller(value)}>
                <FontAwesomeIcon icon={['fas', 'pencil-alt']}/>
                {value.title}
              </a></li>
            })}
          </ul>

          <hr className="iv-hr"/>

          <Shortcuts shortcuts={[{key: 'f', description: 'use default formfiller'}]}/>

          <hr className="iv-hr"/>

          <Settings buttons={[{icon: 'edit', onClick: this.toggleModal}]}/>
        </div>

        <Modal
          opened={this.state.isModalOpened}
          close={this.toggleModal}
          width={500}
          title="Form fillers"
          content={
            <>
              {this.state.formFillers.map((value, index) => {
                return <div key={index} className="iv-tab">
                  <input
                    id={'form-filler-tab-' + index}
                    name="tab"
                    type="radio"
                    value={index}
                    checked={this.state.tab === index}
                    onChange={(e) => this.toggleTab(e.target.value)}
                  />
                  <label htmlFor={'form-filler-tab-' + index}>
                    {value.title ? value.title : 'New form filler'}
                  </label>
                </div>
              })}

              <div className="iv-tab iv-tab--add" onClick={() => this.addFormFiller()}>
                <FontAwesomeIcon icon={['fas', 'plus']}/>
              </div>

              {this.state.formFillers.map((value, index) => {
                return <div
                  key={index}
                  className={'iv-tab__content' + (this.state.tab === index ? ' is--active' : '')}
                >
                  <table className="iv-table">
                    <thead>
                      <tr>
                        <th>
                          Form filler title
                          <Tooltip text="Name of formfiller; is displayed in dev-panel"/>
                        </th>
                        <th>
                          Is default
                          <Tooltip text='If checked, form filler will be used while using keyboard combo "shift + f"'/>
                        </th>
                        <th className="iv-control">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>
                          <input
                            className="iv-input"
                            type="text"
                            onChange={(e) => this.saveTitle(index, e.target.value)}
                            value={value.title}
                          />
                        </td>

                        <td>
                          <input
                            className="iv-checkbox"
                            type="checkbox"
                            onChange={(e) => this.saveDefault(index, e.target.checked)}
                            checked={value.default}
                          />
                        </td>

                        <td className="iv-control">
                          <button className="iv-button iv-button--alert" onClick={() => this.deleteFormFiller(index)}>
                            <FontAwesomeIcon icon={['fas', 'trash']}/>
                            Delete form filler
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <hr className="iv-hr"/>

                  <div>
                    TIP: You can pre fill your page form and then simply pick all the desired inputs via action buttons bellow. Name and value will be filled automatically.
                    <Tooltip text='"Target" icon will let you pick desired input right from the page; "Bullseye" will add new form filler and let you pick desired input from page as well'/>
                  </div>

                  <hr className="iv-hr"/>

                  <table className="iv-table">
                    <thead>
                      <tr>
                        <th>Name(attribute)</th>
                        <th>Value to fill</th>
                        <th className="iv-control">Actions</th>
                      </tr>
                    </thead>
                    <tbody>

                      {this.state.formFillers[index].values.map((value, rowIndex) => {
                        return <FormFillersRow
                          key={rowIndex}
                          formFillerIndex={index}
                          index={rowIndex}
                          name={value.name}
                          value={value.value}
                          saveRow={this.saveRow}
                          deleteRow={this.deleteRow}
                          handlePick={this.handlePick}
                        />
                      })}

                      <tr>
                        <td colSpan="2"></td>
                        <td className="iv-control">
                          <div onClick={() => this.handlePick(index)}>
                            <FontAwesomeIcon icon={['fas', 'bullseye']}/>
                          </div>

                          <div className="iv-control__success" onClick={() => this.addRow(index)}>
                            <FontAwesomeIcon icon={['fas', 'plus']}/>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              })}

              <hr className="iv-hr"/>

              <SaveButton onClick={this.save}/>
            </>
          }
        />
      </div>
    );
  }
}

export default FormFillers;
