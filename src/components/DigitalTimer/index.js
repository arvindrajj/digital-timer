import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timerLimitInMinutes: 25,
  elapsedTimeInSeconds: 0,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => clearInterval(this.intervalId)

  onDecrementTimer = () => {
    const {timerLimitInMinutes} = this.state
    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncrementTimer = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  onResetTime = () => {
    this.setState(initialState)
    this.clearTimeInterval()
  }

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, elapsedTimeInSeconds} = this.state
    const isButtonDisabled = elapsedTimeInSeconds > 0
    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-button"
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onDecrementTimer}
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timerLimitInMinutes}</p>
          </div>
          <button
            className="limit-controller-button"
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onIncrementTimer}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  increaseElapsedTime = () => {
    const {timerLimitInMinutes, elapsedTimeInSeconds} = this.state
    const isTimeOvered = timerLimitInMinutes * 60 === elapsedTimeInSeconds

    if (isTimeOvered) {
      this.setState({isTimerRunning: false})
      this.clearTimeInterval()
    } else {
      this.setState(prevState => ({
        elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 1,
      }))
    }
  }

  onTogglePlayPauseButton = () => {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      elapsedTimeInSeconds,
    } = this.state
    const isTimeOvered = timerLimitInMinutes * 60 === elapsedTimeInSeconds
    if (isTimeOvered) {
      this.setState({elapsedTimeInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.increaseElapsedTime, 1000)
    }
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const statusIcon = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const statusIconAlt = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          className="timer-controller-btn"
          type="button"
          onClick={this.onTogglePlayPauseButton}
        >
          <img
            src={statusIcon}
            alt={statusIconAlt}
            className="timer-controller-icon"
          />
          <p className="timer-controller-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="timer-controller-btn"
          type="button"
          onClick={this.onResetTime}
        >
          <img
            alt="reset icon"
            className="timer-controller-icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedTimeInTimeFormat = () => {
    const {timerLimitInMinutes, elapsedTimeInSeconds} = this.state

    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - elapsedTimeInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const timerStatus = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">
                {this.getElapsedTimeInTimeFormat()}
              </h1>
              <p className="timer-state">{timerStatus}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
