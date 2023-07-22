const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const mongoose = require('mongoose');
//const dotenv = require('dotenv');
//dotenv.config();
const app = express();
var Person = require('./person');

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.listen(5000, function(){
    console.log('listening on 5000')
});

//몽고db 접속
mongoose
  .connect('mongodb://test:1234@mongo:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

//플래닛스케일 mysql 접속
const con_PlanetScale = mysql.createConnection('mysql://udlkz7vngtj42f3iafow:pscale_pw_GAPoiyRTVLqh7bb3mSQimJNpRVCiFugQZxB8joQCdDi@aws.connect.psdb.cloud/testdb?ssl={"rejectUnauthorized":true}')
//const connection = mysql.createConnection('mysql://t3sxcg5ns4lhr1644seg:pscale_pw_SyWrR7irxn50PX9x0OiFcG5JgMv0dU0Mv3Gl6yZ2rm9@aws.connect.psdb.cloud/testdb?ssl={"rejectUnauthorized":true}')

//mysql 컨테이너 접속
const con_mysql = mysql.createPool({
        host: 'mysql_serv', // the host name MYSQL_DATABASE: node_mysql
        user: 'root', // database user MYSQL_USER: MYSQL_USER
        password: 'pass1234', // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
        database: `testdb` // database name MYSQL_HOST_IP: mysql_db
});

app.get('/', function(req ,res){
    var sql1_result = [];
    const SelectQuery = " SELECT * FROM today";
    con_mysql.query(SelectQuery, (err, result) => {
        sql1_result[0]=result;
        //res.send(result)
        
        const SelectQuery2 = " SELECT * FROM today";
        con_PlanetScale.query(SelectQuery2, (err, result2) => {
            sql1_result[1]=result2;
            
            Person.find()
            //Person.find({ id: 3 })
            .then(items => {
               sql1_result[2]=items;
               res.send(sql1_result);
            })
            .catch(err => res.status(404).json({ msg: 'No items found' }));
            //connection.end();
        })
        //db.end();
    })
})

//app.post("/insert", (req, res) => {
app.get("/insert", (req, res) => {    
    //const bookName = req.body.setBookName;
    //const bookReview = req.body.setReview;
    const count = 3;
    const name = "이기자";
    const InsertQuery = "INSERT INTO today (count, name) VALUES (?, ?)";
    con_mysql.query(InsertQuery, [count, name], (err, result) => {
        if (err) {
            console.log(err);
            //return res.status(500).send(err);
        }
        console.log(result);
        //return res.status(200).send(result);
    });

    con_PlanetScale.query(InsertQuery, [count, name], (err, result) => {
        if (err) {
            console.log(err);
            //return res.status(500).send(err);
        }
        console.log(result);
        //return res.status(200).send(result);
    });

    var person = new Person();
    person.id = 4;
    person.name = "홍길동";
    person.count = 23;
    person.save();

    return res.send("ok");
});

//app.delete("/delete/:stuId", (req, res) => {
app.get("/delete/:stuId", (req, res) => {    
    const stuId = req.params.stuId;
    const DeleteQuery = "DELETE FROM today WHERE id = ?";
    con_mysql.query(DeleteQuery, stuId, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        console.log(result);
        return res.status(200).send(result);
    });
});

//app.put("/update/:stuId", (req, res) => {
app.get("/update/:stuId", (req, res) => {    
    const name = "성춘향";
    const stuId = req.params.stuId;
    const UpdateQuery = "UPDATE today SET name = ? WHERE id = ?";
    con_mysql.query(UpdateQuery, [name, stuId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        console.log(result);
        return res.status(200).send(result);
    })
});