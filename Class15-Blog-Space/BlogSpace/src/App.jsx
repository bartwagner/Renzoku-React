import React from 'react'
import './App.css'
import Posts from './components/Posts';

function App() {

  const [allPosts, setAllPosts] = React.useState([]);

  fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then(res => res.json())
  .then(data => {
    setAllPosts(data.slice(0, 5))
  })

const loadAllPosts = allPosts.map(p =>
  <Posts 
    title={p.title}
    body={p.body}
  />
  )

  return (
    <div>
      {loadAllPosts}
    </div>
  )
}

export default App
