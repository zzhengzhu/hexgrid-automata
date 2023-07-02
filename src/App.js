import React, { Component } from "react";
import HexagonalGrid from "./HexagonalGrid";
import Slider from "./Slider";
import { newBoardStatus, iterateBoard } from "./BoardUtil";

class App extends Component {
  radius = 40;

  state = {
    grid: newBoardStatus(this.radius), 
    generation: 0,
		isGameRunning: false,
    speed: 10,
  };

  componentDidUpdate(prevProps, prevState) {
		const { isGameRunning, speed } = this.state;
		const speedChanged = prevState.speed !== speed;
		const gameStarted = !prevState.isGameRunning && isGameRunning;
		const gameStopped = prevState.isGameRunning && !isGameRunning;

		if ((isGameRunning && speedChanged) || gameStopped) {
			clearInterval(this.timerID);
		}

		if ((isGameRunning && speedChanged) || gameStarted) {
			this.timerID = setInterval(() => {
          this.handleStep();
        }, speed);
		}
	}

  startStopButton = () => {
		return this.state.isGameRunning ?
			<button type='button' onClick={this.handleStop}>Stop</button> :
			<button type='button' onClick={this.handleRun}>Start</button>;
	}

  handleRun = () => {
		this.setState({ isGameRunning: true });
	}

	handleStop = () => {
		this.setState({ isGameRunning: false });
	}

  handleStep = () => {
		this.setState(prevState => ({
			grid: iterateBoard(prevState.grid),
			generation: prevState.generation + 1
		}));
	}

  handleSpeedChange = newSpeed => {
		this.setState({ speed: newSpeed });
	}

	createNewBoard = () => {
		this.setState({
			grid: newBoardStatus(this.radius),
			generation: 0
		});
	}

  // componentDidMount() {
  //   this.timerID = setInterval(() => {
  //     this.setState((prevState) => ({
  //       grid: iterateBoard(prevState.grid),
  //     }));
  //   }, this.state.speed);
  // }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const { grid, isGameRunning, generation, speed } = this.state;

    return (
      // <div>
      //   <h1>Hexagonal Grid</h1>
      //   <HexagonalGrid grid={this.state.grid} />
      // </div>
      <div>
				<h1>Cellular Automata - HexGrid Variant</h1>
        <h3>Inspired by Conway's Game of Life <a href="https://www.wikiwand.com/en/Conway%27s_Game_of_Life">link</a></h3>
        <HexagonalGrid grid={grid} />
				<div className='flexRow upperControls'>
					<span>
						{'+ '}
						<Slider speed={speed} onSpeedChange={this.handleSpeedChange} />
						{' -'}
					</span>
					{`Generation: ${generation}`}
				</div>
				<div className='flexRow lowerControls'>
					{this.startStopButton()}
					<button type='button' disabled={isGameRunning} onClick={this.handleStep}>Step</button>
					<button type='button' onClick={this.createNewBoard}>New Board</button>
				</div>
      </div>
    );
  }
}

export default App;
