// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timeElapsedInSeconds: 0,
    timerLimitInMinutes: 25,
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state

    const isTimerCompleted = timerLimitInMinutes * 60 === timeElapsedInSeconds

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      timeElapsedInSeconds,
    } = this.state

    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({
      isTimerRunning: false,
      timerLimitInMinutes: 25,
      timeElapsedInSeconds: 0,
    })
  }

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state

    const totalRemainingTimeInSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds

    const remainingMinutes = Math.floor(totalRemainingTimeInSeconds / 60)
    const remainingSeconds = Math.floor(totalRemainingTimeInSeconds % 60)

    const stringifiedMinutes =
      remainingMinutes > 9 ? remainingMinutes : `0${remainingMinutes}`

    const stringifiedSeconds =
      remainingSeconds > 9 ? remainingSeconds : `0${remainingSeconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timerController-container">
        <button
          className="timerController-button"
          type="button"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            src={startOrPauseImgUrl}
            alt={startOrPauseAltText}
            className="timerController-icon"
          />
          <p className="timerController-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          type="button"
          className="timerController-button"
          onClick={this.onResetTimer}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="timerController-icon"
          />
          <p className="timerController-label">Reset</p>
        </button>
      </div>
    )
  }

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonsDisabled = timeElapsedInSeconds > 0

    return (
      <div className="timerLimitController-container">
        <p className="limit-label">Set Timer limit</p>
        <div className="timerLimit-controller">
          <button
            className="limitController-button"
            disabled={isButtonsDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
            type="button"
          >
            -
          </button>
          <div className="limitLabelAndValue-container">
            <p className="limit-value">{timerLimitInMinutes}</p>
          </div>
          <button
            className="limitController-button"
            disabled={isButtonsDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'paused'
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digitalTimer-container">
          <div className="timerDisplay-container">
            <div className="elapsedTime-container">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-state">{labelText}</p>
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
