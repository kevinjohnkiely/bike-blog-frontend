import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import * as PostsApi from './api/postsAPI';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import PostsPageLoggedInView from './components/PostsPageLoggedInView';
import PostsPageLoggedOutView from './components/PostsPageLoggedOutView';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import styles from './styles/Posts.module.css';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await PostsApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccess={() => setLoggedInUser(null)}
      />

      <Container className={styles.postsPage}>
        <>
          {loggedInUser ? (
            <PostsPageLoggedInView />
          ) : (
            <PostsPageLoggedOutView />
          )}
        </>
      </Container>
      {showSignUpModal && (
        <SignUpModal
          onDismiss={() => setShowSignUpModal(false)}
          onSignUpSuccess={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        />
      )}
      {showLoginModal && (
        <LoginModal
          onDismiss={() => setShowLoginModal(false)}
          onLoginSuccess={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      )}
    </div>
  );
};

export default App;
