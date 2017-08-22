import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBook from './SearchBook'
import BookList from './BookList'

class BooksApp extends React.Component {
  state = {
    allBooks: [],
    searchResult: []
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

  changeBookStatus = (book, event) => {
    let bookStatus = event.target.value
    let bookIndex = this.getBook(book.id)
    this.state.allBooks[bookIndex].shelf = bookStatus
    this.setState(state => ({
        allBooks: state.allBooks
      }))
    BooksAPI.update(book, event.target.value)
  }

  getBook = (id) => {
    for(let i=0; i<this.state.allBooks.length; i++)
      if(this.state.allBooks[i].id === id){
        return i
      }
  }

  searchBooks = (query) => {
    BooksAPI.search(query).then(result =>{
      this.setState(state => ({
        searchResult: result
      }))
    })
  }

  addBook(bookId, e) {
    BooksAPI.get(bookId).then(book=>{
      book.shelf = status
      this.setState(state => ({
        allBooks: state.allBooks.concat ( [book] )
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookList
            allBooks={this.state.allBooks}
            changeBookStatus={this.changeBookStatus}
          />
        )}/>
        <Route path="/search" render={({history}) => (
          <SearchBook
            searchResult={this.state.searchResult}
            searchBooks={this.searchBooks}
            addBook={(bookId, status)=> {
              this.addBook(bookId, status)
              history.push('/')
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
