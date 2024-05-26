// @ts-check
const express = require("express");
const cors = require("cors");

const { studentRoutes } = require("./student/route");
const { teacherRoutes } = require("./teacher/route");
const { getTeachersCount } = require("./teacher/api");
const { getStudentsCount } = require("./student/api");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(express.json({ limit: "2mb" }));
app.disable("x-powered-by");

app.use((req, res, next) => {
  console.log("<============================================>");
  console.log("METHOD: %s;", req.method);
  console.log("URL: %s", req.url);
  console.log("PATH: %s", req.path);
  console.log("HOSTNAME: %s", req.hostname);
  console.log("BASEURL: %s", req.baseUrl);
  console.log("params: %s", req.params);
  console.log("query: %s", req.query);
  console.log({ body: req.body });
  console.log("ROUTE: %s", req.route);
  console.log("ORIGINAL_URL: %s", req.originalUrl);
  console.log("SECURE: %s", req.secure);
  console.log("HTTP_VERSION: %s", req.httpVersion);
  console.log("SUBDOMAINS: %s", req.subdomains);
  console.log("CLIENT_IP: %s", req.ip);
  console.log("</===========================================>");
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({ data: { message: "Welcome to School Service API" } });
});

app.get("/dashboard", async (req, res) => {
  res.status(200).json({
    data: {
      teachers: await getTeachersCount(),
      students: await getStudentsCount(),
    },
  });
});

app.use("/students", [studentRoutes]);
app.use("/teachers", [teacherRoutes]);

app.use((req, res, next) => {
  res.status(404).send({
    data: null,
    message: `Route '${req.path}', NOT found...`,
    success: false,
    currentRouteInfo: {
      baseUrl: req.baseUrl,
      url: req.url,
      params: req.params,
      query: req.query,
      body: req.body,
      method: req.method,
    },
  });
});

module.exports = app;
