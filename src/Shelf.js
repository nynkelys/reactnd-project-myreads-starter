import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {
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
                      book={book}/>
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
    book: PropTypes.object.isRequired
  }
}

export default Shelf;