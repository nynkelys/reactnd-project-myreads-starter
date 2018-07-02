import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chooser from './Chooser'

// TO DO: ENABLE MOVING BOOKS ACROSS SHELVES
class Book extends Component {
	render() {
		return (
			    <div className="book">
			        <div className="book-top">
			            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.book.imageLinks.thumbnail}")`}}>
			            </div>
			            <Chooser
			            	book={this.props.book}
			            	shelfChange={this.props.shelfChange}/>
			        </div>
			        <div className="book-title">{this.props.book.title}</div>
		        	<div className="book-authors">{this.props.book.authors}</div>
			    </div>
		)
	}

	static propTypes = {
		book: PropTypes.object.isRequired
	}
}

export default Book;