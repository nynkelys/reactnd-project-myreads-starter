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
    shelves: [] // On these I will put three objects (shelves) with arrays with books
  }

  // Now some regular homepage functions
  componentDidMount() { // Fetch data from API and add them to this.state.booksInfo
      BooksAPI.getAll().then((booksInfo) => {
        this.setState({booksInfo: booksInfo})
        this.shelfChange({}, '')
      })
  }

  // With help of @Pascal
  shelfChange = (book, shelf) => { // Book and shelf are arguments
    const { booksInfo } = this.state;
    BooksAPI.update(book, shelf)
    .then((response) => { // Returns shelves and what I get in my view are these shelves (not books!!!!!) (for every shelf entry (with id's), store them as states, they hold id's, map over these and link to id's of books in DB).
      console.log(response) // When I click on a shelf option, the database gets updated as the book in the database gets assigned a new shelf. So what gets returned is a new update of all shelves ('none' shelf is not returned).
      // This is a workaround!!! Can be much easier (see render())
      const shelves = Object.keys(response) // Keys are names of arrays (shelves)
      this.setState({
        shelves: shelves.map(shelf => { // Shelf is the string in state
          const bookInShelf = response[shelf] // This means in first iteration it's response[currentlyReading], etc.
          return { // Define new object
            title: shelf,
            books: bookInShelf.map(bookId => {
              return booksInfo.find(book => {
                return book.id === bookId
              })
            })
          }
        })
      })



      // book.shelf = shelf // Update shelf with shelf I just selected
      // this.setState((state) => ({ // State is argument
      //   booksInfo: state.booksInfo.filter((b) => ( // Filter all books in booksInfo, return every book in the same shelf ...
      //     b.id !== book.id // ... except the book that was selected for changing shelves (which we indicate by comparing its id to the id's in booksInfo)
      //     )).concat(shelf !== "none" ? [book]: []) // And then, if chosen shelf is not 'none', concatenate the book to the array, if chosen shelf is 'none', concatenate empty array
      // }))
    })
  }

  // TO DO: Write shortcuts instead of writing this.props all the time
  render() {
    const { shelves } = this.state;
    return (
      <div className="app">
        <Route exact path="/" render={() => ( // Here we use render because there are props and not just one component
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              {shelves.map(shelf => (
                <Shelf
                  shelfTitle = {shelf.title}
                  booksOnShelf = {shelf.books}
                  shelfChange = {this.shelfChange}/>
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
              shelfChange = {this.shelfChange}/>
          )}/>
        </div>

      </div>
    )
  }
}

export default BooksApp
