import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link }  from 'react-router-dom'
import Book from './Book'
import escapeRegExp from 'escape-string-regexp' // Installed with npm
import sortBy from 'sort-by' // Installed with npm

class Search extends Component {
	state = { query: '' }
	updateQuery = (query) => {
		this.setState({query: query}) // Now whatever we write in query will change the value of the input tag
	}

	render() {
		let showingBooks
		if (this.state.query) { // If this.state.query is true (someone typed something in search bar)
			const match = new RegExp(escapeRegExp(this.state.query), 'i') // If there are special characters in query, escape them and use as string literal // 'i' means ignore case
			showingBooks = this.props.allBooks.filter((book) => match.test(book.title)) // Add authors here
		} else {
			showingBooks = []
		}

		showingBooks.sort(sortBy('title')) // Sort results by book title

		return (
			<div>
	    		<div className="search-books-bar">
	      			<Link to="/" className="close-search">Close</Link>
	      			<div className="search-books-input-wrapper">
	        		{/*
	                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
	                  You can find these search terms here:
	                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

	                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
	                  you don't find a specific author or title. Every search is limited by search terms.
	        		*/}
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
	    	  			{showingBooks.map((book) => ( // Get allBooks prop from App.js (hence this.props) and map over them, putting them in results
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