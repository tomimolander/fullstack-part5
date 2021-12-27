import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog, setUserMessage, setErrorMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await createBlog({
        title, author, url
      })
      setAuthor('')
      setTitle('')
      setURL('')
      setUserMessage(`A new blog ${blog.title} added`)
      setTimeout(() => {
        setUserMessage(null)
      }, 5000)
    } catch (exception) {
      console.log('error: ', exception)
      setErrorMessage('Incorrect blog form')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogFormVisible(true)}>create new blog</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          <h2>create new</h2>

          <form onSubmit={handleNewBlog}>
            <div>
               title:
              <input
                type="text"
                value={title}
                name="Title"
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
               author:
              <input
                type="text"
                value={author}
                name="Author"
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
               url:
              <input
                type="text"
                value={url}
                name="Url"
                onChange={({ target }) => setURL(target.value)}
              />
            </div>
            <button type="submit">create</button>
          </form>
        </div>
        <button onClick={() => setBlogFormVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  setUserMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired
}

export { BlogForm }