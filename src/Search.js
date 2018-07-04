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

	// TO DO: CLEAR RESULTS WHEN SEARCH BAR IS EMPTY: HOW???
	search = (query) => {
 		if (query === '') {
 			this.setState({results: []})
 			return;
		} else {
			BooksAPI.search(query)
			.then((results) => {
				if (results instanceof Array) {
					this.setState({results: results, query: query}) // Too slow, should be moved somewhere else // Why can't first letter be deleted?
				} else {
					this.setState({results: []})
				}
			})
 		}
 	}

	// TO DO: Write shortcuts instead of writing this.props all the time
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
			        		onChange={(event) => this.search(event.target.value)}
			        	/>
	      			</div>
	    		</div>
	    		<div className="search-books-results">
	    	  		<ol className="books-grid">
	    	  			{this.state.results.map((book) => (
                    		<li key={book.id}>
                      			<Book
                      				book={book}
                      				shelfChange={this.props.shelfChange}
                      			/>
                    		</li>
                  		))}
	    	  		</ol>
	   			</div>
   			</div>
		)
	}

	  static propTypes = {
    	shelfChange: PropTypes.func.isRequired
  	}
}

export default Search;