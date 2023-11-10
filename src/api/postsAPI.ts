import { Post } from '../models/post';
import { User } from '../models/user';

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    // .error in following comes from line 27 in app.ts of backend
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData('/api/users', { method: 'GET' });
  return response.json();
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function logout() {
  await fetchData('/api/users/logout', { method: 'POST' });
}

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetchData('/api/posts', {
    method: 'GET',
  });
  return response.json();
}

export interface PostInput {
  title: string;
  text: string;
}

export async function createPost(post: PostInput): Promise<Post> {
  const response = await fetchData('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  return response.json();
}

export async function editPost(postId: string, post: PostInput): Promise<Post> {
  const response = await fetchData(`/api/posts/${postId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  return response.json();
}

export async function deletePost(postId: string) {
  await fetchData(`/api/posts/${postId}`, { method: 'DELETE' });
}
