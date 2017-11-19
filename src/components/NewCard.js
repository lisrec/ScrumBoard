import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import CardForm from '../partials/CardForm'

class NewCard extends React.Component {

	constructor(props) {
		super(props)

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleClose = this.handleClose.bind(this)

		this.state = {}
	}

	componentWillMount() {
		this.setState({
			id: Date.now(),
			title: '',
			description: '',
			status: 'todo',
			color: '#DDDDDD',
			tasks: []
		})
	}

	handleChange(field, val) {
		this.setState({[field]: val})
	}

	handleSubmit(evt) {
		evt.preventDefault()
		this.props.cardCallbacks.addCard(this.state)
		this.props.history.push('/', null)
	}

	handleClose(evt) {
		this.props.history.push('/', null)
	}

	render() {
		return (
				<CardForm draftCard={this.state}
					buttonLabel="Utwórz zadanie"
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					handleClose={this.handleClose} />
			)
	}
}

NewCard.propTypes = {
	cardCallbacks: PropTypes.object
}

export default NewCard