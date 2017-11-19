import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import BoardContainer from './components/BoardContainer'

let router = (
		<Router>
			<Route path="/" component={BoardContainer} />
		</Router>
	)

ReactDOM.render(router, document.getElementById('root'))