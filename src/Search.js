import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link }  from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
	state = {
		query: '',
		results: []
	}

	updateQuery = (query) => {
		this.setState({query: query}) // Now whatever we write in query will change the value of the input tag

		if (query === '') {
			this.setState({results: []})
			return;
		} else {
			BooksAPI.search(query)
			.then((results) => {
				if (results instanceof Array) {
					this.setState({results: results})
				} else {
					this.setState({results: []})
				}
			})
		}
	}

	render() {
		return (
			<div>
	    		<div className="search-books-bar">
	      			<Link to="/" className="close-search">Close</Link>
	      			<div className="search-books-input-wrapper">
		        		<input
			        		type="text"
			        		value={this.state.query}
			        		placeholder="Search by title or author"
			        		onChange={(event) => this.updateQuery(event.target.value)}
			        	/>
	      			</div>
	    		</div>
	    		<div className="search-books-results">
	    	  		<ol className="books-grid">
	    	  			{this.state.results.map((book) => ( // Get allBooks prop from App.js (hence this.props) and map over them, putting them in results
                    		<li key={book.id}>
                      			<Book
                      				book={book}
                      			/>
                    		</li>
                  		))}
	    	  		</ol>
	   			</div>
   			</div>
		)
	}

	static propTypes = {
		allBooks: PropTypes.array.isRequired
	}
}

export default Search;