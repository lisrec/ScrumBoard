import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import _ from 'lodash'

import { throttle } from './utils'
import Board from './Board'

const API_URL = 'http://kanbanapi.pro-react.com'
const API_HEADERS = {
	'Content-Type': 'application/json',
	Authorization: 'dqjhdbuwyqgd78wqgd'
}

class BoardContainer extends Component {
	
	constructor(props) {
		super(props)

		this.addTask = this.addTask.bind(this)
		this.deleteTask = this.deleteTask.bind(this)
		this.toggleTask = this.toggleTask.bind(this)
		this.persistCardDrag = this.persistCardDrag.bind(this)
		
		this.updateCardStatus = throttle(this.updateCardStatus.bind(this))
		this.updateCardPosition = throttle(this.updateCardPosition.bind(this), 2000)

		this.state = {
			cardsList: []
		}
	}

	componentDidMount() {
		fetch(API_URL + '/cards', {headers: API_HEADERS})
			.then(resp => resp.json())
			.then(cardsData => this.setState({cardsList: cardsData}))
			.catch(e => console.log('Błąd połączenia z API', e))
	}

	addTask(cardId, taskName) {
		let newTask = {id: Date.now(), name: taskName, done: false}
		let cardIndex = _.findIndex(this.state.cardsList, card => card.id == cardId)
		let nextState = update(this.state.cardsList, {
			[cardIndex]: {
				tasks: {
					$push: [newTask]
				}
			}
		})
		let prevState = this.state
		this.setState({cardsList: nextState})

		fetch(`${API_URL}/cards/${cardId}/tasks`, {
			method: 'post',
			headers: API_HEADERS,
			body: JSON.stringify(newTask)
		})
			.then(resp => resp.json())
			.then(respTask => {
				newTask.id = respTask.id
				this.setState({cardsList: nextState})
			})
			.catch(err => {
				console.log("Błąd komunikacji z serverem", err)
				this.setState(prevState)
			})
	}

	deleteTask(cardId, taskId, taskIndex) {
		let cardIndex = _.findIndex(this.state.cardsList, card => card.id == cardId)
		let nextState = update(this.state.cardsList, {
			[cardIndex]: {
				tasks: {
					$splice: [[ taskIndex, 1 ]]
				}
			}
		})
		let prevState = this.state
		this.setState({cardsList: nextState})

		fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
			method: 'delete',
			headers: API_HEADERS
		})
			.catch(err => {
				console.log("Błąd komunikacji z serverem", err)
				this.setState(prevState)
			})
	}

	toggleTask(cardId, taskId, taskIndex) {
		let newDoneValue
		let cardIndex = _.findIndex(this.state.cardsList, card => card.id == cardId)
		let nextState = update(this.state.cardsList, {
			[cardIndex]: {
				tasks: {
					[taskIndex]: {
						done: {
							$apply: (done) => {
								newDoneValue = !done
								return newDoneValue
							}
						}
					}
				}
			}
		})
		let prevState = this.state
		this.setState({cardsList: nextState})

		fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
			method: 'put',
			headers: API_HEADERS,
			body: JSON.stringify({done: newDoneValue})
		})
			.catch(err => {
				console.log("Błąd komunikacji z serverem", err)
				this.setState(prevState)
			})
	}

	updateCardStatus(cardId, listId) {
		let cardIndex = _.findIndex(this.state.cardsList, card => card.id == cardId)
		let card = this.state.cardsList[cardIndex]

		if (card.status !== listId) {
			let nextListState = update(this.state.cardsList, {
				[cardIndex]: {
					status: {
						$set: listId
					}
				}
			})

			this.setState({cardsList: nextListState})
		}
	}

	updateCardPosition (cardId, afterId) {
		if (cardId != afterId) {
			let cardIndex = _.findIndex(this.state.cardsList, card => card.id == cardId)
			let afterIndex = _.findIndex(this.state.cardsList, card => card.id == afterId)
			let card = this.state.cardsList[cardIndex]

			let nextListState = update(this.state.cardsList, {
				$splice: [
					[cardIndex, 1],
					[afterIndex, 0, card]
				]
			})

			this.setState({cardsList: nextListState})
		}
	}

	persistCardDrag (cardId, status) {
		let cardIndex = _.findIndex(this.state.cardsList, card => card.id == cardId)
		let card = this.state.cardsList[cardIndex]

		fetch(`${API_URL}/cards/${cardId}`, {
			method: 'put',
			headers: API_HEADERS,
			body: JSON.stringify({status: card.status, row_order_position: cardIndex})
		})
			.then(resp => {
				if (!resp.ok)
					throw new Error("Blad servera.")
			})
			.catch(e => {
				console.log(e)
				this.setState(
					update(this.state, {
						cards: {
							[cardIndex]: {
								status: {
									$set: status
								}
							}
						}
					})
				)
			})
	}

	render() {
		return (
			<Board cards={this.state.cardsList} 
				taskCallbacks={{
					add: this.addTask,
					delete: this.deleteTask,
					toggle: this.toggleTask
				}}
				cardCallbacks={{
					updateStatus: this.updateCardStatus,
					updatePosition: this.updateCardPosition,
					persistCardDrag: this.persistCardDrag
				}}/>
		)
	}
}

export default BoardContainer