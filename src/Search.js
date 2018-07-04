import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link }  from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
	state = {
		query: '',
		queryResults: []
	}

	// TO DO: CLEAR RESULTS WHEN SEARCH BAR IS EMPTY: HOW???
	search = (query) => {
 		if (query) {
			BooksAPI.search(query)
			.then((results) => {
				if (results !== null && typeof results === 'object') {
					this.setState({queryResults: results, query: query}) // It seems like search is only performed on first letter after first two letters are typed in
				} else {
					this.setState({queryResults: []})
				}
			})
		} else {
 			this.setState({queryResults: []})
 			return;
 		}
 		console.log(this.state.queryResults)
 	}

	render() {
		const { shelfChange } = this.props;
		const { query, queryResults } = this.state;
		return (
			<div>
	    		<div className="search-books-bar">
	      			<Link to="/" className="close-search">Close</Link>
	      			<div className="search-books-input-wrapper">
		        		<input
			        		type="text"
			        		value={query}
			        		placeholder="Search by title or author"
			        		onChange={(event) => this.search(event.target.value)}
			        	/>
	      			</div>
	    		</div>
	    		<div className="search-books-results">
	    	  		<ol className="books-grid">
	    	  			{queryResults.map((book) => (
                    		<li key={book.id}>
                      			<Book
                      				book={book}
                      				shelfChange={shelfChange}
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