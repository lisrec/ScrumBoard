import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import List from './List'

class Board extends Component {
	
	render() {
		return (
				<div className='app'>
					
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