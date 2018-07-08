import React from 'react'
import PropTypes from 'prop-types'
import Chooser from './Chooser'

function Book(props) {
		const { book, shelfChange } = props;
		const style = { width: 128, height: 193, backgroundImage: `url("${book.imageLinks?book.imageLinks.thumbnail:`http://via.placeholder.com/128x193?text=No%20Cover`}")`}
		return (
			    <div className="book">
			        <div className="book-top">
			            <div className="book-cover" style={style}>
			            </div>
			            <Chooser
			            	book={book}
			            	shelfChange={shelfChange}/>
			        </div>
			        <div className="book-title">{book.title}</div>
		        	<div className="book-authors">{book.authors}</div>
			    </div>
		)
}

Book.propTypes = {
		book: PropTypes.object.isRequired,
		shelfChange: PropTypes.func.isRequired
}

export default Book;
