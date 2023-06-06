import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import BlogService from "../services/blog-service";
import AuthService from "../services/auth.service";

export const CreateBlog = () => {
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [redirect, setRedirect] = useState("");
  const user = AuthService.getCurrentUser();

  const initialValues = {
    title: "",
    text: "",
    image: "",
  };
  const handleCreate = (formValue: {
    title: string;
    text: string;
    image: string;
  }) => {
    const { title, text, image } = formValue;

    BlogService.createBlog(title, text, image, user.id, user.email).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
        setRedirect("/mypage");
      }
    );
  };
  const validationSchema = () => {
    return Yup.object().shape({
      title: Yup.string().required("This field is required!"),
      text: Yup.string().required("This field is required!"),
      image: Yup.string().required("This field is required!"),
    });
  };
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="flex justify-center mt-20">
      <Formik
        initialValues={initialValues}
        onSubmit={handleCreate}
        validationSchema={validationSchema}
      >
        <Form className="w-3/5 border rounded-lg shadow-2xl">
          <h1 className=" text-4xl text-center bg-gray-800 text-white p-5">
            <i>Create Blog</i>
          </h1>
          <div className="px-10">
            <div className="my-4 flex justify-between">
              <label className="" htmlFor="title">
                Title
              </label>
              <div className="w-11/12  ml-3">
                <Field
                  name="title"
                  id="title"
                  type="text"
                  className="w-full px-3 py-2 rounded border-2 border-gray-400 outline-none"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className=" text-red-500"
                />
              </div>
            </div>
            <div className="my-4 flex justify-between">
              <label className="" htmlFor="text">
                Text
              </label>
              <div className="w-11/12  ml-4">
                <Field
                  name="text"
                  id="text"
                  as="textarea"
                  min="3"
                  className="w-full px-3 py-2 rounded border-2 border-gray-400 outline-none"
                />
                <ErrorMessage
                  name="text"
                  component="div"
                  className=" text-red-500"
                />
              </div>
            </div>
            <div className="my-4 flex justify-between">
              <label className="" htmlFor="image">
                Image
              </label>
              <div className="w-11/12 ml-2">
                <Field
                  name="image"
                  id="image"
                  type="url"
                  className="w-full px-3 py-2 rounded border-2 border-gray-400 outline-none"
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className=" text-red-500"
                />
              </div>
            </div>
            <div className="my-4">
              <button
                type="submit"
                className="bg-lime-600 text-white w-full rounded text-lg py-1"
              >
                Create
              </button>
            </div>
          </div>
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
  );
};
