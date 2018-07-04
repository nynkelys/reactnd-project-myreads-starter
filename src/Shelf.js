import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

// TO DO: Change into stateless component if it only has render()
// TO DO: Write shortcuts instead of writing this.props all the time
class Shelf extends Component { // Render method only, so stateless functional component
    render() {
      return ( // Render one shelf (that is called three times in App.js)
        <div>
          <div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
              <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.props.booksOnShelf.map((book) => ( // Get booksInfo prop from App.js (hence this.props) and map over them, putting them in Book component below
                      <li key={book.id}>
                        <Book
                        book={book}
                        shelfChange={this.props.shelfChange}
                        />
                      </li>
                    ))}
                  </ol>
              </div>
          </div>
        </div>
      )
    }

  static propTypes = {
    booksOnShelf: PropTypes.array.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    shelfChange: PropTypes.func.isRequired
  }
}

export default Shelf;