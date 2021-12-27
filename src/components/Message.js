import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message }) => {

  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontStyle: 'solid',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const ErrorMessage = ({ message }) => {

  const errorMessageStyle = {
    color: 'red',
    background: 'lightgrey',
    fontStyle: 'solid',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div style={errorMessageStyle}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string
}

ErrorMessage.propTypes = {
  message: PropTypes.string
}

export { Notification, ErrorMessage }