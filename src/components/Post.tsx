import styles from '../styles/Post.module.css';
import styleUtils from '../styles/utils.module.css';
import { Card } from 'react-bootstrap';
import { Post as PostModel } from '../models/post';
import { formatDate } from '../utils/formatDate';
import { MdDelete } from 'react-icons/md';

interface PostProps {
  post: PostModel;
  className?: string;
  onPostClicked: (post: PostModel) => void;
  onDeletePostClicked: (post: PostModel) => void;
}

const Post = ({
  post,
  className,
  onDeletePostClicked,
  onPostClicked,
}: PostProps) => {
  const { title, text, createdAt, updatedAt } = post;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = 'Updated at: ' + formatDate(updatedAt);
  } else {
    createdUpdatedText = 'Created at: ' + formatDate(createdAt);
  }

  return (
    <Card
      className={`${styles.postCard} ${className}`}
      onClick={() => onPostClicked(post)}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}{' '}
          <MdDelete
            onClick={(e) => {
              onDeletePostClicked(post);
              e.stopPropagation();
            }}
            className='text-muted ms-auto'
          />
        </Card.Title>
        <Card.Text className={styles.postText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted'>{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Post;
