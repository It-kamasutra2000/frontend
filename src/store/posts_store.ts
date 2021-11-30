import { makeAutoObservable } from "mobx";
import postService from "../api/post_service";

class PostsStore {
  posts: IPost[] = [];
  isFetching: boolean = false;
  error: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  getPosts = async () => {
    try {
      this.isFetching = true;
      const result = await postService.getPosts();
      if (!result.data.success) {
        throw new Error(result.data.message);
      }
      this.posts = result.data.data;
    } catch ({ message }) {
      this.error = message as string;
    } finally {
      this.isFetching = false;
    }
  };

  createPost = async (postData: PostStoreType) => {
    try {
      this.isFetching = true;
      const result = await postService.createPost(postData);
      if (!result.data.success) {
        throw new Error(result.data.message);
      }
      this.posts.push(result.data.data);
    } catch ({ message }) {
      this.error = message as string;
    } finally {
      this.isFetching = false;
    }
  };

  deletePost = async (id: string) => {
    try {
      this.isFetching = true;
      const result = await postService.deletePost(id);
      if (!result.data.success) {
        throw new Error(result.data.message);
      }
      this.getPosts();
    } catch ({ message }) {
      this.error = message as string;
    } finally {
      this.isFetching = false;
    }
  };

  editePost = async (id: string, title: string, body: string) => {
    try {
      this.isFetching = true;
      const result = await postService.editePost(id, title, body);
      if (!result.data.success) {
        throw new Error(result.data.message);
      }
      this.getPosts();
    } catch ({ message }) {
      this.error = message as string;
    } finally {
      this.isFetching = false;
    }
  };
}

export default new PostsStore();
