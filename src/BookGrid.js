import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types';

class BookGrid extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookChange: PropTypes.func.isRequired
  };

  render() {
    const { books, onBookChange } = this.props;

    return (
      <ol className="books-grid">
        {books.map((book, index) => {
          const { id = 0, imageLinks = {}, title = 'Unknown', authors = [], shelf = 'none'} = book;
          console.log('book', book.shelf)
          const { thumbnail='https://www.google.com/images/errors/robot.png' } = imageLinks;
          const [ bookAuthors='Unknown' ] = authors;

          return <Book
            key={index}
            bookCover={thumbnail}
            bookTitle={title}
            bookAuthors={bookAuthors}
            shelf={shelf}
            onChange={(change) => {
              change.id = id;
              onBookChange(change, book)
            }}
          />
        })}
      </ol>
    )
  }
}

export default BookGrid;
