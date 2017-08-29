import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBook from './SearchBook'
import BookList from './BookList'
import { BrowserRouter } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    allBooks: [],
    searchResult: [],
    query: ''
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  }

  componentDidMount() {
    BooksAPI.getAll().then((allBooks)=>{
      this.setState({ allBooks })
    })
  }

  onBookChange = (change, book) => {
    console.log('change', change)
    console.log('book', book)

    let bookStatus = change.shelf;
    let bookNeedsToBeUpdated = this.state.allBooks.find((b) => b.id === book.id)
    console.log('bookNeedsToBeUpdated',bookNeedsToBeUpdated)
    bookNeedsToBeUpdated.shelf = bookStatus
    BooksAPI.update(bookNeedsToBeUpdated, bookStatus).then(()=>{
      this.setState(state => ({
          allBooks: state.allBooks
        }))
    })
  }

  searchBooks = (query) =>{
    BooksAPI.search(query, 20).then((response) => {
      this.setSearchResult(response);
    });
  };

  setSearchResult = (response) => {
    if(!response.error) {
      const searchResult = [];
      for(const book of response) {
        const bookAlreadyInList = this.state.allBooks.find((b) => b.id === book.id);
        if(bookAlreadyInList) {
          searchResult.push(bookAlreadyInList);
        } else {
          book.shelf = 'none';
          searchResult.push(book);
        }
      }
      this.setState({ searchResult });
    } else {
      this.setState({ searchResult: [] });
    }
  };


  addBook(bookId, e) {
    BooksAPI.get(bookId).then(book=>{
      book.shelf = status
      this.setState(state => ({
        allBooks: state.allBooks.concat ( [book] )
      }))
    })
  }

  handleOnSearchChangeEvent = (event) => {
    this.updateQuery(event.target.value);
  };

  updateQuery = (query) => {
   this.setState({ query })
 };

 handleOnSearchKeyPressEvent = (event) => {
   console.log('event.key', event.key)
  if (event.key === 'Enter') {
    event.preventDefault();
    this.searchBooks(this.state.query);
    }
  };

  handleOnBookChange = (change, book) => {
    BooksAPI.update({ id: change.id}, change.shelf).then(() => {
      this.updateBooksList(change, book);
      this.updateSearchResults(change);
    });
  };

  updateSearchResults = (change) => {
    let { searchResult } = this.state;
    const bookAlreadyInList = searchResult.find((b) => b.id === change.id);
    if (bookAlreadyInList) {
      bookAlreadyInList.shelf = change.shelf;
    }
    this.setState({ searchResult });
  };

  updateBooksList = (change, book) => {
    let { allBooks } = this.state;
    if (change.shelf === 'none') {
      allBooks = allBooks.filter((b) => b.id !== change.id);
    } else {
      const bookAlreadyInList = allBooks.find((b) => b.id === change.id);
      if (bookAlreadyInList) {
        bookAlreadyInList.shelf = change.shelf;
      } else {
        book.shelf = change.shelf;
        allBooks.push(book)
      }
    }
    this.setState({ allBooks });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/" render={() => (
            <BookList books={this.state.allBooks} onBookChange={this.onBookChange}/>
          )}/>
          <Route path="/search" render={({history}) => (
            <SearchBook
              searchResult={this.state.searchResult}
              onChange={this.handleOnSearchChangeEvent}
              onBookChange={this.handleOnBookChange}
              onKeyPress={this.handleOnSearchKeyPressEvent}
              query={this.query}
            />
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
