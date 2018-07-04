import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chooser from './Chooser'

// TO DO: Change into stateless component if it only has render()
// TO DO: Write shortcuts instead of writing this.props all the time
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
		book: PropTypes.object.isRequired,
		shelfChange: PropTypes.func.isRequired
	}
}

export default Book;
