import React, { Component } from 'react'
import BookGrid from './BookGrid'

class BookShelf extends Component {

  render() {
    const { bookshelfTitle, books, onBookChange} = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookshelfTitle}</h2>
        <div className="bookshelf-books">
          <BookGrid books={books} onBookChange={onBookChange}/>
        </div>
      </div>
    )
  }
}

export default BookShelf
