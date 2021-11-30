import { AxiosResponse } from "axios";
import instacne from "./api";

class PostService {
  getPosts = () => {
    const result = instacne.get("posts");
    return result;
  };

  createPost = ({ title, body }: PostStoreType) => {
    const result = instacne.post("posts", {
      title,
      body,
    });
    return result;
  };

  deletePost = (id: string) => {
    const result = instacne.delete(`posts?postId=${id}`);
    return result;
  };

  editePost = (id: string, title: string, body: string) => {
    const result = instacne.put("posts", { id, title, body });
    return result;
  };
}

export default new PostService();
