const express = require('express');
const session = require('express-session');
const path = require('path');
const routes = require("routes");
const url = require('url');
const mysql = require('mysql');
const http = require('http');
const bodyParser = require('body-parser');
const multer = require('multer'); 
const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
    cb(null, (file.filename = file.originalname));
    }
    });

var upload = multer({ storage: storage });

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.set("port",process.env.PORT || 3000);
app.set("views", path.join(__dirname,'views'));
app.set("view engine",'ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname,"views")));
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
var sess;
var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:'',
    database:"bookstore"
});

app.get('/',function(req,res){
    
    var sql = "select * from `product`";
    con.query(sql,function(err,result){
       
    res.render("index",{data:result}); 
    });


});

app .get("/product/:id",function(req,res){
     var sql = "select * from `product` where `id` = '"+req.params.id+"'";
     
     con.query(sql,function(err,result){
        if(err) throw err;
        if(result.length){
            var sql2 = "select * from `product`";
            con.query(sql2,function(err,resl){
                if(err) throw err;
                if(result.length){
                    res.render("product",{data:result,product:resl});  
                }
                
            });
            
        }
     });
});
app.get('/admin',function(req,res){
    sess=req.session;
    res.render("admin",{data:""});
});

app.get('/delete/:id',function(req,res){
        var sql = "delete from product where `id` = '"+req.params.id+"'";
        con.query(sql,function(err,result){
               if(err) throw err;
            // sess.userid=result[0].id;
            //    var sql2 = "select * from product where `added_by` = '"+sess.userid+"'";
            //    con.query(sql2,function(err,result){
                res.send("Product Deleted Succesfully");
            //    });
               
               
        });
});


app.get("/delete-product/:id",function(req,res){
    var sql = "delete from product where `id` = '"+req.params.id+"'";
    con.query(sql,function(err,result){
           if(err) throw err;
            res.send("Product Deleted Succesfully");
    });
});

app.get("/delete-user/:id",function(req,res){
    var sql = "delete from user where `id` = '"+req.params.id+"'";
    con.query(sql,function(err,result){
           if(err) throw err;
            res.send("User Deleted Succesfully");
    });
});

app.post('/update-product',upload.single("file"),function(req,res){
    // console.log(req.body.id);
    var sql = "update product set `name` = '"+req.body.name+"',`description` = '"+req.body.desc+"',`price`='"+req.body.price+"',`figure` = '"+req.file.filename+"' where `id` = '"+req.body.id+"'";

    con.query(sql,function(err,result){
         if(err) throw err;
         
         var sql2 = "select * from product where `id` = '"+req.body.id+"'";
         con.query(sql2,function(err,result){
            if(err) throw err;            
            res.render("update",{data:result,resp:"Product Updated Succesfully!"});
         });
    });

});

app.post("/checkout/",function(req,res){
		var id = req.body.id;
		// console.log(id);
		var sql = "select * from product where `id` = '"+id+"'";
			con.query(sql,function(err,result){
				if(err) throw err;
				
				if(result){
					res.render("checkout",{data:result});	
				}
				
			});
		
});

app.post("/order",function(req,res){
       var sql = "insert into orders(id,product_id,product_name,product_price,quantity,cust_name,phone,landmark,city,zipcode,address_type) values('','"+req.body.product_id+"','"+req.body.product_name+"','"+req.body.product_price+"','"+req.body.product_count+"','"+req.body.name+"','"+req.body.phone+"','"+req.body.landmark+"','"+req.body.city+"','"+req.body.zip+"','"+req.body.address_type+"')";
       
       con.query(sql,function(err,result){
           if(err) throw err;
            
           if(result){
                res.render("confirmation",{data:result.insertId});
           }
       })
});

