import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class CheckList extends Component {
	render() {

		let tasks = this.props.tasks.map( task => {
			return ( 
					<li className="checklist__task" key={task.id}>
						<input type="checkbox" defaultChecked={task.done} />
						<span>{task.name}</span>
						<a href="#" className="checklist__task--remove" />
					</li>
				)
		})

		return (
				<div className="checklist">
					<ul>{tasks}</ul>
				</div>
			)
	}
}

export default CheckList