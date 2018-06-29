import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import Search from './Search'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    bookNames: [],
  }

  componentDidMount() { // Fetch data from API and add them to this.state.bookNames
      BooksAPI.getAll().then((bookNames) => {
        this.setState({bookNames})
      })
  }

  filterBook(shelfTitle) {
    return this.state.bookNames.filter((b) => b.shelf === shelfTitle) // Filter whole list of fetched API's on shelf name that is stored in book object
  }

  // Add functions here

  render() {
    return (
      <div className="app">
        <div className="search-books">
          <Route path="/search" component={Search}/>
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
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
