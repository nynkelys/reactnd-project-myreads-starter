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

	search = (event) => {
		const query = event.target.value;

			BooksAPI.search(query)
			.then((results) => {
				const hasResults = Array.isArray(results)
				if (hasResults) {
					this.props.booksInfo.map((book) =>
						results.map((result) => {if (result.id === book.id) {result.shelf = book.shelf}}) // Change default shelf
					)
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
		const { search } = this;
		return (
			<div>
	    		<div className="search-books-bar">
	      			<Link to="/" className="close-search">Close</Link>
	      			<div className="search-books-input-wrapper">
		        		<input
			        		type="text"
			        		value={query}
			        		placeholder="Search by title or author"
			        		onChange={search}/>
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