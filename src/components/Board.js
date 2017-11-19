import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import HTML5Backend from 'react-dnd-html5-backend';
import { Route, Link } from 'react-router-dom'
import { DragDropContext } from 'react-dnd';

import List from './List'
import NewCard from './NewCard'
import EditCard from './EditCard'

class Board extends Component {
	
	render() {
		return (
				<div className='app'>
					
					<Link to="/new" className="float-button--add-card">+</Link>

					<List 
						id='todo'
						title='Do zrobienia'
						taskCallbacks={this.props.taskCallbacks}
						cardCallbacks={this.props.cardCallbacks}
						cards={
							this.props.cards.filter(card => card.status === 'todo')
						} />

					<List 
						id='in-progress'
						title='W trakcie'
						taskCallbacks={this.props.taskCallbacks}
						cardCallbacks={this.props.cardCallbacks}
						cards={
							this.props.cards.filter(card => card.status === 'in-progress')
						} />

					<List 
						id='done'
						title='Zrobione'
						taskCallbacks={this.props.taskCallbacks}
						cardCallbacks={this.props.cardCallbacks}
						cards={
							this.props.cards.filter(card => card.status === 'done')
						} />

					<Route path="/new" render={ (props) => <NewCard {...props} cardCallbacks={this.props.cardCallbacks} /> } />
					<Route path="/edit/:card_id" render={ (props) => <EditCard {...props} cards={this.props.cards} cardCallbacks={this.props.cardCallbacks}/> } />
				</div>
			)
	}
}

Board.propTypes = {
	cards: PropTypes.arrayOf(PropTypes.object),
	taskCallbacks: PropTypes.object,
	cardCallbacks: PropTypes.object
}

export default DragDropContext(HTML5Backend)(Board)