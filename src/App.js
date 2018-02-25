import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import {Route, Link} from 'react-router-dom';

class BooksApp extends React.Component {
  
  constructor(props) {
      super(props);

      this.state = {
        books: []
      };

      this.updateShelves = this.updateShelves.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        this.setState({
            books: books.map(book => book)
        })
    })
  }

  updateShelves(bookId, shelf) {
    BooksAPI.get(bookId).then((book) => {
      BooksAPI.update(book, shelf).then(() => (
        BooksAPI.getAll().then((books) => (
          this.setState({books})
        ))
      ))
    })
  }

  render() {
    return (
      <div className="app">

        <Route path="/search" render={({history}) => (
          <SearchBooks 
            update={(bookId, shelf) => {
              this.updateShelves(bookId, shelf) 
              history.push('/')
            }} 
            myBooks={this.state.books} 
          />
        )}/>

        <Route path="/" exact render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf update={this.updateShelves} title="Currently Reading" shelf="currentlyReading" books={this.state.books} />
                <BookShelf update={this.updateShelves} title="Want To Read" shelf="wantToRead" books={this.state.books} />
                <BookShelf update={this.updateShelves} title="Read" shelf="read" books={this.state.books} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>

      </div>
    )
  }
}
export default BooksApp