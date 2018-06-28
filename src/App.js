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

  componentDidMount() { // Fetch data from API and add them to this.state.bookNames
      BooksAPI.getAll().then((bookNames) => {
        this.setState({bookNames})
      })
  }

  filterBook(shelfTitle) {
    return this.state.bookNames.filter((b) => b.shelf === shelfTitle)
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
                  bookNames={this.filterBook("currentlyReading")}/>
                <Shelf
                  shelfTitle = "Want to Read"
                  bookNames={this.filterBook("wantToRead")}/>
                <Shelf
                  shelfTitle = "Read"
                  bookNames={this.filterBook("read")}/>
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
