import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import style from './cardFormStyle.css'

class CardForm extends React.Component {

	handleChange(field, evt) {
		this.props.handleChange(field, evt.target.value)
	}

	handleClose(evt) {
		evt.preventDefault()
		this.props.handleClose()
	}

	render() {
		return (
				<div>
					<div className="card big">
						<form onSubmit={this.props.handleSubmit.bind(this)} >
							<input type="text"
								value={this.props.draftCard.title}
								onChange={this.handleChange.bind(this, 'title')}
								placeholder="Tytuł"
								required={true}
								autoFocus={true} /> <br />

							<textarea value={this.props.draftCard.description}
								rows={3}
								onChange={this.handleChange.bind(this, 'description')}
								placeholder="Opis"
								required={true} /> <br />

							<label htmlFor="status">Status</label>
							<select id="status"
								value={this.props.draftCard.status}
								onChange={this.handleChange.bind(this, 'status')} >

								<option value="todo">Do zrobienia </option>
								<option value="in-progress">W trakcie </option>
								<option value="done">Zrobione </option>
							</select> <br />
							
							<label htmlFor="color">Kolor</label>
							<input id="color"
								value={this.props.draftCard.color}
								onChange={this.handleChange.bind(this, 'color')}
								type="color" /> <br /> <br />

							<div className='actions'>
								<button type="submit">{this.props.buttonLabel}</button>
							</div>
						</form>
					</div>
					<div className="overlay" onClick={this.handleClose.bind(this)}></div>
				</div>
			)
	}
}

CardForm.propTypes = {
	draftCard: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
		status: PropTypes.string,
		color: PropTypes.string
	}).isRequired,
	buttonLabel: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired
}

export default CardForm