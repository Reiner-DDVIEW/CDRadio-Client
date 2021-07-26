const { createProxyMiddleware : proxy }  = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/playlist", { target: "http://localhost:5000/" }));
  app.use(proxy("/allowed", { target: "http://localhost:5000/" }));
  app.use(proxy("/upload", { target: "http://localhost:5000/" }));
  app.use(proxy("/youtube", { target: "http://localhost:5000/" }));
  app.use(proxy("/socket.io", { target: "http://localhost:5000/", ws: true }));
};
