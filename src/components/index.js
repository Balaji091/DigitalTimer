import React, { Component } from 'react';
import './index.css';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            time: 0, // Default time in minutes
            seconds: 0,
            initialTime: 0 // Keeps track of the set time before starting
        };
    }

    toggleStart = () => {
        const { isRunning } = this.state;
        if (isRunning) {
            clearInterval(this.interval);
        } else {
            this.interval = setInterval(() => {
                const { time, seconds } = this.state;

                if (seconds > 0) {
                    this.setState({ seconds: seconds - 1 });
                } else if (time > 0 && seconds === 0) {
                    this.setState({ time: time - 1, seconds: 59 });
                } else {
                    clearInterval(this.interval);
                    this.setState({ isRunning: false });
                }
            }, 1000);
        }
        this.setState({ isRunning: !isRunning });
    };

    resetTimer = () => {
        const { initialTime } = this.state;
        clearInterval(this.interval);
        this.setState({ time: initialTime, seconds: 0, isRunning: false });
    };

    decrementTime = () => {
        const { time, isRunning } = this.state;
        if (time > 0 && !isRunning) {
            this.setState((prevState) => {
                const newTime = prevState.time - 1;
                return {
                    time: newTime,
                    initialTime: newTime // Update initialTime each time we decrement
                };
            });
        }
    };

    incrementTime = () => {
        const { isRunning, time } = this.state;
        if (!isRunning) {
            this.setState((prevState) => {
                const newTime = prevState.time + 1;
                return {
                    time: newTime,
                    initialTime: newTime // Update initialTime each time we increment
                };
            });
        }
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { isRunning, time, seconds } = this.state;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        const formattedMinutes = time < 10 ? `0${time}` : time;

        return (
            <div className="timer-container">
               
                <div className="timer-circle">
                    <p className="time-display">{formattedMinutes}:{formattedSeconds}</p>
                    <p className="status">{isRunning ? "Running" : "Paused"}</p>
                </div>
                
                <div className="controls">
                    <div className="controls-items">
                        <button className="control-button" onClick={this.toggleStart}>
                            <img
                                src={isRunning 
                                    ? "https://assets.ccbp.in/frontend/react-js/pause-icon-img.png" 
                                    : "https://assets.ccbp.in/frontend/react-js/play-icon-img.png"}
                                alt={isRunning ? "Pause" : "Start"}
                                className="icon"
                            />
                            {isRunning ? "Pause" : "Start"}
                        </button>
                        
                        <button className="control-button" onClick={this.resetTimer}>
                            <img
                                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                                alt="Reset"
                                className="icon"
                            />
                            Reset
                        </button>
                    </div>
                    
                    <p className="time-limit-label">Set Timer Limit</p>
                
                    <div className="time-limit-controls">
                        <button className="limit-button" onClick={this.decrementTime}>-</button>
                        <p className="time-limit">{time}</p>
                        <button className="limit-button" onClick={this.incrementTime}>+</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Timer;
