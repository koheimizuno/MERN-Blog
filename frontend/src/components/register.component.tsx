import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../services/auth.service";
import { Navigate } from "react-router-dom";

type Props = {};

type State = {
  redirect: string | null;
  username: string;
  email: string;
  password: string;
  successful: boolean;
  message: string;
};

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      redirect: null,
      username: "",
      email: "",
      password: "",
      successful: false,
      message: "",
    };
  }

  validationSchema() {
    return Yup.object().shape({
      username: Yup.string()
        .test(
          "len",
          "The username must be between 3 and 20 characters.",
          (val: any) =>
            val && val.toString().length >= 3 && val.toString().length <= 20
        )
        .required("This field is required!"),
      email: Yup.string()
        .email("This is not a valid email.")
        .required("This field is required!"),
      password: Yup.string()
        .test(
          "len",
          "The password must be between 6 and 40 characters.",
          (val: any) =>
            val && val.toString().length >= 6 && val.toString().length <= 40
        )
        .required("This field is required!"),
    });
  }

  handleRegister(formValue: {
    username: string;
    email: string;
    password: string;
  }) {
    const { username, email, password } = formValue;

    this.setState({
      message: "",
      successful: false,
    });

    AuthService.register(username, email, password).then(
      (response) => {
        this.setState({
          message: response.data.message,
          successful: true,
          redirect: "/login",
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage,
        });
      }
    );
  }

  render() {
    const { successful, message } = this.state;
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const initialValues = {
      username: "",
      email: "",
      password: "",
    };

    return (
      <div className=" flex justify-center w-full mt-10 p-5">
        <div className="w-3/5 p-5 shadow-2xl rounded-xl border bg-gray-100">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleRegister}
          >
            <Form>
              {!successful && (
                <div>
                  <div className="my-4">
                    <div className="flex justify-between items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 mr-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>

                      <Field
                        name="username"
                        type="text"
                        placeholder="User"
                        className="w-full px-3 py-2 rounded border-b-2 border-gray-400 outline-none focus:border-2"
                      />
                    </div>
                    <ErrorMessage
                      name="username"
                      component="div"
                      className=" text-red-500 ml-10"
                    />
                  </div>

                  <div className="my-4">
                    <div className="flex justify-between items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 mr-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>

                      <Field
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="w-full px-3 py-2 rounded border-b-2 border-gray-400 outline-none focus:border-2"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className=" text-red-500 ml-10"
                    />
                  </div>

                  <div className="my-4">
                    <div className="flex justify-between items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 mr-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>

                      <Field
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="w-full px-3 py-2 rounded border-b-2 border-gray-400 outline-none focus:border-2"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className=" text-red-500 ml-10"
                    />
                  </div>

                  <div className="my-4">
                    <button
                      type="submit"
                      className="bg-lime-600 text-white w-full rounded text-lg py-1 my-3"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
}
