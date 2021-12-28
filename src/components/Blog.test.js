import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { Blog } from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'tester man'
  }

  const component = render(
    <Blog blog={blog} blogs={[]} setBlogs={() => null}/>
  )

  const div = component.container.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: none')
  /*component.debug()
  const li = component.container.querySelector('p')
  console.log('logs ', prettyDOM(li))
  */
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'tester man'
  )

})

describe('<Blog />', () => {
  let component
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'tester man',
    likes: 5,
    url: 'N/A'
  }
  beforeEach(() => {
    component = render(
      <Blog blog={blog} blogs={[]} setBlogs={() => null}>
        <div className="testDiv" />
      </Blog>
    )
  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

})

test('clicking the like button twice calls the event handler twice', async () => {
  const blog = {
    user: {
      id: 'g134243h4sdAJJgaa213'
    },
    title: 'Component testing is done with react-testing-library',
    author: 'tester man',
    likes: 5,
    url: 'N/A'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} blogs={[blog]} setBlogs={() => null} handleBlogLike={mockHandler}/>
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})