import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import CardForm from '../partials/CardForm'

class EditCard extends React.Component {

	constructor(props) {
		super(props)

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleClose = this.handleClose.bind(this)

		this.state = {}
	}

	componentWillMount() {
		let card = _.find(this.props.cards, card => card.id == this.props.match.params.card_id)
		this.setState({...card})
	}

	handleChange(field, val) {
		this.setState({[field]: val})
	}

	handleSubmit(evt) {
		evt.preventDefault()
		this.props.cardCallbacks.updateCard(this.state)
		this.props.history.push('/', null)
	}

	handleClose(evt) {
		this.props.history.push('/', null)
	}

	render() {
		return (
				<CardForm draftCard={this.state}
					buttonLabel="Zapisz edycje"
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					handleClose={this.handleClose} />
			)
	}
}

EditCard.propTypes = {
	cardCallbacks: PropTypes.object,
	cards: PropTypes.array
}

export default EditCard