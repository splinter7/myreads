import React, {Component} from 'react';
import Book from './Book'

class BookShelf extends Component {
    render(){
        const {title, books, shelf, update} = this.props;
        const currentShelf = books.filter((book) => (
            shelf === book.shelf
        ))
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {currentShelf.map(book => (
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

export default BookShelf