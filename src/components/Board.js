import React from 'react'

setInterval(() => {
	const board = document.getElementById('board');
	board.style.height = board.clientWidth + 'px';
}, 500)

function Card(props) {
	return (
		<div
			className = {`card ${props.class}`}
			onClick = {props.onClick}
			id = {props.id}
		/>
	);
}

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pickedElems: [],
			pairs: 0,
			blockClick: false,
		}
		this.onClick = this.onClick.bind(this);
	}

	onClick(e) {
		if (this.state.blockClick) return;

		if (this.props.status === 'play' && this.state.pickedElems.length < 2) {
			if (e.target.classList.contains(e.target.id)) return;

			e.target.classList.add(e.target.id);
			this.state.pickedElems.push(e.target);
		}

		if (this.state.pickedElems.length === 2) {
			this.setState({blockClick: true})


			if (this.state.pickedElems[0].id !== this.state.pickedElems[1].id) {               
				setTimeout(() => {
					this.state.pickedElems[0].classList.remove(this.state.pickedElems[0].id)
					this.state.pickedElems[1].classList.remove(this.state.pickedElems[1].id)
					this.setState({pickedElems: [], blockClick: false})
				}, 500)          
			} else {
				let i = this.state.pairs + 1;
				this.state.pickedElems[0].classList.add('picked');
				this.state.pickedElems[1].classList.add('picked');
				this.setState({pickedElems: [], pairs: i, blockClick: false})
			}
		}
	}

	componentDidUpdate() {
		if (this.props.mode === 'x4' && this.state.pairs === 8) {
			this.props.win()
		} 
		if (this.props.mode === 'x6' && this.state.pairs === 18) {
			this.props.win()
		}
		if (this.props.status === 'main menu' && (this.state.pairs || this.state.pickedElems.length)) {
			this.setState({pickedElems: [], pairs: 0})
		}
	}

	renderBoard() {
		if (this.props.status === 'main menu') {
			this.imgs = this.props.createImgsArr();
		}
		const elements = [];
		let j;
		const renderCard = (i) => {

			if (this.props.status === 'main menu' || this.props.status === 'play') {
				return <Card 
						key={i}
						onClick={this.onClick}
						id={this.imgs[i]}
					/>;
			} else if (this.props.status === 'preparation'){
				return <Card 
						key = {i} 
						class={this.imgs[i]} 
						id={this.imgs[i]}
					/>;		
			}
		}

		(this.props.mode === 'x4') ? j = 16: j = 36;

		for (let i = 0; i < j; i++) {
			elements.push(renderCard(i))
		}
		return elements;
	}
	
	render() {
		return (
			<div className={`board-wrapper-${this.props.mode}`}>
				<div className={`board ${this.props.mode}`} id="board">     
					{this.renderBoard()}				
				</div>
			</div>
		)
	}
}

export default Board;