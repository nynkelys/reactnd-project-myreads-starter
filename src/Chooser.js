import React from 'react'
import PropTypes from 'prop-types'

function Chooser(props) {
		const { book, shelfChange } = props;
		return (
			<div className="book-shelf-changer">
				<select value={book.shelf ? book.shelf : 'none'} onChange={(event) => shelfChange(book, event.target.value)}>
				       <option value="move" disabled>Move to...</option>
				       <option value="currentlyReading">Currently Reading</option>
				       <option value="wantToRead">Want to Read</option>
				       <option value="read">Read</option>
				       <option value="none">None</option>
				</select>
			</div>
		)
}

Chooser.propTypes = {
		book: PropTypes.object.isRequired,
		shelfChange: PropTypes.func.isRequired
}

export default Chooser;

