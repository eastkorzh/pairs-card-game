import React from 'react'

class ControlButton extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
        if (this.props.status === "main menu") {
            this.props.startGame()
        } else {
            this.props.stopGame()
        }
    }
    
	render() {
		const status = this.props.status;
		let text = null;

		if (status === 'main menu') {
			text = "Start";
		} else if (status === 'preparation' || status === 'play') {
			text = this.props.timer;
		}

		return (
			<button 
				onClick = {this.handleClick}
			>
				{text}
			</button>
		)
	}
}

export default ControlButton;