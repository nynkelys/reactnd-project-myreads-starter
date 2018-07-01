import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import Search from './Search'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    booksInfo: [],
  }

  // Now some regular homepage functions
  componentDidMount() { // Fetch data from API and add them to this.state.booksInfo
      BooksAPI.getAll().then((booksInfo) => {
        this.setState({booksInfo})
      })
  }

  filterBook(shelfTitle) { // Filter whole list of fetched API's based on shelf name (book object shelf name vs. self-defined shelf name)
    return this.state.booksInfo.filter((b) => b.shelf === shelfTitle)
  }

  // Now the render method to finish off with
  render() {
    return (
      <div className="app">
        <div className="search-books">
          <Route path="/search" render={() => (
            <Search
              allBooks={this.state.booksInfo}/>
          )}/>
        </div>

        <Route exact path="/" render={() => ( // Here we use render because there are props and not just one component
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf // Inside shelf component we can find the books
                  shelfTitle = "Currently Reading"
                  booksOnShelf={this.filterBook("currentlyReading")}/>
                <Shelf
                  shelfTitle = "Want to Read"
                  booksOnShelf={this.filterBook("wantToRead")}/>
                <Shelf
                  shelfTitle = "Read"
                  booksOnShelf={this.filterBook("read")}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
