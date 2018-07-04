import React, { Component } from 'react'
import PropTypes from 'prop-types'

// TO DO: Change into stateless component if it only has render()
// TO DO: Write shortcuts instead of writing this.props all the time
class Chooser extends Component {
	render() {
		return (
			<div className="book-shelf-changer">
				<select value={this.props.book.shelf ? this.props.book.shelf : 'none'} onChange={(event) => this.props.shelfChange(this.props.book, event.target.value)}>
				       <option value="move" disabled>Move to...</option>
				       <option value="currentlyReading">Currently Reading</option>
				       <option value="wantToRead">Want to Read</option>
				       <option value="read">Read</option>
				       <option value="none">None</option>
				</select>
			</div>
		)
	}

	static propTypes = {
		book: PropTypes.object.isRequired,
		shelfChange: PropTypes.func.isRequired
	}
}

export default Chooser;

