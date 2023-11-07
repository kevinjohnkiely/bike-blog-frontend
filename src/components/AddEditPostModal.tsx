import { Button, Form, Modal } from 'react-bootstrap';
import { Post } from '../models/post';
import { useForm } from 'react-hook-form';
import { PostInput } from '../api/postsAPI';
import * as PostsApi from '../api/postsAPI';

interface AddEditPostModalProps {
  postToEdit?: Post;
  onDismiss: () => void;
  onPostSaved: (post: Post) => void;
}

const AddEditPostModal = ({
  onDismiss,
  onPostSaved,
  postToEdit,
}: AddEditPostModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostInput>({
    defaultValues: {
      title: postToEdit?.title || '',
      text: postToEdit?.text || '',
    },
  });

  async function onSubmit(input: PostInput) {
    try {
      let postResponse: Post;

      if (postToEdit) {
        postResponse = await PostsApi.editPost(postToEdit._id, input);
      } else {
        postResponse = await PostsApi.createPost(input);
      }

      onPostSaved(postResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{postToEdit ? "Edit Post": "Add New Post"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id='addEditPostForm' onSubmit={handleSubmit(onSubmit)}>
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
        <Button type='submit' form='addEditPostForm' disabled={isSubmitting}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditPostModal;
