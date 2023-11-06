import { Button, Form, Modal } from 'react-bootstrap';
import { Post } from '../models/post';
import { useForm } from 'react-hook-form';
import { PostInput } from '../api/postsAPI';
import * as PostsApi from '../api/postsAPI';

interface AddPostModalProps {
  onDismiss: () => void;
  onPostSaved: (post: Post) => void;
}

const AddPostModal = ({ onDismiss, onPostSaved }: AddPostModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostInput>();

  async function onSubmit(input: PostInput) {
    try {
      const postResponse = await PostsApi.createPost(input);
      onPostSaved(postResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id='addPostForm' onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Title'
              isInvalid={!!errors.title}
              {...register('title', {
                required: 'Post title is required!',
              })}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Text</Form.Label>
            <Form.Control
              as='textarea'
              rows={5}
              placeholder='Text'
              isInvalid={!!errors.text}
              {...register('text', {
                required: 'Post text content is required!',
              })}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.text?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type='submit' form='addPostForm' disabled={isSubmitting}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPostModal;
