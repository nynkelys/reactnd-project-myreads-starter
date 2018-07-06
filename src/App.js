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
        this.setState({booksInfo: booksInfo})
      })
  }

  // With help of @Pascal
  shelfChange = (book, shelf) => {
      book.shelf = shelf // Update shelf with shelf I just selected
      this.setState((state) => ({
        booksInfo: state.booksInfo.filter((b) => ( // Filter all books as in current state in in booksInfo
          b.id !== book.id // Take out if id in booksInfo is not same as id of selected book (on id, not on shelf, because then it would clear current shelf)
          )).concat(shelf !== "none" ? [book]: []) // If chosen shelf is not 'none', concatenate the book to the right shelf array, if chosen shelf is 'none', concatenate empty array
      }))
  }

  render() {
    const { booksInfo } = this.state;
    const { shelfChange } = this;
    return (
      <div className="app">
        <Route exact path="/" render={() => ( // Here we use render because there are props and not just one component
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf // Inside shelf component we can find the books
                  shelfTitle = "Currently Reading"
                  booksOnShelf = {booksInfo.filter((book) => book.shelf === "currentlyReading")} // shelfDefinedInState.map((bookId) => (this.state.booksInfo.find(bookInfo => bookInfo.id == bookId))
                  shelfChange = {shelfChange}/>
                <Shelf
                  shelfTitle = "Want to Read"
                  booksOnShelf = {booksInfo.filter((book) => book.shelf === "wantToRead")}
                  shelfChange = {shelfChange}/>
                <Shelf
                  shelfTitle = "Read"
                  booksOnShelf = {booksInfo.filter((book) => book.shelf === "read")}
                  shelfChange = {shelfChange}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>

        <div className="search-books">
          <Route path="/search" render={() => (
            <Search
              shelfChange = {shelfChange}/>
          )}/>
        </div>

      </div>
    )
  }
}

export default BooksApp
