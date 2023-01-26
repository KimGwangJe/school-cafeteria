const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
});

connection.connect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  connection.query("SELECT * FROM user", function (err, rows) {
    if (err) {
      res.send("실패");
    } else {
      res.send(rows);
    }
  });
});

app.post("/createuser", (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;
  const username = req.body.username;
  const studentid = req.body.studentid;
  connection.query(
    "INSERT INTO user (id,pw,username,studentid) values (?,?,?,?)",
    [id, pw, username, studentid],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log("성공");
      }
    }
  );
});

app.post("/insertbasket", (req, res) => {
  const menu = req.body.menu;
  const price = req.body.price;
  const kcal = req.body.kcal;
  const url = req.body.url;
  connection.query(
    "INSERT INTO basket (menu,price,kcal,url,total) values (?,?,?,?,?)",
    [menu, price, kcal, url, 1],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log("성공");
      }
    }
  );
});

app.get("/selecthangcup", (req, res) => {
  connection.query("SELECT * FROM hangcup", function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      return res.send(rows);
    }
  });
});
app.get("/selectmisterramen", (req, res) => {
  connection.query("SELECT * FROM misterramen", function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      return res.send(rows);
    }
  });
});
app.get("/selecteggselent", (req, res) => {
  connection.query("SELECT * FROM eggselent", function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      return res.send(rows);
    }
  });
});

app.get("/selectuser", (req, res) => {
  connection.query("SELECT * FROM user", function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      return res.send(rows);
    }
  });
});

app.get("/selectbasket", (req, res) => {
  connection.query("SELECT * FROM basket", function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      return res.send(rows);
    }
  });
});

// app.put("/declinetotal", (req, res) => {
//   const total = req.body.total;
//   const id = req.body.id;
//   connection.query(
//     "UPDATE basket SET total = ? WHERE id = ?",
//     [total, id],
//     function (err, rows, fields) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("성공");
//       }
//     }
//   );
// });

app.delete("/deletemenu", (req, res) => {
  const id = req.body.id;
  connection.query(
    "DELETE FROM basket WHERE id = ?",
    [id],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log("성공");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Connect at http://localhost:${port}`);
});

/*table 리스트
** 가게 **
1.행컵
2.미스터라면
3.에그셀렌트

**아이디**
1.아이디 비번 이름 학번
*/
