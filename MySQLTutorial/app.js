const express = require('express');

const mysql = require('mysql');

const app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
   database: "nodemysql"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//create dabase
app.get('/createdb', (req, res)=>{
    let sql = 'create database nodemysql';
    con.query(sql, (err, result)=>{
        if(err) throw err
        console.log(result);
        res.send('database created...')
    });
});

//create posts table
app.get('/createpoststable', (req,res) => {
    let sql = 'create table posts (id int auto_increment,title varchar(255), body varchar(255), PRIMARY KEY (id))';
    con.query(sql, (err, result)=>{
        if(err) throw err
        console.log(result);
        res.send('posts table created...')
    });
});

//insert post 1
app.get('/addpost1', (req,res) => {
    let post = {title:'post1', body: 'This is post number one'};
    let sql = 'insert into posts SET?';
    let query = con.query(sql, post, (err, result)=>{
      if(err) throw err
      console.log(result);
      res.send('post 1 added...')
    });
});

//insert post 2
app.get('/addpost2', (req,res) => {
    let post = {title:'post2', body: 'This is post number two'};
    let sql = 'insert into posts SET?';
    let query = con.query(sql, post, (err, result)=>{
      if(err) throw err
      console.log(result);
      res.send('post 2 added...')
    });
});

//Select posts
app.get('/getposts', (req,res) => {
    let sql = 'Select * from posts';
    let query = con.query(sql, (err, results)=>{
      if(err) throw err
      console.log(results);
      res.send('Posts fetched...')
    });
});

//Select single post
app.get('/getpost/:id', (req,res) => {
    let sql = `Select * from posts where id = ${req.params.id}`;
    let query = con.query(sql, (err, result)=>{
      if(err) throw err
      console.log(result);
      res.send('Post fetched...')
    });
});

//update post
app.get('/updatepost/:id', (req,res) => {
  let newTitle = 'Updated title';
    let sql = `Update posts SET title = '${newTitle}' where id = ${req.params.id}`;
    let query = con.query(sql, (err, result)=>{
      if(err) throw err
      console.log(result);
      res.send('Post updated...')
    });
});

//update post
app.get('/deletepost/:id', (req,res) => {
    let sql = `delete from posts where id = ${req.params.id}`;
    let query = con.query(sql, (err, result)=>{
      if(err) throw err
      console.log(result);
      res.send('Post deleted...')
    });
});


app.listen('3000', () =>{
    console.log('Server started on port 3000');
});
