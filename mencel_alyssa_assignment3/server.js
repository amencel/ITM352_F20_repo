/* 
Copied from Assignment 1 example video, info_server_Ex4.js from Lab13, and lab 14 
Alyssa Mencel's Assignment 3: Server
*/

var data = require('./public/products.js'); //load products.js file and set to variable 'data'
var products = data.products; //set variable 'products_array' to the products array in the products.js file
const queryString = require('query-string'); //read variable 'queryString' as the loaded query-string module
var express = require('express'); //load and cache express module
var app = express(); //set module to variable 'app'
var myParser = require("body-parser"); //load and cache body parser module
var filename = 'user_data.json'; // sets the variable filename to user_data.json
var fs = require('fs'); //Load file system
var session = require('express-session'); //don't forget to install//
var cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(session({
  secret: "ITM352 rocks!"}));  // way to keep it private 
  if (fs.existsSync(filename)) { //enuring that the variable filename exists
    stats = fs.statSync(filename) //gets the information from user_data.json
    console.log(filename + 'has' + stats.size + 'characters'); //recording the amount of characters in the console 
  
    data = fs.readFileSync(filename, 'utf-8');
    users_reg_data = JSON.parse(data);
  } else { 
    console.log(filename + 'does not exist!'); //if filename doesn't exist showing it in the server
  }

// Go to invoice if quantity values are good, if not redirect back to order page//
//new//
// means any path //
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path)
    next();
});

// Gennerates each page where there is a product
app.get("*/:ptype[.]html", function (request, response, next) {
  if (typeof products [request.params.ptype] == 'undefined')
  {
    next();
    return;
  }
// Referenced from professor Port // 
  str = '{}'; 
  if( typeof request.session[request.params.ptype] != 'undefined') {
    str = JSON.stringify(request.session[request.params.ptype]);
  }
  //Used template to load pages from the server, from professor 
   var pagestring = fs.readFileSync('./displayproducts.tl', 'utf-8'); 
   pagestring = `<script> var cart = ${str}; </script>` + pagestring; //so the cart shows in the console
   pagestring = `<script> var product_type = '${request.params.ptype}'; </script>` + pagestring;
   response.send(pagestring);
});

app.use(myParser.urlencoded({ extended: true })); //get data in the body

// login stuff starts here 

//processing a users's login through a post on the server 
app.post("/process_login", function (req, res) {
    var LogError = [];
    console.log(req.query);
    the_username = req.body.username.toLowerCase(); //putting the users, username as all lowercase
    if (typeof users_reg_data[the_username] != 'undefined') { //ask the object if it has matching username or leaving it as undefined
        if (users_reg_data[the_username].password == req.body.password) {
            req.query.username = the_username; 
            console.log(users_reg_data[req.query.username].name);
            req.query.name = users_reg_data[req.query.username].name
            res.redirect('/invoice.html?' + queryString.stringify(req.query));
            return; //this will redirect them to the invoice if username and password are entered correctly 
        } else { //if password is not entered correctly tells the user invalid password 
            LogError.push = ('Invalid Password');
            console.log(LogError);
            req.query.username= the_username;
            req.query.name= users_reg_data[the_username].name;
            req.query.LogError=LogError.join(';');
        }
        } else { //if username is incorrect push to the user invalid username 
            LogError.push = ('Invalid Username');
            console.log(LogError);
            req.query.username= the_username;
            req.query.LogError=LogError.join(';');
        }
    res.redirect('./login.html?' + queryString.stringify(req.query));
});
//Allows us to load in the cart page , reference from professor
app.get("/cart.html", function (request, response) {
  cartfile = `<script> var cart = ${JSON.stringify(request.session)}</script>`;
  cartfile += fs.readFileSync('./public/cart.html', 'utf-8'); // add it onto the cart page which is in public
  response.send(cartfile);

});

