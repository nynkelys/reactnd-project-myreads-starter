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

  componentDidMount() { // Fetch data from API and add them to this.state.booksInfo
      BooksAPI.getAll().then((booksInfo) => {
        this.setState({booksInfo})
      })
  }

  // With help from @Pascal
  shelfChange = (book, shelf) => {
      book.shelf = shelf
      this.setState((state) => ({
        booksInfo: state.booksInfo.filter((b) => ( // Filter all books as in current state in booksInfo
          b.id !== book.id
          )).concat(shelf !== 'none' ? [book]: []) // If chosen shelf is not 'none', concatenate the book to the right shelf array, if chosen shelf is 'none', concatenate empty array
      }))
  }

  render() {
    const { booksInfo } = this.state;
    const { shelfChange } = this;
    const firstShelf = {
      title: "Currently Reading",
      shelf: "currentlyReading"
    }
    const secondShelf = {
      title: "Want To Read",
      shelf: "wantToRead"
    }
    const thirdShelf = {
      title: "Read",
      shelf: "read"
    }
    const shelvesInfo = [firstShelf, secondShelf, thirdShelf]
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              {shelvesInfo.map((shelfInfo) => (
                <Shelf
                  shelfTitle = {shelfInfo.title}
                  booksOnShelf = {booksInfo.filter((book) => book.shelf === shelfInfo.shelf)}
                  shelfChange = {shelfChange}/>
              ))}
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
