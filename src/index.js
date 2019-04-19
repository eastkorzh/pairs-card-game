import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import ControlButton from './components/ControlButton.js'
import Board from './components/Board.js'
import ChangeMode from './components/ChangeMode.js'
import TimeLog from './components/TimeLog.js'
	
class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: 'main menu',
			timer: '00:00',
			mode: 'x4',
			timeLog4: [],
			timeLog6: [],
		}
		this.startMs = null;
		this.s = null;
		this.m = null;

		this.startGame = this.startGame.bind(this);
		this.stopGame = this.stopGame.bind(this);
		this.win = this.win.bind(this);
		this.changeMode = this.changeMode.bind(this);
		this.createImgsArr = this.createImgsArr.bind(this);
	}

	startTimer() {
		this.startMs = Date.now();
		this.s = 0;
		this.m = 0;
	}
	
	startGame() {
		this.startTimer();
		let s = this.s;
		let m = this.m;
		let startMs = this.startMs;
		this.timerId = setInterval(() => {
			const currS = Math.floor((Date.now() - startMs) / 1000);
			if (s >= 59) {
				m++
				s = 0;
			} else if(parseInt(m) === 0) {
				s = currS;
			} else if (m > 0) {
				s = currS - 60*m;
			}
			
			
			//set delay before change state to 'play'
			if (this.state.mode === 'x4' && s > 3) this.setState({status: 'play'});
			if (this.state.mode === 'x6' && s > 6) this.setState({status: 'play'});			
			//=======================================
			
			if (m > 59) {
				this.setState({status: 'main menu', timer: '00:00'})
				clearInterval(this.timerId);
			}
			s = s.toString();
			m = m.toString();
			
			if (s.length < 2) {
				s = '0' + s;
			}
			if (m.length < 2) {
				m = '0' + m;
			}

			this.setState({timer: `${m}:${s}`})
			this.s = s;
			this.m = m;
		}, 1000)

		this.setState({status: 'preparation'})
	}

	stopGame() {
		clearInterval(this.timerId);
		this.setState({status: 'main menu', timer: '00:00'})
	}

	win() {
		if (this.state.status === 'main menu') return; //prevent 2nd call by Board's componentDidUpdate()
		
		clearInterval(this.timerId);

		this.setState({status: 'main menu', timer: '00:00'});

		(this.state.mode === 'x4') ?
			this.state.timeLog4.push(`${this.m}:${this.s}`) :
			this.state.timeLog6.push(`${this.m}:${this.s}`);
		
		this.state.timeLog4.sort( (a, b) => Number(a.split(':').join('')) - Number(b.split(':').join('')) );
		this.state.timeLog4.reverse();

		this.state.timeLog6.sort( (a, b) => Number(a.split(':').join('')) - Number(b.split(':').join('')) );
		this.state.timeLog6.reverse();

		if (this.state.timeLog4.length > 5) this.state.timeLog4.shift();
		if (this.state.timeLog6.length > 5) this.state.timeLog6.shift();
	}

	changeMode() {
		this.stopGame();
		(this.state.mode === 'x4') ? 
			this.setState({mode: 'x6'}) :
			this.setState({mode: 'x4'})
	}

	createImgsArr() {
		const imgs = [];
		let size;

		(this.state.mode === 'x4') ? size = 8 : size = 18;
		for (let i = 1; i <= size; i++) {
			imgs.push(`img${i}`)
		}

		imgs.push(...imgs);

		((arr) => {
			for (let i = arr.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[arr[i], arr[j]] = [arr[j], arr[i]]
			}
		})(imgs)

		return imgs;
	}
	
	render() {
		return (	
			<div className="content">
				<div className = "hello" hidden>
					<h1>Scroll down to start a game</h1>
				</div>
				<div className = "m-mode-radio" hidden>
					<p>Change template size</p>
					<ChangeMode 
						changeMode = {this.changeMode}
					/>
				</div>
				<div className = "board-wrapper">
					<div className = "m-button" hidden>
						<ControlButton 
							startGame = {this.startGame}
							stopGame = {this.stopGame}
							status = {this.state.status}
							timer = {this.state.timer}
						/>
					</div>
					<Board 
						status = {this.state.status}
						picked = {this.state.picked}
						handleClick = {this.handleClick}
						win = {this.win}
						createImgsArr = {this.createImgsArr}
						mode = {this.state.mode}
					/>
					<div className = "m-time-log" hidden>
						<TimeLog
							timeLog4 = {this.state.timeLog4}
							timeLog6 = {this.state.timeLog6}
							mode = {this.state.mode}
						/>
					</div>
				</div>
				<div className = "interface-wrapper">
					<div className = "interface">
						<ControlButton 
							startGame = {this.startGame}
							stopGame = {this.stopGame}
							status = {this.state.status}
							timer = {this.state.timer}
						/>
						<ChangeMode 
							changeMode = {this.changeMode}
						/>
						<TimeLog
							timeLog4 = {this.state.timeLog4}
							timeLog6 = {this.state.timeLog6}
							mode = {this.state.mode}
						/>
					</div>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<Game />, document.getElementById('root'));