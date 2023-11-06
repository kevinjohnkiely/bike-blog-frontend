import React, { useEffect, useState } from 'react';
import { Post as PostModel } from './models/post';
import Post from './components/Post';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from './styles/Posts.module.css';
import styleUtils from './styles/utils.module.css';
import * as PostsApi from './api/postsAPI';
import AddPostModal from './components/AddPostModal';

const App = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [showAddPostModal, setShowAddPostModal] = useState(false);

  useEffect(() => {
    async function loadPosts() {
      try {
        const posts = await PostsApi.fetchPosts();
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
      <Button className={`mb-4 ${styleUtils.blockCenter}`} onClick={() => setShowAddPostModal(true)}>Add New Post</Button>
      <Row xs={1} md={2} lg={3} className='g-4'>
        {posts.map((post) => (
          <Col key={post._id}>
            <Post post={post} className={styles.post} />
          </Col>
        ))}
      </Row>
      {showAddPostModal && (
        <AddPostModal
          onDismiss={() => setShowAddPostModal(false)}
          onPostSaved={(newPost) => {
            setPosts([...posts, newPost]);
            setShowAddPostModal(false);
          }}
        />
      )}
    </Container>
  );
};

export default App;
