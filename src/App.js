import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Board from './Board'

let cardsList = [
	{
		id: 1,
		title: "Dupa1",
		description: "Czytać !!!",
		status: "in-progress",
		tasks: []
	},
	{
		id: 2,
		title: "A kysz 2",
		description: "Pisać kod",
		status: "todo",
		tasks: [
			{
				id: 1,
				name: "Lista",
				done: true
			},
			{
				id: 2,
				name: "Kanban",
				done: false
			},
			{
				id: 3,
				name: "No nie wiem",
				done: false
			}
		]
	},
	{
		id: 3,
		title: "Rak w dzieci xD",
		description: "Kupić Q.Q",
		status: "done",
		tasks: []
	},
]

ReactDOM.render(<Board cards={cardsList} />, document.getElementById('root'))