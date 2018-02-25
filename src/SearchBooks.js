import React, {Component} from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'

class SearchBooks extends Component {

    state = {
        query: "",
        searchedBooks: []
    }

    queryHandler(query){
        this.setState({query: query.trim()})
        if(query !== "") {
            BooksAPI.search(query).then(books => { 
                if(typeof books.error === 'undefined') {
                    this.setState({
                        searchedBooks: books.map(book => book)
                    })
                } else {
                    this.setState({searchedBooks: books.items})
                }
            })
         } else {
            this.setState({searchedBooks: []})
         }
    }

    render(){
        const {searchedBooks, query} = this.state
        const {update, myBooks} = this.props
        
        /* 
        * The below code replaces any entries from the 
        * with books which the user may already have
        * within their bookshelf
        */
        for(var i = 0; i<searchedBooks.length; i++){
            for(var j = 0; j<myBooks.length; j++){                
                if(myBooks[j].id === searchedBooks[i].id){
                    searchedBooks[i] = myBooks[j]
                    myBooks.splice(j, 1)
                } 
            }
        }

        return (            
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">

                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.queryHandler(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchedBooks.map((book) => (
                            <li key={book.id}>
                                <Book 
                                    bookId={book.id} 
                                    update={update} 
                                    shelf={book.shelf} 
                                    image={(typeof book.imageLinks !== "undefined") && (book.imageLinks.thumbnail)}
                                    title={(typeof book.title !== "undefined") && (book.title)} 
                                    authors={(typeof book.authors !== "undefined") ? (book.authors) : []}  
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks