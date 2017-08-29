import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class BookList extends Component {
  static propTypes = {
   books: PropTypes.array.isRequired,
   onBookChange: PropTypes.func.isRequired
  };
  render() {
    const { books, onBookChange } = this.props;
    const currentlyReading = [];
    const wantToRead = [];
    const read = [];
    for(const book of books) {
      switch(book.shelf) {
        case 'currentlyReading':
          currentlyReading.push(book);
          break;
        case 'wantToRead':
          wantToRead.push(book);
          break;
        case 'read':
          read.push(book);
          break;
        default:
      }
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {currentlyReading.length > 0 && (<BookShelf bookshelfTitle="Currently Reading" books={currentlyReading} onBookChange={onBookChange}/>)}
            {wantToRead.length > 0 && (<BookShelf bookshelfTitle="Want to Read" books={wantToRead} onBookChange={onBookChange}/>)}
            {read.length > 0 && (<BookShelf bookshelfTitle="Read" books={read} onBookChange={onBookChange}/>)}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookList
