import { User } from '../models/user';
import { useForm } from 'react-hook-form';
import { LoginCredentials } from '../api/postsAPI';
import * as PostsApi from '../api/postsAPI';
import { Button, Form, Modal } from 'react-bootstrap';
import TextInputField from './form/TextInputField';
import styleUtils from '../styles/utils.module.css';

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccess: (user: User) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccess }: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await PostsApi.login(credentials);
      onLoginSuccess(user);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name='username'
            label='Username'
            type='text'
            placeholder='Username'
            register={register}
            registerOptions={{ required: 'Username is required!' }}
            error={errors.username}
          />
          <TextInputField
            name='password'
            label='Password'
            type='password'
            placeholder='Password'
            register={register}
            registerOptions={{ required: 'Password is required!' }}
            error={errors.password}
          />
          <Modal.Footer>
            <Button
              type='submit'
              disabled={isSubmitting}
              className={styleUtils.width100}
            >
              Login
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
