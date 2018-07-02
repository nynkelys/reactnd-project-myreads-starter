import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link }  from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
	state = {
		query: '',
		results: [],
		booksOnShelves: []
	}

	clearQuery() {
		this.setState({results: []})
	}

	shelfChange = (book, shelf) => {
		BooksAPI.update(book, shelf).then(() => {
			BooksAPI.getAll().then(books => {
				this.setState({results: books})
				this.updateSearchBookShelves()
			})
		})
	}

	updateSearchBookShelves() {
	    this.setState({
	      results: this.state.results.map(book => {
	        book.shelf = 'none' // All results in search query get shelf 'none'
	        this.state.booksOnShelves.forEach(bookOnShelf => { // Books already on shelves in main page
	          bookOnShelf.id === book.id && (book.shelf = bookOnShelf.shelf)
	        })
	        return book;
	      })
	    })
	  }

	// TO DO: CLEAR RESULTS WHEN SEARCH BAR IS EMPTY
	updateQuery = (query) => {
		this.setState({query: query}) // Now whatever we write in query will change the value of the input tag
		switch (query) {
			case '':
				this.clearQuery()
				break;
			case (query):
				BooksAPI.search(query).then((response) => {
					if (response.error) {
						this.clearQuery()
					} else {
						this.setState({results: response})
					}
				})
				break;
			default:
				this.clearQuery()
			break;
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
	    	  			{this.state.results.map((book) => (
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