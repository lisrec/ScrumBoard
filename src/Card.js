import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import CheckList from './CheckList'

class Card extends Component {

	constructor(props) {
		super(props)

		this.handleToggleDesc = this.handleToggleDesc.bind(this)

		this.state = {
			showDetails: false
		}
	}

	handleToggleDesc() {
		this.setState({showDetails: !this.state.showDetails})
	}

	render() {
		let cardDetails = (this.state.showDetails) ? (
				<div className="card__description">
					{this.props.description}
					<CheckList cardId={this.props.id} tasks={this.props.tasks} />
				</div>
			) : null

		return (
				<div className="card">
					<div 
						className={(this.state.showDetails) ? 'card__title card__title--is-open' : 'card__title'} 
						onClick={this.handleToggleDesc}>
						{this.props.title} </div>

					{cardDetails}
				</div>
			)
	}
}

export default Card