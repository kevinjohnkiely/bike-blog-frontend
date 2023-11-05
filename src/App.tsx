import React, { useEffect, useState } from 'react';
import './App.css';
import { Post } from './models/post';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch('/api/posts', {
          method: 'GET',
        });
        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadPosts();
  }, []);

  return (
    <div className='App'>
      {JSON.stringify(posts)}
    </div>
  );
}

export default App;
