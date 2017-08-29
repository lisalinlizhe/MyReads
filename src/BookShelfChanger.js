import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelfChanger extends Component {
  static propTypes = {
      currentStatus: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired
    };

  render() {
    const { currentStatus, onChange } = this.props
    console.log('currentStatus', currentStatus)
    return (
      <div className="book-shelf-changer">
        <select value={currentStatus} onChange={(event)=>onChange(event.target.value)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookShelfChanger
