const blogController = require("../controllers/blog.controller");

module.exports = function (app) {
  app.post("/api/blog/create", blogController.create);
  app.get("/api/blog/getAll", blogController.getAll);
  app.get("/api/blog/getAllByUser/:id", blogController.getAllByUser);
  app.put("/api/blog/update", blogController.update);
  app.delete("/api/blog/delete/:id", blogController.delete);
  app.put("/api/blog/likes", blogController.likes);
  app.put("/api/blog/watchs", blogController.watchs);
};
