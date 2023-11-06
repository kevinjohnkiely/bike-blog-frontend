import { Post } from '../models/post';

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
