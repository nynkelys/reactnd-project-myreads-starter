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

	search = (event) => { // Everything is asynchronous (even a query of nothing)
		const query = event.target.value;

			BooksAPI.search(query) // From here ...
			.then((results) => { // You don't know when you get the results
				const hasResults = Array.isArray(results) // If results is array (which means results have been returned in array without error)
				if (hasResults) {
					this.setState({queryResults: results})
				} else {
					this.setState({queryResults: []})
				}
			})
 		this.setState({query})
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
			        		onChange={this.search}
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