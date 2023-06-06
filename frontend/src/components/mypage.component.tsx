import { Component } from "react";

import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import AuthService from "../services/auth.service";
import BlogService from "../services/blog-service";
import IUser from "../types/user.type";
const API_URL = "http://localhost:8080/api/blog/";

type Props = {};

interface Blog {
  _id: string;
  title: string;
  text: string;
  image: string;
  user_email: string;
  watchs: number;
  likes: number;
}
type State = {
  content: string;
  blogArr: Blog[];
  currentUser: IUser | undefined;
  redirect: string;
};
export default class MyPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: "",
      blogArr: [],
      currentUser: AuthService.getCurrentUser(),
      redirect: "",
    };
  }
  componentWillMount() {
    const { currentUser } = this.state;

    axios.get(API_URL + "getAllByUser/" + currentUser?.id).then((res) => {
      this.setState({ blogArr: res.data });
    });
  }

  deleteblog = (id: any) => {
    BlogService.deleteBlog(id).then((res) => {
      return this.setState({ redirect: "/mypage" });
    });
  };
  render() {
    const { redirect, currentUser } = this.state;
    if (redirect) {
      return <Navigate to={redirect} />;
    }

    return (
      <>
        <section className="text-center py-10 border bg-gray-300">
          <h1 className="text-4xl text-red-600">
            <i>Welcome to My Page</i>
          </h1>
        </section>
        <section className="flex items-center justify-center p-4 pb-0">
          {currentUser && (
            <Link
              to={"/create"}
              className=" bg-blue-600 text-white text-lg p-3 rounded-lg"
            >
              Create blog
            </Link>
          )}
        </section>
        <section className="flex justify-center">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 lg:p-10 md:p-7 sm:p-4 ">
            {this.state.blogArr.map((item, key) => {
              return (
                <div className="m-2 mt-0 border rounded-lg shadow-lg  bg-gray-100">
                  <img src={item.image} alt="" className="w-full" />
                  <div className="">
                    <p className="border-b px-4 py-2 text-gray-700">
                      <span className=" font-bold">Title:</span> {item.title}
                    </p>
                    <p className="border-b px-4 py-2 text-gray-700">
                      <span className=" font-bold">Text:</span>
                      {/* <br /> */}
                      &nbsp;{item.text}
                    </p>
                    <div className="flex justify-around py-2">
                      {currentUser && (
                        <Link to={"/update/" + item._id}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          this.deleteblog(item._id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                      <button className="flex justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        &nbsp;{item.watchs}
                      </button>
                      <button className="flex justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                          />
                        </svg>
                        &nbsp;{item.likes}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </>
    );
  }
}
