import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)
  const hideWhenVisible = { display: blogInfoVisible ? 'none' : '' }
  const showWhenVisible = { display: blogInfoVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleBlogLike = async (event) => {
    event.preventDefault()
    try {
      const blogUpdate = {
        user: blog.user.id,
        likes: blog.likes+1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }

      blogService.update(blog.id, blogUpdate)
        .then(returnedBlog => {
          setBlogs(blogs.map(blogOld => blogOld.id !== blog.id ? blogOld : returnedBlog))
        })
      /*setUserMessage(`A new blog ${blog.title} added`)
      setTimeout(() => {
        setUserMessage(null)
      }, 5000)*/
    } catch (exception) {
      console.log('error: ', exception)
      /*setErrorMessage('Incorrect blog form')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)*/
    }
  }

  const handleBlogRemove = async (event) => {
    event.preventDefault()
    try {
      blogService.remove(blog.id)
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          setBlogs(blogs.filter(b => b.id !== blog.id))
        })
      /*setUserMessage(`A new blog ${blog.title} added`)
      setTimeout(() => {
        setUserMessage(null)
      }, 5000)*/
    } catch (exception) {
      console.log('error: ', exception)
      /*setErrorMessage('Incorrect blog form')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)*/
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setBlogInfoVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={() => setBlogInfoVisible(false)}>hide</button>
        <p>{blog.title}</p>
        <p>{blog.url}</p>
        <p>likes: {blog.likes}</p>
        <button onClick={handleBlogLike}>like</button>
        <p>{blog.author}</p>
        <button onClick={handleBlogRemove}>remove</button>
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export { Blog }