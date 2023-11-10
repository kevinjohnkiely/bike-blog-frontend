import { Button, Form, Modal } from 'react-bootstrap';
import { Post } from '../models/post';
import { useForm } from 'react-hook-form';
import { PostInput } from '../api/postsAPI';
import * as PostsApi from '../api/postsAPI';
import TextInputField from './form/TextInputField';

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
        <Modal.Title>{postToEdit ? 'Edit Post' : 'Add New Post'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id='addEditPostForm' onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name='title'
            label='Title'
            type='text'
            placeholder='Post Title'
            register={register}
            registerOptions={{ required: 'Post title is required' }}
            error={errors.title}
          />
          <TextInputField
            name='text'
            label='Text'
            as='textarea'
            rows={5}
            placeholder='Post Text'
            register={register}
            registerOptions={{ required: 'Post text is required' }}
            error={errors.text}
          />
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
