import React from 'react'
import PropTypes from 'prop-types'
import Chooser from './Chooser'

function Book(props) {
		const { book, shelfChange } = props;
		return (
			    <div className="book">
			        <div className="book-top">
			            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")`}}>
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