//creates an account on the server side 
app.post("/process_register", function (req, res) {
    qstr = req.body
    console.log(qstr);
    var errors = [];

    if (/^[A-Za-z]+$/.test(req.body.name)) { //forces the use of only letters for Full Naame
    }
    else {
      errors.push('Use Only Letters for Full Name')
    }
    // validating that it is a Full Name
    if (req.body.name == "") {
      errors.push('Invalid Full Name');
    }
    // length of full name is between 0 and 25 
  if ((req.body.fullname.length > 25 && req.body.fullname.length <0)) {
    errors.push('Full Name Too Long')
  }
  //checks the new username in all lowercase against the record of usernames
    var reguser = req.body.username.toLowerCase(); 
    if (typeof users_reg_data[reguser] != 'undefined') { //if username is not undefined gives an error that the username is taken
      errors.push('Username taken')
    }
    //requires that the username only be letters and numbers 
    if (/^[0-9a-zA-Z]+$/.test(req.body.username)) {
    }
    else {
      errors.push('Letters And Numbers Only for Username')
    }
  
    //password is min 6 characters long 
    if (req.body.password.length < 6) {
      errors.push('Password Too Short')
    }
    // check to see if the two passwords match
    if (req.body.password !== req.body.repeat_password) { 
      errors.push('Password Not a Match')
    }
    //if there are no errors this saves the user's registration in the json made with help from lab 14
    if (errors.length == 0) {
      POST = req.body
      console.log('no errors')
      var username = POST['username']
      users_reg_data[username] = {}; //make it 'users'
      users_reg_data[username].name = username;
      users_reg_data[username].password= POST['password'];
      users_reg_data[username].email = POST['email'];
      data = JSON.stringify(users_reg_data); //change to users 
      fs.writeFileSync(filename, data, "utf-8");
      res.redirect('./invoice.html?' + queryString.stringify(req.query));
    }
    //of there are errors log them in the console and direct user again to the register page
    if (errors.length > 0) {
        console.log(errors)
        req.query.name = req.body.name;
        req.query.username = req.body.username;
        req.query.password = req.body.password;
        req.query.repeat_password = req.body.repeat_password;
        req.query.email = req.body.email;

        req.query.errors = errors.join(';');
        res.redirect('register.html?' + queryString.stringify(req.query));
    }
});

// You're still on the products page
app.post("/process_cart", function (request, response) {
  let POST = request.body; // data would be packaged in the body//
  let product_type = POST["product_type"];
console.log(POST);
  if (typeof POST['submitcart'] != 'undefined') {
      var hasvalidquantities=true; // creating a varibale assuming that it'll be true// 
      var hasquantities=false // creating a variable hasquantities and assuming it will be false
      for (i = 0; i < products[product_type].length; i++) {
          
                      qty=POST[`quantity${i}`]; // set variable 'qty' to the value in quantity
                      hasquantities=hasquantities || qty>0; // If it has a value bigger than 0 then it is good//
                      hasvalidquantities=hasvalidquantities && isNonNegInt(qty);    // if it is both a quantity over 0 and is valid//     
      } 
      // if all quantities are valid, generate the invoice// 
      const stringified = queryString.stringify(POST); // converts the data in the POST to a JSON string and sets it to the variable 'stringified'
      if (hasvalidquantities && hasquantities) { // if it is both a quantity over 0 and is valid 
        // add the selectiond to the session// 
        request.session[product_type] = POST; 
        console.log(request.session);
          response.redirect("./cart.html?"+stringified); // should redirect you to the next page with the data inside it//
      }  
      else {response.send('Enter a valid quantity!')} // To let them know if wasn't a valid quantity

  }
}); 

//repeats the isNonNegInt function from the products_display.html file 
function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume that quantity data is valid 
    if (q == "") { q = 0; }
    if (Number(q) != q) errors.push('Not a number!'); //check if the string is a number
    if (q < 0) errors.push('Negative value!'); //check if value is a positive
    if (parseInt(q) != q) errors.push('Not an integer!'); //check if value is an integer
    return returnErrors ? errors : (errors.length == 0);
}

app.use(express.static('./public')); // root in the 'public' directory so that express will serve up files from here
app.listen(8080, () => console.log(`listening on port 8080`)); //run the server on port 8080 and show it in the console