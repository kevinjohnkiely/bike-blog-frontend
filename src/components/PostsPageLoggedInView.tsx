import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import * as PostsApi from '../api/postsAPI';
import { Post as PostModel } from '../models/post';
import styles from '../styles/Posts.module.css';
import styleUtils from '../styles/utils.module.css';
import AddEditPostModal from './AddEditPostModal';
import Post from './Post';

const PostsPageLoggedInView = () => {

  useEffect(() => {
    async function loadPosts() {
      try {
        setPostsLoadError(false);
        setPostsLoading(true);
        const posts = await PostsApi.fetchPosts();
        setPosts(posts);
      } catch (error) {
        console.error(error);
        setPostsLoadError(true);
      } finally {
        setPostsLoading(false);
      }
    }
    loadPosts();
  }, []);

  const [posts, setPosts] = useState<PostModel[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [showPostsLoadError, setPostsLoadError] = useState(false);
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [postToEdit, setPostToEdit] = useState<PostModel | null>(null);

  async function deletePost(post: PostModel) {
    try {
      await PostsApi.deletePost(post._id);
      setPosts(posts.filter((existingPost) => existingPost._id !== post._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const postsGrid = (
    <Row xs={1} md={2} lg={3} className={`g-4 ${styles.postsGrid}`}>
      {posts.map((post) => (
        <Col key={post._id}>
          <Post
            post={post}
            className={styles.post}
            onDeletePostClicked={deletePost}
            onPostClicked={setPostToEdit}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <>
      <Button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowAddPostModal(true)}
      >
        <FaPlus />
        Add New Post
      </Button>

      {postsLoading && <Spinner animation='border' variant='primary' />}
      {showPostsLoadError && <p>Something went wrong. Please reload page!</p>}
      {!postsLoading && !showPostsLoadError && (
        <>{posts.length > 0 ? postsGrid : <p>No posts to show!</p>}</>
      )}

      {showAddPostModal && (
        <AddEditPostModal
          onDismiss={() => setShowAddPostModal(false)}
          onPostSaved={(newPost) => {
            setPosts([...posts, newPost]);
            setShowAddPostModal(false);
          }}
        />
      )}
      {postToEdit && (
        <AddEditPostModal
          postToEdit={postToEdit}
          onDismiss={() => setPostToEdit(null)}
          onPostSaved={(updatedPost) => {
            setPosts(
              posts.map((existingPost) =>
                existingPost._id === updatedPost._id
                  ? updatedPost
                  : existingPost
              )
            );
            setPostToEdit(null);
          }}
        />
      )}
    </>
  );
};

export default PostsPageLoggedInView;
