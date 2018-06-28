import React, {Component} from 'react';
import Book from './Book';

class Shelf extends Component {
  render() {
    return (
      <div>
        <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.bookNames.map((book) => ( // Map over books props of shelf component and create a list of books within each shelve
                    <li>
                      {book.id}
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