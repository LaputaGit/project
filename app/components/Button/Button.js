// Button.js

import React, { Component } from 'react';

class Button extends Component{
	handleClick(){
		alert('click me!')
	}
	render(){
		var style = require('./Button.css');

		return (
			<button className="my-button" onClick={this.handleClick.bind(this)}>
				块错我
			</button>
			)
	}
}

export default Button;