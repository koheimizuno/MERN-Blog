import axios from "axios";

const API_URL = "http://localhost:8080/api/blog/";

class BlogService {
  createBlog(
    title: string,
    text: string,
    image: string,
    currentUser_id: string,
    currentUser_email: string
  ) {
    return axios.post(API_URL + "create", {
      title,
      text,
      image,
      currentUser_id,
      currentUser_email,
    });
  }
  updateBlog(title: string, text: string, image: string, id: string) {
    return axios.put(API_URL + "update", {
      title,
      text,
      image,
      id,
    });
  }
  deleteBlog(id: string) {
    return axios.delete(API_URL + "delete/" + id);
  }
  likesBlog = (blog_id: string, likes: number) => {
    axios.put(API_URL + "likes", {
      blog_id,
      likes,
    });
  };
}

export default new BlogService();
