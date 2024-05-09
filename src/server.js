const app = require("./app");

const PORT = 3000;

// 3000番でアクセス受付
app.listen(PORT, () => {
  console.log(`Chat app is listening on ${PORT}`);
});
