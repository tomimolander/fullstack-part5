import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import {Notification, ErrorMessage} from './components/Message'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userMessage, setUserMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setURL] = useState('') 

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  useEffect(() => {
    if (user !== null){
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
  },[user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log("error: ", exception)
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({
        title, author, url
      })
      setAuthor('')
      setTitle('')
      setURL('')
      setUserMessage(`A new blog ${blog.title} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      console.log("error: ", exception)
      setErrorMessage('Incorrect blog form')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <>
    <h2>log into application</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>     
    </> 
  )

  const blogForm = () => (
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
  )

  return (
    <div>
      <Notification message={userMessage} />
      <ErrorMessage message={errorMessage} />
      {user === null ?
      loginForm() :
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Log Out</button>
        <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </div>
        <h2>create new</h2>
        {blogForm()}
      </div>
      }
    </div>
  )
}

export default App