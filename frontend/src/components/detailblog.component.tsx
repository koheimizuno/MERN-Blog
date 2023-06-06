import axios from "axios";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { string } from "yup";
import AuthService from "../services/auth.service";

export const DetailBlog = () => {
  interface obj {
    blog_id: String | null;
    watch_status: Boolean;
  }
  const API_URL = "http://localhost:8080/api/blog/";

  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const blog_id = params.get("_id");
  const title = params.get("title");
  const text = params.get("text");
  const image = params.get("image");
  const user_email = params.get("user_email");
  const created_date = params.get("created_date");
  const watchs = Number(params.get("watchs"));
  const likes = params.get("likes");

  const d = new Date(created_date ?? "");

  const date = d.toLocaleDateString();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    const obj: obj = { blog_id: blog_id, watch_status: false };
    let arr = [];
    arr.push(obj);
    const sss = JSON.stringify(arr);
    localStorage.setItem(user.username, sss);
    console.log(localStorage.getItem(user.username));

    axios.put(API_URL + "watchs", {
      blog_id,
      watchs,
    });
  });

  return (
    <div className=" mt-10 w-3/5 lg:w-2/5 m-auto">
      <div className="my-5 w-full text-center">
        <Link
          to={"/"}
          className=" my-5 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Back
        </Link>
      </div>
      <ul className="text-2xl font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li>{image && <img src={image} alt="" className="border-b" />}</li>
        <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          <span className=" font-bold">User email: &nbsp;&nbsp;</span>
          {user_email}
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <span className=" font-bold">Title: &nbsp;&nbsp;</span>
          {title}
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          <span className=" font-bold">Text: &nbsp;&nbsp;</span>
          {text}
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          <span className=" font-bold">Created_date: &nbsp;&nbsp;</span>
          {created_date}
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          <span className=" font-bold">Watch: &nbsp;&nbsp;</span>
          {watchs}
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          <span className=" font-bold">Like: &nbsp;&nbsp;</span>
          {likes}
        </li>
      </ul>
    </div>
  );
};
