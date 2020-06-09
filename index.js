const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");

app.use(bodyParser.urlencoded({ extended: true })); //client가 요청한 정보를 서버로부터 받는다
app.use(bodyParser.json()); //json타입을 받는다

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://spring:qha1826@cluster0-hjvht.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/register", (req, res) => {
  //회원가입할때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  }); //mongoDB에서 오는 메소드
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
