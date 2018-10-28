import React, { Component } from 'react';

class Field extends Component {
    constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
    }
  
    handleChange = e => {
      var name = this.props.name.slice(0, this.props.name.indexOf(':'));
      this.props.onFieldChange(e.target.value, name);
    }
  
    render() {
  
      return (
        <div>
          <label className='label-up'>{this.props.name}</label>
          <input type="text" className="input" onChange={this.handleChange} />
        </div>
      );
    } 
  }
  export default Field;