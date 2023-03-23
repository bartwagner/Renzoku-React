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

  function addNewPost(postTitle, postBody){
    let addNew = allPosts

    addNew.unshift(newPosts(postTitle, postBody))

    setAllPosts(addNew)
  }

  function newPosts(postTitle, postBody){
    let post =[{
      body: "",
      id: "",
      title: "",
      userId: ""
    }]
      post.body = postBody
      post.id = nanoid()
      post.title = postTitle
      post.userId = 1

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