app.get('/update/:id',function(req,res){
    console.log(req.params.id);

    var sql = "select * from product where `id` = '"+req.params.id+"'";
    con.query(sql,function(err,result){
            if(err) throw err;
            res.render("update",{data:result,resp:""});
        
        });
});
/* app.post('/login-admin',function(req,res){
    sess = req.session;
    var sql = "select * from user where `email` = '" +req.body.email+ "' and `password` = '"+req.body.password+"'";
    
    con.query(sql,function(err,result){        
        if (err) throw err;
        if(result.length!= 0){
            sess.email=req.body.email;
            sess.name=result[0].username;
            sess.userid=result[0].id;
            sess.profile=result[0].profile_picture;

            if(req.body.email == "admin@gmail.com" && req.body.password == "admin"){

                   var sql = "select * from user";
                   con.query(sql,function(err,result){
                       if(err) throw err;

                       if(result){
                           var sql2 = "select * from product";
                           con.query(sql2,function(err,resl){
                            res.render("admin-dashboard",{user:result,product:resl}); 
                           });
                       }
                    
                   });
                }
            var sql2 = "select * from product where `added_by` = '"+sess.userid+"'";
            con.query(sql2,function(err,result){
                if(err) throw err;
        
                if(result.length!=0){
                    res.render("dashboard",{product:result,data:[sess.name,sess.profile],resp:"",error:""});
                }
            });
            // res.redirect("admin/dashboard");  
            // res.render("dashboard",{}); 
            }else{
            res.render("admin",{data:"Username & Password did not Match! Please Try Again"});
        }
    });
});
 */
 
 
 
 app.post('/login-admin',function(req,res){
    sess = req.session;
    var sql = "select * from user where `email` = '" +req.body.email+ "' and `password` = '"+req.body.password+"'";
    
    con.query(sql,function(err,result){        
        if (err) throw err;
        if(result.length!= 0){
            sess.email=req.body.email;
            sess.name=result[0].username;
            sess.userid=result[0].id;
            sess.profile=result[0].profile_picture;

            if(req.body.email == "admin@gmail.com" && req.body.password == "admin"){

                   var sql = "select * from user";
                   con.query(sql,function(err,result){
                       if(err) throw err;

                       if(result){
                           var sql2 = "select * from product";
                           con.query(sql2,function(err,resl){
							   if(resl){
								   var sql3="select * from bookorder";
								   con.query(sql3,function(err,res2){
									   if(res2){
										   var sql4="select * from feedback";
										   con.query(sql4,function(err,res3){
											   
											   
											   
											   if(res3)
											   {
												   
												   
												   con.query("select * from contact",function(err,res4)
												   {
													   console.log(res4);
											   res.render("admin-dashboard",{user:result,product:resl,orders:res2,feed:res3,cnt:res4});
											   											   
												   });
											   }
										   });
										   
									   }
									   
								   });
								   
							   }
                        
                            //res.render("admin-dashboard",{user:result,product:resl}); 
                           });
                       }
					   
                    
                   });
                }else{
            var sql2 = "select * from product  where `added_by` = '"+sess.userid+"'";
            con.query(sql2,function(err,result){
                if(err) throw err;
        
                if(result.length!=0){
					
					var sql3="select * from orders where cust_name='"+req.body.email+"'";
					console.log(sql3);
					con.query(sql3,function(err,res33)
					{
						
                    res.render("dashboard",{product:result,data:[sess.name,sess.profile],resp:"",error:"",ord:res33});
					});
                }if(result.length==0){
					 res.render("dashboard",{product:"",data:[sess.name,sess.profile],resp:"",error:""});
					 
				}
			
            });
				} 
            // res.redirect("admin/dashboard");  
            // res.render("dashboard",{}); 
            }else{
            res.render("admin",{data:"Username & Password did not Match! Please Try Again"});
        }
    });
});

 
 
 
app.get("/admin/dashboard",function(req,res){  
    sess=req.session;

    if(sess.email === null){
        res.redirect("/");
    }

    var sql2 = "select * from product where `added_by` = '"+sess.userid+"'";
    con.query(sql2,function(err,result){
        if(err) throw err;

        if(result.length!=0){
			var sql3="select * from orders where cust_name='"+sess.userid+"'";
			
			con.query(sql3,function(err,res3)
			{
				
            res.render("dashboard",{product:result,resp:"",error:"",ord:res3});
			});
        }
    });

    // res.render("dashboard",{data:sess.name,resp:"",error:""});
});






app.get("/delete-orders/:id",function(req,res){
    var sql = "delete from bookorder where `id` = '"+req.params.id+"'";
    con.query(sql,function(err,result){
           if(err) throw err;
            res.send("Book Order Deleted Succesfully");
    });
});
app.get("/delete-feedback/:id",function(req,res){
    var sql = "delete from feedback where `id` = '"+req.params.id+"'";
    con.query(sql,function(err,result){
           if(err) throw err;
            res.send("Feedback Deleted Succesfully");
    });
});
app.post("/order",function(req,res){
	

	
       var sql = "insert into orders(product_id,product_name,product_price,quantity,cust_name,phone,landmark,city,zipcode,address_type) values('"+req.body.product_id+"','"+req.body.product_name+"','"+req.body.product_price+"','"+req.body.product_count+"','"+req.body.name+"','"+req.body.phone+"','"+req.body.landmark+"','"+req.body.city+"','"+req.body.zip+"','"+req.body.address_type+"')";
       console.log(sql);
       con.query(sql,function(err,result){
           if(err) throw err;
            
           if(result){
                res.render("confirmation",{data:result.insertId});
           }
       })
});


