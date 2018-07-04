import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

function Shelf(props){ // Render method only, so stateless functional component
      const { shelfTitle, booksOnShelf, shelfChange } = props;
      return ( // Render one shelf (that is called three times in App.js)
        <div>
          <div className="bookshelf">
              <h2 className="bookshelf-title">{shelfTitle}</h2>
              <div className="bookshelf-books">
                  <ol className="books-grid">
                    {booksOnShelf.map((book) => ( // Map over booksOnShelf, putting them in Book component below
                      <li key={book.id}>
                        <Book
                        book={book}
                        shelfChange={shelfChange}
                        />
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
    shelfChange: PropTypes.func.isRequired
}

export default Shelf;