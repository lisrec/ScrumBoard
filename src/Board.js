import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import List from './List'

class Board extends Component {
	render() {
		return (
				<div className='app'>
					
					<List 
						id='todo'
						title='Do zrobienia'
						cards={
							this.props.cards.filter(card => card.status === 'todo')
						} />

					<List 
						id='in-progress'
						title='W trakcie'
						cards={
							this.props.cards.filter(card => card.status === 'in-progress')
						} />

					<List 
						id='done'
						title='Zrobione'
						cards={
							this.props.cards.filter(card => card.status === 'done')
						} />

				</div>
			)
	}
}

export default Board