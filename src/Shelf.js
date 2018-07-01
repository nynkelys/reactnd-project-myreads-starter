import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

function Shelf(props, {shelfTitle, booksOnShelf, change}) { // Render method only, so stateless functional component
    return ( // Render one shelf (that is called three times in App.js)
      <div>
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                  {props.booksOnShelf.map((book) => ( // Get booksInfo prop from App.js (hence this.props) and map over them, putting them in Book component below
                    <li key={book.id}>
                      <Book
                      book={book}
                      changeShelf={props.change}/>
                    </li>
                  ))}
                </ol>
            </div>
        </div>
      </div>
    )
}

  Shelf.propTypes = {
    booksOnShelf: PropTypes.array.isRequired,
    shelfTitle: PropTypes.string.isRequired,
  }


export default Shelf;