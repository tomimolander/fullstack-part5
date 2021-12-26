import React from 'react'
const Blog = ({blog}) => {
  return (
  <div>
    {blog.title} {blog.author}
  </div>  
  )}

// eslint-disable-next-line import/no-anonymous-default-export
export default Blog