require("dotenv").config();
const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log(
    `App.js Line No 6 : Server is running on port ${process.env.PORT}`
  );
});
