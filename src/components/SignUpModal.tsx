import { User } from '../models/user';
import { useForm } from 'react-hook-form';
import { SignUpCredentials } from '../api/postsAPI';
import * as PostsApi from '../api/postsAPI';
import { Button, Form, Modal } from 'react-bootstrap';
import TextInputField from './form/TextInputField';
import styleUtils from '../styles/utils.module.css';

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccess: (user: User) => void;
}

const SignUpModal = ({ onDismiss, onSignUpSuccess }: SignUpModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await PostsApi.signUp(credentials);
      onSignUpSuccess(newUser);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name='username'
            label='Username'
            type='text'
            placeholder='Username'
            register={register}
            registerOptions={{ required: 'Username is required' }}
            error={errors.username}
          />
          <TextInputField
            name='email'
            label='Email'
            type='email'
            placeholder='Email Address'
            register={register}
            registerOptions={{ required: 'Email address is required' }}
            error={errors.email}
          />
          <TextInputField
            name='password'
            label='Password'
            type='password'
            placeholder='Password'
            register={register}
            registerOptions={{ required: 'Password is required' }}
            error={errors.password}
          />
          <Modal.Footer>
            <Button
              type='submit'
              disabled={isSubmitting}
              className={styleUtils.width100}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
