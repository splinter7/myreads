import React, {Component} from 'react'
import CategoryMenu from './CategoryMenu'

class Book extends Component {
    render() {
        const {bookId, image, title, authors, shelf, update} = this.props
        let bookCover = (image) ? (`url(${image}`) : "none"
        
        return (
            <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `${bookCover}` }}></div>
                    <div className="book-shelf-changer">
                        <CategoryMenu bookId={bookId} update={update} shelf={shelf} />
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">
                    {authors.map((author) => <span key={author}>{author}</span>)}
                </div>
            </div>
        )
    }
}

export default Book