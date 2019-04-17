import React from 'react'

class ChangeMode extends React.Component {
	render() {
		return (
			<div className = 'mode-radio' >
				<div className = "md-radio">
					<input type="radio" id="x4" name="mode" value="x4"
						onChange = {this.props.changeMode}
						defaultChecked 
					/>
					<label htmlFor="x4">4x4</label>
				</div>
				<div className = "md-radio">
					<input type="radio" id="x6" name="mode" value="x6" 
						onChange = {this.props.changeMode}
						
					/>
					<label htmlFor="x6">6x6</label>		
				</div>
			</div>
		)
	}
}

export default ChangeMode;
