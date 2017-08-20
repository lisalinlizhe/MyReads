import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import CreateBook from './CreateBook'
import BookList from './BookList'

class BooksApp extends React.Component {
  state = {
    allBooks: []
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

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookList
            allBooks={this.state.allBooks}
          />
        )}/>
        <Route path="/create" render={() => (
          <CreateBook
            allBooks={this.state.allBooks}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
