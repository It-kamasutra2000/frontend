import instacne from "./api";

class PostService {
  login = (email: string, password: string) => {
    const result = instacne.post("users", {
      email,
      password,
    });
    return result;
  };

  logout = () => {
    const token = localStorage.getItem("token");
    const result = instacne.delete("users", {
      headers: {
        authorization: token ? token : "",
      },
    });
    return result;
  };

  registration = (email: string, password: string, name: string) => {
    const result = instacne.post("users/auth", {
      email,
      password,
      name,
    });
    return result;
  };

  auth = () => {
    const token = localStorage.getItem("token");
    const result = instacne.get("auth", {
      headers: {
        authorization: token ? token : "",
      },
    });
    return result;
  };
}

export default new PostService();
