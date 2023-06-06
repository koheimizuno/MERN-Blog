const Blog = require("../models/blog.model");

exports.create = (req, res) => {
  Blog.findOne({ title: req.body.title }).then((blog) => {
    if (blog) {
      res.send({ message: "Blog already exists!" });
    } else {
      const blog = new Blog({
        title: req.body.title,
        text: req.body.text,
        image: req.body.image,
        user_id: req.body.currentUser_id,
        user_email: req.body.currentUser_email,
        watchs: 0,
        likes: 0,
      });
      blog.save((err, blog) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({ message: "Blog was created successfully!" });
      });
    }
  });
};
exports.getAll = (req, res) => {
  Blog.find()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      return res.json(err);
    });
};
exports.getAllByUser = (req, res) => {
  const id = req.params.id;
  Blog.find({ user_id: id })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      return res.json(err);
    });
};
exports.update = async (req, res) => {
  const { title, text, image, id } = req.body;
  Blog.findByIdAndUpdate(
    id,
    {
      title: title,
      text: text,
      image: image,
    },
    { new: true },
    (err, user) => {
      res.send({ message: "Blog was created successfully!" });
    }
  );
};
exports.delete = async (req, res) => {
  Blog.findByIdAndRemove(req.params.id).then(
    res.send({ message: "Blog was deleted successfully!" })
  );
};
exports.likes = async (req, res) => {
  const { blog_id, likes } = req.body;
  Blog.findByIdAndUpdate(
    blog_id,
    {
      likes: likes + 1,
    },
    (err, user) => {
      res.send({ message: "Blog was created successfully!" });
    }
  );
};
exports.watchs = async (req, res) => {
  const { blog_id, watchs } = req.body;
  Blog.findByIdAndUpdate(
    blog_id,
    {
      watchs: watchs + 1,
    },
    (err, user) => {
      res.send({ message: "Blog was created successfully!" });
    }
  );
};
