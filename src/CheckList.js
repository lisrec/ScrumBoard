import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class CheckList extends Component {

	constructor(props) {
		super(props)
		this.handleInputKeyPress = this.handleInputKeyPress.bind(this)
	}

	handleInputKeyPress(event) {
		if (event.key === 'Enter') {
			this.props.taskCallbacks.add(this.props.cardId, event.target.value)
			event.target.value = ''
		}
	}

	render() {

		let tasks = this.props.tasks.map( (task, taskIndex) => {
			return ( 
					<li key={task.id} className="checklist__task">
						<input type="checkbox" 
							defaultChecked={task.done} 
							onChange={ this.props.taskCallbacks.toggle.bind(null, this.props.cardId, task.id, taskIndex) } />
						<span>{task.name}</span>
						<a href="#" className="checklist__task--remove" 
							onClick={ this.props.taskCallbacks.delete.bind(null, this.props.cardId, task.id, taskIndex) } />
					</li>
				)
		})

		return (
				<div className="checklist">
					<ul>{tasks}</ul>
					<input type="text"
						className="checklist--add-task"
						placeholder="Dodaj zadanie..."
						onKeyPress={this.handleInputKeyPress} />
				</div>
			)
	}
}

CheckList.propTypes = {
	cardId: PropTypes.number,
	tasks: PropTypes.arrayOf(PropTypes.object),
	taskCallbacks: PropTypes.object
}

export default CheckList