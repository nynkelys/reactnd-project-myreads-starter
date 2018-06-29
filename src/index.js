import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
	<BrowserRouter><App /></BrowserRouter>, // Wrap App in BrowserRouter, it now listens to the address bar
	document.getElementById('root')
)
