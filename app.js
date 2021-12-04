const express=require("express");
const app=express();
const bodyParser=require("body-parser");

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

let items=["Buy food","Cook food","Eat food"];
let worklist=[];
app.get("/",function(req,res){
  var today=new Date();
  var options={
    weekday:"long",
    day:"numeric",
    month:"long"
  };
  let day=today.toLocaleDateString("en-US",options);
//   if(today.getDay===6||today.getDay===0){
//   day ="weekend";
// }  else{
//     day ="weekday";
//   }
    res.render('list',{ListTitle:day,newListItem:items});
});
app.post("/",function(req,res){
  //console.log(req.body);
  let  item=req.body.schedule;
if(req.body.list==="Work List"){
   worklist.push(item);
   res.redirect("/work");
}else{
  items.push(item);
    res.redirect("/");
}

  //res.render('list',{newListItem:item});
//console.log(req.body.schedule);
//  app.sendFile(__dirname+"/list.ejs");
});
app.get("/work",function(req,res){
  res.render('list',{ListTitle:"Work List",newListItem:worklist});
});
app.post("/work",function(req,res){
  let item=req.body.schedule;
  worklist.push(item);
  res.redirect("/work");
});

app.get("/about",function(req,res){
  res.render("about");
})
app.listen(3000,function(){
  console.log("Server is running on port 3000.");
});
