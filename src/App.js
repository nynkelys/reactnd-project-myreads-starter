import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import Search from './Search'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    booksInfo: [], // Array with book objects
  }

  // Now some regular homepage functions
  componentDidMount() { // Fetch data from API and add them to this.state.booksInfo
      BooksAPI.getAll().then((booksInfo) => {
        this.setState({booksInfo: booksInfo})
      })
  }

  // With help of @Pascal
  shelfChange = (book, shelf) => { // Book and shelf are arguments
    BooksAPI.update(book, shelf)
    .then(() => {
      book.shelf = shelf // Update shelf with shelf I just selected
      this.setState((state) => ({ // State is argument
        booksInfo: state.booksInfo.filter((b) => ( // Filter all books in booksInfo, return every book in the same shelf ...
          b.id !== book.id // ... except the book that was selected for changing shelves (which we indicate by comparing its id to the id's in booksInfo)
          )).concat(shelf !== "none" ? [book]: []) // And then, if chosen shelf is not 'none', concatenate the book to the array, if chosen shelf is 'none', concatenate empty array

          // Why does this not work instead of line 29?
          //   if (shelf !== "none") {
          //      booksInfo: state.booksInfo.concat([book])
          // } else {
          //      booksInfo: state.booksInfo.concat([])
          // }
      }))
    })
  }

  // TO DO: Write shortcuts instead of writing this.props all the time
  render() {
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
                  booksOnShelf = {this.state.booksInfo.filter((book) => book.shelf === "currentlyReading")}
                  shelfChange = {this.shelfChange}/>
                <Shelf
                  shelfTitle = "Want to Read"
                  booksOnShelf = {this.state.booksInfo.filter((book) => book.shelf === "wantToRead")}
                  shelfChange = {this.shelfChange}/>
                <Shelf
                  shelfTitle = "Read"
                  booksOnShelf = {this.state.booksInfo.filter((book) => book.shelf === "read")}
                  shelfChange = {this.shelfChange}/>
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
              shelfChange = {this.shelfChange}/>
          )}/>
        </div>

      </div>
    )
  }
}

export default BooksApp
