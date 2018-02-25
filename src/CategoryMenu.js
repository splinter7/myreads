import React, {Component} from 'react'

class CategoryMenu extends Component {
    
    categories = [
        {value: "currentlyReading", label: "Currently Reading"},
        {value: "wantToRead", label: "Want to Read"},
        {value: "read", label: "Read"},
        {value: "none", label: "None"}
    ]

    render(){
        const {shelf, update, bookId} = this.props
        const validShelf = (typeof shelf === "undefined") ? "none" : shelf
        
        return ( 
            <select defaultValue={validShelf} onChange={(e) => update(bookId, e.target.value)}>
                <option disabled>Move to...</option>                
                {this.categories.map((category, i) => (
                    (shelf === category.value) ? (
                        <option key={category.label+"-"+bookId} value={category.value}>{category.label}</option>
                    ) : (
                        <option key={category.label+"-"+bookId} value={category.value}>{category.label}</option>
                    )
                ))}
            </select>
        )
    }
}

export default CategoryMenu