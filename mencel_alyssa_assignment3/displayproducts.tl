<script src="./products.js" type="text/javascript"></script>

<script>
    //Referenced from assignment 1 examples
    function isNonNegInt(q, return_errors = false) {
        errors = []; // assume no errors at first
        if (q == '') q = 0; // handle blank inputs as if they are 0
        if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); // Check if string is a number value
        else if (q < 0) errors.push('<font color="red">Negative value!</font>'); // Check if it is non-negative
        else if (parseInt(q) != q) errors.push('<font color="red">Not an integer!</font>'); // Check that it is an integer
        return return_errors ? errors : (errors.length == 0);
    }
    function checkQuantityTextbox(theTextbox) {
        errs = isNonNegInt(theTextbox.value, true);
        if (errs.length == 0) errs = ['You want:'];
        if (theTextbox.value.trim() == '') errs = ['Quantity'];
        document.getElementById(theTextbox.name + '_label').innerHTML = errs.join(", ");
   }
   //Add to session, from the amount in the cart
   function add_to_cart (i) {
    var incart = product_main_display[`quantity${i}`].value; 
    if (isNonNegInt(incart) = true) { 
        sessionStorage['products${i}'] = incart;
        console.log(incart) 
    } 
    


   }

    window.onload = function () {
        let params = (new URL(document.location)).searchParams; // get the query string which has the form data
        // form was submitted so check that quantities are valid then redirect to invoice if ok.
        if (params.has('submitPurchase')) {
            has_errors = false; // assume quantities are valid from the start
            total_qty = 0; // need to check if something was selected so we will look if the total > 0
            //For every product in the array, write the product number, display its image and name, and list price
            for (i = 0; i < products.length; i++) {
                if (params.has(`quantity${i}`)) {
                    a_qty = params.get(`quantity${i}`);
                    // make textboxes sticky in case of invalid data
                    product_form[`quantity${i}`].value = a_qty;
                    total_qty += a_qty;
                    if (!isNonNegInt(a_qty)) {
                        has_errors = true; // oops, invalid quantity
                        checkQuantityTextbox(product_form[`quantity${i}`]); // show where the error is
                    }
                }
            }
            // Now respond to errors or redirect to invoice if all is ok
            if (has_errors) {
                alert("Please enter only valid quantities!");
            } else if (total_qty == 0) { // no quantity selections, just give a general alert
                alert("Please select some quantities!");
            } else { // all good to go!
                window.location = `./login.html.html${document.location.search}`; //Redirects itself
                window.stop;
            }
        }
    }
</script>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Sustainable Outfitters</title>
<body>
    <div class="topnav"> 
        <a class="active" href="./index.html">Home</a>
        <a href="./login.html">Log In</a>
        <script>
        for (ptype in products) {
            if (ptype == product_type) {
                continue;
            }
            document.write(`<a href="./${ptype}.html">${ptype.charAt(0).toUpperCase() + ptype.slice(1)}</a>`);
        }
        </script>
        
    
      </div>


    <form name="product_main_display" action="process_cart" method="POST">
        <header>
            <h1>Sustainable Outfitters</h1>
            <link rel="stylesheet" href="./stylesheets/navbar.css">
            <link rel="stylesheet" href="./stylesheets/products-style.css">
            <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Oswald">
        <style>
        body {
        text-align: center;
        font-family: 'Oswald', 'Sans';
        color: lightseagreen;
        }
    </style>
        </header>
        <div class="row">
            <div class="column"></div>
            <div class="column"></div>
        </div>
        <div>

            <main>
                <script>
                    document.write(`<input type="hidden"  name="product_type" value = "${product_type}">`);
                    for (i = 0; i < products[product_type].length; i++) {
                        document.write(`
                                <section class="item">
                                    <h2>${products[product_type][i].name}</h2>
                                    <br><img src="${products[product_type][i].image}">
                                    <p>$${products[product_type][i].price}</p>
                                    <label id="quantity${i}_label"}">Quantity</label>
                                    <input type="text" placeholder="0" name="quantity${i}" 
                                    onkeyup="checkQuantityTextbox(this);">
                                    
                
                                </section>
                            `);
                            if (typeof cart[`quantity${i}`] != 'undefined' ) {
                                product_main_display[`quantity${i}`].value = cart[`quantity${i}`];
                            }
                    }    
                </script>
            </main>
        </div>
        <footer>
            
            <input type="submit" value="Add to cart" name="submitcart" onclick="add_to_cart">
        </footer>
    </form>
</body>

</html>