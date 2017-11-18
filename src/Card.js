import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import { CSSTransitionGroup } from 'react-transition-group'
import marked from 'marked'

import consts from './constants'
import CheckList from './CheckList'

let titlePropType = (props, propName, componentName) => {
	if (props[propName]) {
		let value = props[propName]
		if (typeof value !== 'string' || value.length > 80)
			return new Error (`Wartość ${propName} w ${componentName} nie jest typu string lub jest dłuższa niż 80 znaków.`)
	}
}

const cardDragSpec = {
	beginDrag(props) {
		return {
			id: props.id,
			status: props.status
		}
	},
	endDrag(props) {
		props.cardCallbacks.persistCardDrag(props.id, props.status)
	}
}

const cardDropSpec = {
	hover(props, monitor) {
		const draggedId = monitor.getItem().id
		props.cardCallbacks.updatePosition(draggedId, props.id)
	}
}

let collectDrag = (connect, monitor) => {
	return {
		connectDragSource: connect.dragSource()
	}
}

let collectDrop = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget()
	}
}

class Card extends Component {

	constructor(props) {
		super(props)

		this.handleToggleDetails = this.handleToggleDetails.bind(this)

		this.state = {
			showDetails: true
		}
	}

	handleToggleDetails() {
		this.setState({showDetails: !this.state.showDetails})
	}

	render() {
		const { connectDragSource, connectDropTarget } = this.props

		let cardDetails = (this.state.showDetails) ? (
				<div key={this.props.id} className="card__description">
					<span dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
					<CheckList cardId={this.props.id} tasks={this.props.tasks} taskCallbacks={this.props.taskCallbacks} />
				</div>
			) : null

		let sideColor = {
			position: 'absolute',
			zIndex: -1,
			top: 0,
			bottom: 0,
			left: 0,
			width: 7,
			backgroundColor: this.props.color
		}

		return connectDropTarget(connectDragSource(
				<div className="card">
					<div style={sideColor} />
					<div 
						className={(this.state.showDetails) ? 'noselect card__title card__title--is-open' : 'noselect card__title'} 
						onClick={this.handleToggleDetails}>
						{this.props.title} 
					</div>
					<CSSTransitionGroup
						transitionName="card__description--toggle"
						transitionLeave={true}
						transitionEnterTimeout={300}
						transitionLeaveTimeout={300} >
						{cardDetails}
					</CSSTransitionGroup>
				</div>
			))
	}
}

Card.propTypes = {
	id: PropTypes.number,
	title: titlePropType,
	description: PropTypes.string,
	color: PropTypes.string,
	tasks: PropTypes.arrayOf(PropTypes.object),
	cardCallbacks: PropTypes.object,
	taskCallbacks: PropTypes.object,
	connectDragSource: PropTypes.func.isRequired,
	connectDropTarget: PropTypes.func.isRequired
}

const DragCard = DragSource(consts.CARD, cardDragSpec, collectDrag)(Card)
const DragDropCard = DropTarget(consts.CARD, cardDropSpec, collectDrop)(DragCard)

export default DragDropCard