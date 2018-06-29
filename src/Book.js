import React, {Component} from 'react'
import Chooser from './Chooser'

class Book extends Component {
	render() {
		return (
			    <div className="book">
			        <div className="book-top">
			            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.book.imageLinks.thumbnail}")`}}>
			            </div>
			            <Chooser/>
			        </div>
			        <div className="book-title">{this.props.book.title}</div>
			        <div className="book-authors">{this.props.book.authors}</div>
			    </div>
		)
	}
}

export default Book;