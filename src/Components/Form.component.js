import React, { Component } from 'react';
import Field from './Field.component';
import * as serviceWorker from '../serviceWorker';

class Form extends Component {
    constructor(props) {
        super(props);

        this.formData = {
            fieldsName: ['First Name', 'Last Name', 'Mail Address', 'Phone Number'],
            fieldsValue: {},
            isValid: true,
        };

        this.state = {
            errorMessage: '',
            errorField: ''
        }

        this.formData.fieldsName.map(fieldName => {
            this.formData.fieldsValue[fieldName] = '';
        });

        this.submitForm = this.submitForm.bind(this);
        this.changeCurrField = this.changeCurrField.bind(this);
    }

    changeCurrField(val, fieldName) {
        this.formData.fieldsValue[fieldName] = val;
    }

    submitForm(event) {

        this.checkValidation();

        if (this.formData.isValid) {
            var apiKey = window.prompt("Please insert your api Key (for: sendgrid emali service)");

            serviceWorker.sendEmail(this.formData.fieldsValue, apiKey).then(() => {
                alert("The email was sent successfully");
            }).catch(error => {
                alert("ERROR " + error.code + ": " + error.message);
            });
        }

        event.preventDefault();
    }

    setErrorMessage(isValid = true, msg = '', errorField = '') {
        this.formData.isValid = isValid;

        this.setState({
            errorMessage: msg,
            errorField: errorField
        });
    }

    checkValidation() {

        this.setErrorMessage();

        for (var i = 0; i < this.formData.fieldsName.length && this.formData.isValid; ++i) {

            var currentFieldName = this.formData.fieldsName[i];
            var currentVal = this.formData.fieldsValue[currentFieldName];
            this.setValidationValue(!currentVal.length, currentFieldName + " can't be empty!", currentFieldName);

            switch (currentFieldName) {
                case 'First Name':
                    this.setValidationValue(currentVal.length < 2, currentFieldName + " can't be less than two letters!", currentFieldName);
                    this.setValidationValue(!/^[A-Za-z]+$/.test(currentVal), currentFieldName + ' can only contain letters!', currentFieldName);
                    break;
                case 'Last Name':
                    this.setValidationValue(currentVal.length < 2, currentFieldName + " can't be less than two letters!", currentFieldName);
                    this.setValidationValue(!/^[A-Za-z]+$/.test(currentVal), currentFieldName + ' can only contain letters!', currentFieldName);
                    break;
                case 'Mail Address':
                    this.setValidationValue(!/\S+@\S+\.\S+/.test(currentVal), currentFieldName + ' is not valid!', currentFieldName);
                    break;
                case 'Phone Number':
                    this.setValidationValue(!/^\d+$/.test(currentVal), currentFieldName + ' can only contain numbers!', currentFieldName);
                    this.setValidationValue(currentVal.length !== 10, currentFieldName + ' must contain 10 digits!', currentFieldName);
                    break;
                default:
                    break;
            }
        }
    }

    setValidationValue(condition, errorMessage, errorField) {
        if (condition && this.formData.isValid) {
            this.setErrorMessage(false, errorMessage, errorField);
        }
    }

    render() {
        const NAMES_LIST = this.formData.fieldsName.map((fieldName, index) => {
            return <div key={index}><Field name={fieldName + ':'} onFieldChange={this.changeCurrField} />
                <span className='error-msg'>{fieldName === this.state.errorField ? '*' + this.state.errorMessage : ''}</span></div>

        })

        return (
            <form onSubmit={this.submitForm} id='form'>
                <p id='headline'>Form</p>
                <hr></hr>
                {NAMES_LIST}
                <button id='submit-btn'>Submit
              </button>
            </form>
        );
    }
}
export default Form;


