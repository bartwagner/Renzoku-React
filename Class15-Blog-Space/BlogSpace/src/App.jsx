import React from 'react'
import './App.css'
import Posts from './components/Posts';
import Navbar from './components/Navbar';
import NewPost from './components/NewPost';
import {nanoid} from 'nanoid';

function App() {

  const [allPosts, setAllPosts] = React.useState([]);
  
  React.useEffect(()=>{
    fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
      setAllPosts(data.slice(0, 5))
    })
  }, [])

  function addNewPost(data){
    const options = {
      method: "POST",
      body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
      }
      fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
        .then(res => res.json())
        .then(post => {
          setAllPosts([newPosts(post.title, post.body), ...allPosts])
      })
  }

  function newPosts(title, body){
    let post ={
      userId: "",
      id: "",
      title: "",
      body: ""
    }
      post.userId = 1
      post.id = nanoid()
      post.title = title
      post.body = body

      return post
  }

  const loadAllPosts = allPosts.map(p =>
    <Posts
      key={nanoid()}
      title={p.title}
      body={p.body}
    />
  )

  return (
    <main>
      <Navbar />
      <NewPost 
        addNewPost={addNewPost}
      />
      <div className='posts--information'>
        {loadAllPosts}
      </div>
    </main>
  )
}

export default App