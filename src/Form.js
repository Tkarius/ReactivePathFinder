import React, { Component } from 'react';

class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        xAxis: 10,
        yAxis: 10,
		formValid: true
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
	  this.validateForm = this.validateForm.bind(this);
    }
	
	//Function for form validation
	validateForm(fieldName, value) {
		const valid = value > 0;
		this.setState({formValid: valid});
	}
	
	
    //Changes the value in the input
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
	  //Disables sumbit button when condition is not met
	  this.validateForm(target.name, target.value);
    }
    
    //Function for handling the form sumbit
    handleSubmit(event) {
      alert('X-Axis: ' + this.state.xAxis + ', Y-Axis: ' + this.state.yAxis);
	  console.log(this.state.formValid)
      event.preventDefault();
    }

    render() {
      return (
        <div id="form">
          <form onSubmit={this.handleSubmit}>
            <label>
              X-Axis:
              <input
               name="xAxis"
                type="number"
               value={this.state.xAxis}
               onChange={this.handleInputChange} />
           </label>
           <br />
           <label>
             Y-Axis:
             <input
               name="yAxis"
               type="number"
                value={this.state.yAxis}
                onChange={this.handleInputChange} />
           </label>
           <br />
           <input type="submit" value="Submit" disabled={!this.state.formValid}/>
          </form>
        </div>
      );
    }
  }

export default Form;