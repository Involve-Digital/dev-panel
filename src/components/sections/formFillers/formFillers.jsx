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

import FormFillersRow from "./formFillersRow";
import {store} from "react-notifications-component";
import ReactTooltip from "react-tooltip";

class FormFillers extends Section {
  constructor(props) {
    super(props, 'form-fillers');

    this.state.formFillers = JSON.parse(JSON.stringify(window.devPanel.data.formFillers));
    this.state.tab = 0;

    this.addRow = this.addRow.bind(this);
    this.saveRow = this.saveRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.save = this.save.bind(this);

    this.handlePick = this.handlePick.bind(this);

    this.handleQuickFormFill = this.handleQuickFormFill.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleQuickFormFill);
  }

  shouldComponentUpdate() {
    if (!window.devPanel.hasConfigurationJustChanged) {
      return true;
    }

    if (!DevPanel.equals(this.state.formFillers, window.devPanel.data.formFillers)) {
      this.state.formFillers = DevPanel.clone(window.devPanel.data.formFillers);
    }

    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    ReactTooltip.rebuild();
  }

  handleQuickFormFill(e) {
    if (DevPanel.shouldBeEventStopped(e)) {
      return;
    }

    let formFillers = window.devPanel.data.formFillers;

    if (e.code === 'KeyF') {
      for (let i = 0; i < formFillers.length; i++) {
        if (formFillers[i].quickFill) {
          this.useFormFiller(formFillers[i]);
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
    formFillers.push({title: '', values: [{name: '', value: '', events: ['change']}]});

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

    window.devPanel.data.formFillers = JSON.parse(JSON.stringify(this.state.formFillers));
    window.devPanel.saveData();

    this.toggleTab(0);

    store.flashMessage('form filler deleted successfully')
  }

  saveTitle(index, value) {
    const formFillers = this.state.formFillers;
    formFillers[index].title = value;

    this.setState({
      formFillers: formFillers
    });
  }

  saveQuickFill(index, value) {
    const formFillers = this.state.formFillers;

    formFillers[index].quickFill = value;

    this.setState({
      formFillers: formFillers
    });
  }

  addRow(formFillerIndex, events) {
    if (!events) {
      events = ['change'];
    }

    const formFillers = this.state.formFillers;
    formFillers[formFillerIndex].values.push({title: '', link: '', events: events});

    this.setState({
      formFillers: formFillers
    });
  }

  saveRow(formFillerIndex, index, field, value, add) {
    const formFillers = this.state.formFillers;

    if (field !== 'events') {
      formFillers[formFillerIndex].values[index][field] = value;
    } else {
      const events = formFillers[formFillerIndex].values[index].events;

      if (!events.includes(value) && add) {
        events.push(value);
      }

      if (events.includes(value) && !add) {
        const index = events.indexOf(value);
        if (index > -1) {
          events.splice(index, 1);
        }
      }
    }

    this.setState({
      formFillers: formFillers
    });
  }

  deleteRow(formFillerIndex, index) {
    const formFillers = this.state.formFillers;

    if (formFillers[formFillerIndex].values.length <= 1) {
      formFillers[formFillerIndex].values[index] = {name: '', value: '', events: ['change']};
    } else {
      formFillers[formFillerIndex].values.splice(index, 1);
    }

    this.setState({
      formFillers: formFillers
    });
  }

  save() {
    for (var i = 0; i < this.state.formFillers.length; i++) {
      this.state.formFillers[i].values = this.state.formFillers[i].values.filter(value => value);
    }

    window.devPanel.data.formFillers = JSON.parse(JSON.stringify(this.state.formFillers));
    window.devPanel.saveData();

    this.toggleModal();

    store.flashMessage('data saved successfully');
  }

  useFormFiller(formFiller) {
    for (let i = 0; i < formFiller.values.length; i++) {
      let elements = document.getElementsByName(formFiller.values[i].name);
      let valueToFill = formFiller.values[i].value;

      // (rand)
      if (valueToFill && valueToFill.includes('(rand)')) {
        let count = (valueToFill.match(/\(rand\)/g) || []).length;

        for (let i = 1; i <= count; i++) {
          let randNumber = Math.ceil(Math.random() * (9999 - 1) + 1);
          valueToFill = valueToFill.replace(/\(rand\)/, randNumber);
        }
      }

      // (rand[1-100])
      // (rand[Franta,Pepa,Vladimír])
      if (valueToFill && valueToFill.includes('(rand')) {
        let start = valueToFill.indexOf('(rand');
        let count = (valueToFill.match(/\(rand/g) || []).length;

        let newValueToFill = valueToFill;

        for (let i = 1; i <= count; i++) {
          start = valueToFill.indexOf('(rand', start);
          let end = valueToFill.indexOf('])', start) + 2;

          let randVar = valueToFill.substring(start, end);
          let randVarValue = valueToFill.substring(start + 6, end - 2);

          if (randVarValue.includes(',')) {
            randVarValue = randVarValue.split(',');

            let min = 0;
            let max = randVarValue.length - 1;

            let randIndex = Math.round(Math.random() * (max - min) + min);
            let randItem = randVarValue[randIndex];

            newValueToFill = newValueToFill.replace(randVar, randItem);
          } else if (randVarValue.includes('-')) {
            randVarValue = randVarValue.split('-');

            let min = parseInt(randVarValue[0]);
            let max = parseInt(randVarValue[randVarValue.length - 1]);

            let randNumber = Math.ceil(Math.random() * (max - min) + min);

            newValueToFill = newValueToFill.replace(randVar, randNumber);
          }

          start = valueToFill.indexOf('(rand', end);
        }

        valueToFill = newValueToFill;
      }

      for (let i2 = 0; i2 < elements.length; i2++) {
        let type = elements[i2].getAttribute('type');
        if (type === 'text' || type === 'number' || type === 'password' || type === 'email' || type === 'tel') {
          elements[i2].value = valueToFill;
        }

        if (type === 'checkbox' && !elements[i2].getAttribute('value')) {
          elements[i2].checked = true;
        }

        if ((type === 'checkbox' || type === 'radio') && elements[i2].getAttribute('value') === valueToFill) {
          elements[i2].checked = true;
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

        let events = formFiller.values[i].events;

        if (events.includes('change')) {
          elements[i2].dispatchEvent(new Event('change'));
        }

        if (events.includes('input')) {
          elements[i2].dispatchEvent(new Event('input'));
        }

        if (events.includes('click')) {
          elements[i2].dispatchEvent(new Event('click'));
        }

        if (events.includes('keyup')) {
          elements[i2].dispatchEvent(new KeyboardEvent('keyup'));
        }

        if (events.includes('paste')) {
          elements[i2].dispatchEvent(new KeyboardEvent('paste'));
        }
      }
    }

    store.flashMessage('form filler used: ' + formFiller.title);
  }

  handlePick(formFillerIndex, index, wholeForm) {
    var message = 'Now pick the desired input.';
    var duration = 2000;

    if (wholeForm === true) {
      message = 'Now pick the input in desired form and all other inputs in same form will be picked as well.';
      duration = 5000;
    }

    store.flashMessage(message, 'info', duration);

    const toggleDevPanel = this.props.toggle;
    const toggleModal = this.toggleModal;

    const values = this.state.formFillers[formFillerIndex].values;

    if (wholeForm !== true) {
      for (let i = 0; i < values.length; i++) {
        if (!values[i]) {
          continue;
        }

        const inputs = document.querySelectorAll('[name="' + values[i].name + '"]');

        for (let i2 = 0; i2 < inputs.length; i2++) {
          inputs[i2].classList.add('dev-panel-picked');
        }
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
      } else if (wholeForm === true) {
        let formElements = [];

        if (e.target.form) {
          formElements = e.target.form.elements;
        }

        values.length = 0;

        for (var i = 0; i < formElements.length; i++) {
          let type = formElements[i].getAttribute('type');

          if ((type === 'checkbox' || type === 'radio') && !formElements[i].checked) {
            continue;
          }

          if (type === 'hidden' || type === 'submit' || formElements[i].tagName === 'BUTTON') {
            continue;
          }

          let name = formElements[i].getAttribute('name')
          let value = formElements[i].value;

          if (!name) {
            continue;
          }

          values[i] = {};
          values[i].name = name;
          values[i].value = value;
          values[i].events = ['change'];

          if (type === 'checkbox' || type === 'radio') {
            values[i].events.push('click');
          }
        }
      } else {
        let events = ['change'];

        if (e.target.getAttribute('type') === 'checkbox' || e.target.getAttribute('type') === 'radio') {
          events.push('click');
        }

        addRow(formFillerIndex, events);

        values[values.length - 1].name = e.target.getAttribute('name');
        values[values.length - 1].value = e.target.value;
      }

      toggleDevPanel();
      toggleModal();

      if (wholeForm !== true) {
        if (typeof index === 'undefined') {
          index = values.length - 1;
        }

        document.getElementById('ffv-' + formFillerIndex + '-' + index).focus();
      }
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
            {window.devPanel.data.formFillers.map((value, index) => {
              return <li key={index}><a type="button" onClick={() => this.useFormFiller(value)}>
                <FontAwesomeIcon icon={['fas', 'pencil-alt']}/>
                {value.title}
              </a></li>
            })}
          </ul>

          <Shortcuts shortcuts={[{key: 'f', description: 'use specified formfiller'}]}/>

          <hr className="iv-hr"/>

          <Settings buttons={[{icon: 'edit', onClick: this.toggleModal}]}/>
        </div>

        <Modal
          opened={this.state.isModalOpened}
          close={this.toggleModal}
          width={800}
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
                          Quick fill
                          <Tooltip text='If checked, form filler will be used while using keyboard combo "shift + f"'/>
                        </th>
                        <th className="iv-control">
                          Action
                          <Tooltip
                            text='"Load entire form" button picks all inputs from form and adds them to form filler; "Delete" button deletes form filler'/>
                        </th>
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
                            onChange={(e) => this.saveQuickFill(index, e.target.checked)}
                            checked={value.quickFill ? value.quickFill : false}
                          />
                        </td>

                        <td className="iv-control">
                          <button className="iv-button iv-button--success"
                                  onClick={() => this.handlePick(index, undefined, true)}>
                            <FontAwesomeIcon icon={['fas', 'crosshairs']}/>
                            Load entire form
                          </button>

                          <button className="iv-button iv-button--alert" onClick={() => this.deleteFormFiller(index)}>
                            <FontAwesomeIcon icon={['fas', 'trash']}/>
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <hr className="iv-hr"/>

                  <div>
                    <FontAwesomeIcon icon={['fas', 'lightbulb']}/>
                    You can pre fill your page form and then simply pick all the desired inputs via action buttons
                    bellow, or all inputs of form via button above. Name and value will be filled automatically from
                    page.
                    <Tooltip
                      text='"Target" icon will let you pick desired input right from the page; "Bullseye" will add new form filler and let you pick desired input from page as well'/>
                  </div>

                  <hr className="iv-hr"/>

                  <div>
                    <FontAwesomeIcon icon={['fas', 'lightbulb']}/>
                    For random number you can use variable <strong>(rand[min-max])</strong>
                    <br/>
                    For random value from set you can use variable <strong>(rand[val1,val2,...])</strong>
                  </div>

                  <hr className="iv-hr"/>

                  <table className="iv-table">
                    <thead>
                      <tr>
                        <th>Name (HTML attribute)</th>
                        <th>Value to fill</th>
                        <th>
                          Events to trigger
                          <Tooltip text="Events, that will be triggered on input upon filling form."/>
                        </th>
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
                          events={value.events}
                          saveRow={this.saveRow}
                          deleteRow={this.deleteRow}
                          handlePick={this.handlePick}
                        />
                      })}

                      <tr>
                        <td colSpan="3"></td>
                        <td className="iv-control">
                          <div onClick={() => this.handlePick(index)} data-tip="add row and pick input from page">
                            <FontAwesomeIcon icon={['fas', 'bullseye']}/>
                          </div>

                          <div className="iv-control__success" onClick={() => this.addRow(index)} data-tip="add row">
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
