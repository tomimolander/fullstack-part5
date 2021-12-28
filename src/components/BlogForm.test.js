import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BlogForm } from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const handleNewBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={() => null} setUserMessage={() => null} setErrorMessage={() => null} blogs={[]} setBlogs={() => null} handleNewBlog={handleNewBlog}/>
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.change(author, {
    target: { value: 'tester man' }
  })
  fireEvent.submit(form)

  expect(handleNewBlog.mock.calls).toHaveLength(1)
})