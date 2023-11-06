import React, { useEffect, useState } from 'react';
import { Post as PostModel } from './models/post';
import Post from './components/Post';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './styles/Posts.module.css';

const App = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);

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
    <Container>
      <Row xs={1} md={2} lg={3} className='g-4'>
        {posts.map((post) => (
          <Col key={post._id}>
            <Post post={post} className={styles.post} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default App;
