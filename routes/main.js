const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

let list_data = [];
let User;
//loading our page and for redirecting to it...
router.get("/", (req, res) => {
  res.render("pages/index.ejs", { p: "login" });
  if (User) {
    User["isLoggedIn"] = "false";
    fs.writeFile("public/datas.json", JSON.stringify(list_data), (err) => {
      if (err) console.log(err.message);
    });
  }
});
//signup page...
router.get("/signUp", (req, res) => {
  res.render("pages/index.ejs", { p: "signUp" });
});


//Creating Our New User...
router.post("/signUp", (req, res) => {
  let same_user = list_data.find((user) => user.username === req.body.username);

  if (same_user) {
    res.sendStatus(400);
  } else {
    let data = req.body;
    //creating our is logged in....
    data["isLoggedIn"] = "false";
    //main list of users...
    list_data.push(data);
    //writing it in our json file...
    fs.writeFile("public/datas.json", JSON.stringify(list_data), (err) => {
      if (err) console.log(err.message);
    });

    res.send("Your Account Was Created Successfully.");
  }
});

//checking that if his username and password is true or not for logging in
router.post("/login", (req, res) => {
  User = list_data.find((user) => user.username === req.body.username);

  if (User && User.password === req.body.password) {
    User["isLoggedIn"] = "true";
    fs.writeFile("public/datas.json", JSON.stringify(list_data), (err) => {
      if (err) console.log(err.message);
    });

    res.send("Logged in Successfully.");
  } else {
    res.sendStatus(400);
  }
});
//showing his profile page...
router.get("/profile", (req, res) => {
    if(!User){
        res.sendStatus(400)
    }
  res.render("pages/index.ejs", { p: "profile", User });
});
//updating his informations...
router.put('/profile',(req,res)=>{
if(req.body.username){
  let same_username=list_data.find((user)=>user.username===req.body.username)
  if(same_username){
    res.sendStatus(400)

  }
  else{
    
    User["username"]=req.body.username
    res.sendStatus(200)
  }
}
else if(req.body.password){
    User["password"]=req.body.password
    User['isLoggedIn']="false"
    res.sendStatus(206)
}

else if(req.body.email){
  User["email"]=req.body.email
  res.sendStatus(200)
}

else if(req.body.gender){
  User["gender"]=req.body.gender
  res.sendStatus(200)
}
fs.writeFile("public/datas.json", JSON.stringify(list_data), (err) => {
    if (err) console.log(err.message);
  });


})

module.exports = router;
