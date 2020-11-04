/* 
Copied from Assignment 1 example video and info_server_Ex4.js from Lab13
Alyssa Mencel's Assignment 1: Server
*/

var data = require('./public/products.js'); //load products.js file and set to variable 'data'
var products_array = data.products; //set variable 'products_array' to the products array in the products.js file
const queryString = require('query-string'); //read variable 'queryString' as the loaded query-string module
var express = require('express'); //load and cache express module
var app = express(); //set module to variable 'app'
var myParser = require("body-parser"); //load and cache body parser module

app.all('*', function (request, response, next) { //for all request methods...
    console.log(request.method + ' to ' + request.path); //write in the console the request method and its path
    next(); //move on
});

app.use(myParser.urlencoded({ extended: true })); //get data in the body

app.post("/process_purchase", function (request, response) { //process the quantity_form when the POST request is initiated to form a response from the values in the form
    let POST = request.body; // data would be packaged in the body

    if (typeof POST['submitPurchase'] != 'undefined') { //if the POST request is not undefined...
        var validAmount = true; // creating a variable 'validAmount' and assuming it will be true
        var amount = false; // creating a variable 'amount' and assuming it will be false

        for (i = 0; i < products_array.length; i++) { //for any given tour...
            qty = POST[`quantity_textbox${i}`]; //set variable 'qty' to the value in quantity_textbox

            if (qty > 0) {
                amount = true; // If it has a value greater than 0 then it is ok
            }

            if (isNonNegInt(qty) == false) { //if isNonNegInt is false then it is an invalid input, so...
                validAmount = false; // it is not a valid amount
            }

        }

        const stringified = queryString.stringify(POST); //converts the data in POST to a JSON string and sets it to variable 'stringified'

        if (validAmount && amount) { //if it is both a quantity over 0 and is valid...
            response.redirect("./invoice.html?" + stringified); // redirect the page to the invoice page with the stringified path in the query string
        }

        else { response.redirect("./index.html?" + stringified) } //if there is invalid input, it re-routes back to the index page with the stringified path in the query string

    }

});

//repeats the isNonNegInt function from the index.html file because there is no relation between the index.html page and server, so it needs to be redefined here for the server to process the form and know what to do if there is invalid data inputs in the quantity_textbox fields
function isNonNegInt(q, return_errors = false) {
    errors = []; // assume no errors at first
    if (q == '') q = 0; // handle blank inputs as if they are 0
    if (Number(q) != q) errors.push('<font color="red">Not a number</font>'); // Check if string is a number value
    if (q < 0) errors.push('<font color="red">Negative value</font>'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('<font color="red">Not a full tour</font>'); // Check that it is an integer
    return return_errors ? errors : (errors.length == 0);
}

app.use(express.static('./public')); // root in the 'public' directory so that express will serve up files from here
app.listen(8080, () => console.log(`listening on port 8080`)); //run the server on port 8080 and write it in the console