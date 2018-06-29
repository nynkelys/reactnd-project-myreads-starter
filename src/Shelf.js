import React, {Component} from 'react'
import Book from './Book'

class Shelf extends Component {
  render() {
    return ( // Render one shelf (that is called three times in App.js)
      <div>
        <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.bookNames.map((book) => ( // Get booknames from App.js (hence this.props) and map over them, putting them in Book component below
                    <li>
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
}

export default Shelf;