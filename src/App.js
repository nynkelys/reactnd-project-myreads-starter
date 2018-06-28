import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    bookNames: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount() { // Fetch data from API
      BooksAPI.getAll()
      .then((bookNames) =>
        this.setState({bookNames : bookNames})
      )
  }

  // Add functions here

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? ( // Search page start
          <div className="search-books">
            <Search/>
          </div>
        ) : ( // Main page start
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf // Inside shelf component we can find the books
                  shelfTitle = "Currently Reading"
                  bookNames={this.state.bookNames}/>
                <Shelf
                  shelfTitle = "Want to Read"
                  bookNames={this.state.bookNames}/>
                <Shelf
                  shelfTitle = "Read"
                  bookNames={this.state.bookNames}/>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