app.get("/buybook",function(req,res){
        res.render("buybook",{data:""});
});
app.get("/feedback",function(req,res){
        res.render("feedback",{data:""});
});


app.get("/about",function(req,res){
        res.render("about");
});


app.get("/contact",function(req,res){
        res.render("contact");
});


app.post("/contact1",function(req,res){
	
	var sql="INSERT INTO `contact`(`name`, `email`, `subject`, `message`) VALUES ('"+req.body.Name+"','"+req.body.Email+"','"+req.body.Subject+"','"+req.body.message+"')";
	con.query(sql,function(err,result){
		
		if(err) throw err;
		res.send(" Succesfully!  Send");
	});
	
});




app.post("/buybook_insert",function(req,res){
	
	var sql="INSERT INTO `bookorder`(`bookname`, `address`, `phone`, `email`, `shop_name`, `city`) VALUES ('"+req.body.bookname+"','"+req.body.address+"','"+req.body.phone+"','"+req.body.email+"','"+req.body.shop_name+"','"+req.body.city+"')";
	con.query(sql,function(err,result){
		
		if(err) throw err;
		res.render("buybook",{data:"Order Placed Succesfully!"});
	});
	
});
app.post("/feedback_insert",function(req,res){
	
	var sql="INSERT INTO `feedback`( `name`, `email`, `address`, `phone`, `city`) VALUES ('"+req.body.name+"','"+req.body.email+"','"+req.body.address+"','"+req.body.phone+"','"+req.body.city+"')";
	con.query(sql,function(err,result){
		
		if(err) throw err;
		res.render("feedback",{data:"Feedback submit Succesfully!"});
	});
})












app.get("/register",function(req,res){
        res.render("register",{data:""});
});
app.post('/search',function(req,res){
  var keyword = req.body.keyword;
    var sql = "select * from product where `name` like '"+keyword+"%' ";

    console.log(sql);

    con.query(sql,function(err,result){
      if(err) throw err;
      console.log(result);
        res.send(result);
    });
});
app.post('/create-account',upload.single('file'),function(req,res){

        //console.log(req.file.filename);
        var name =   req.body.username;
        var sql = "insert into user(id,username,phone,email,password,address,city,country,profile_picture) values('','"+req.body.username+"','"+req.body.phone+"','"+req.body.email+"','"+req.body.password+"','"+req.body.address+"','"+req.body.city+"','"+req.body.country+"','"+req.file.filename+"')";

        con.query(sql,function(err,result){
            if (err) throw err;
            sess=req.session;   
            if(result.length!= 0){
              sess.name = name;  
             //res.render("dashboard",{data:sess.name});  
res.send("Successfully registered");			 
            }else{
                res.render("register",{data:"There was some Error in Creating Account Please Try Again"});
            }
            // sess.email =req.body.email 
        });
});
var resp="";
app.post('/upload-product',upload.single('file'),function(req,res){
    sess=req.session;
    var sql = "insert into product(id,name,description,price,figure,added_by,status) values('','"+req.body.name+"','"+req.body.desc+"','"+req.body.price+"','"+req.file.filename+"','"+sess.userid+"','New')";        
    console.log(sess.userid);
    console.log(sql);
    con.query(sql,function(err,result){
            if (err) throw err;

            if(result.length!=0){
			
			con.query("select * from  product",function(err,row1)
			
			{
                res.render("dashboard",{error:"",resp:"Book Added Succesfully!",data:'',product:row1});
				
				});
            }else{
                res.render("dashboard",{resp:"",error:"There was some problem in adding book! Please try again."});
            }
    });

    var sql2 = "select * from product where `added_by` = '"+sess.userid+"'";
    con.query(sql2,function(err,result){
        if(err) throw err;

        if(result.length!=0){
            res.render("dashboard",{product:result});
        }
    });

});
app.get("/logout",function(req,res){
    sess=req.session;
    // req.session = null;
    req.session.destroy(function(err){
        console.log(req.session);
		if(err){
			console.log(err);
		}
		else
		{
			res.redirect('/');
		}
	});
});

http.createServer(app).listen(app.get('port'),function(){
    console.log("Express Server Listening on "+app.get('port'));
}); 
