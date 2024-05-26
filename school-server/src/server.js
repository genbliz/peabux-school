//@ts-check
const app = require("./app");

const PORT = process.env.PORT || 3500;

process.on("unhandledRejection", (reason, promise) => {
  console.log(reason, promise);
});

app.listen(PORT, () => {
  console.log(`Server running on: http://127.0.0.1:${PORT}`);
});
