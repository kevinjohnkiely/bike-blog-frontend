import styles from '../styles/Post.module.css';
import { Card } from 'react-bootstrap';
import { Post as PostModel } from '../models/post';
import { formatDate } from '../utils/formatDate';

interface PostProps {
  post: PostModel;
  className?: string;
}

const Post = ({ post, className }: PostProps) => {
  const { title, text, createdAt, updatedAt } = post;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = 'Updated at: ' + formatDate(updatedAt);
  } else {
    createdUpdatedText = 'Created at: ' + formatDate(createdAt);
  }

  return (
    <Card className={`${styles.postCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.postText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted'>{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Post;
