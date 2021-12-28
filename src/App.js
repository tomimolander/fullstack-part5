import React, { useState, useEffect } from 'react'
import { Blog } from './components/Blog'
import { BlogForm } from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { Notification, ErrorMessage } from './components/Message'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userMessage, setUserMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
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
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('error: ', exception)
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <>
      <h2>log into application</h2>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </>
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
            <BlogForm
              createBlog={blogService.create}
              setUserMessage={setUserMessage}
              setErrorMessage={setErrorMessage}
              blogs={blogs}
              setBlogs={setBlogs}
            />
            {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
              <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs}/>
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default App