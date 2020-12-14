<script src="./products.js" type="text/javascript"></script>

<script>
    // taken from lab 12 order_page.html and refrenced from the assignment 1 examples
    function isNonNegInt(q, return_errors = false) { //this function checks if values are postitive, integer, whole values 
        errors = []; // assume no errors at first
        if (q == '') q = 0; //sets blank inputs to the quantitiy of 0 
        if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); // Check if string is a number value
        else if (q < 0) errors.push('<font color="red">Negative value!</font>'); // Check if the string is non-negative
        else if (parseInt(q) != q) errors.push('<font color="red">Not a full value!</font>'); // Check that it is an integer
        return return_errors ? errors : (errors.length == 0);
    }
    function checkQuantityTextbox(theTextbox) {
        errs = isNonNegInt(theTextbox.value, true);
        if (errs.length == 0) errs = ['You want:']; //changes it to say you want ___
        if (theTextbox.value.trim() == '') errs = ['Quantity'];
        document.getElementById(theTextbox.name + '_label').innerHTML = errs.join(", ");
    }
    window.onload = function () {
        let params = (new URL(document.location)).searchParams; // get the query string which has the form data
        // form was submitted so check that quantities are valid then redirect to invoice if ok.
        if (params.has('submitPurchase')) {
            has_errors = false; // assume quantities are valid from the start
            total_qty = 0; // need to check if something was selected so we will look if the total > 0
            //For every product in the array display its image and name and list price
            for (i = 0; i < products[product_type].length; i++) {
                if (params.has(`quantity${i}`)) {
                    a_qty = params.get(`quantity${i}`);
                    // make textboxes sticky in case of invalid data
                    product_main_display[`quantity${i}`].value = a_qty;
                    total_qty += a_qty;
                    if (!isNonNegInt(a_qty)) {
                        has_errors = true; // invalid quantity
                        checkQuantityTextbox(product_main_display[`quantity${i}`]); // show where the error is
                    }
                }
            }
            // Now respond to errors or redirect to invoice if all is ok
            if (has_errors) {
                alert("Please enter only valid quantities!");
            } else if (total_qty == 0) { // no quantity selections
                alert("Please select some quantities!");
            } else { // all good to go!
                window.location = `./cart.html${document.location.search}`; //Redirects itself to invoice
                window.stop;
            }
        }
    }
</script>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Sustainable Outfitters' Products</title>
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
<body>
<!--creates the navigation bar-->
    <ul>
        <li style="float:left"><a href="./index.html">Sustainable Outfitters</a></li>
        <li><a href="./cart.html">Shopping Cart</a></li>
        <li class="dropdown"><a class="dropbtn" href="./products_display.html">Products</a>
            <div class="dropdown-content">
                <a href="bath.html">Bath</a>
                <a href="home.html">Home</a>
                <a href="kitchen.html">Kitchen</a>
                <a href="kits.html">Kits</a>
                <a href="extra.html">Extra</a>
              </div>
        </li>
        <li><a href="./login.html">Login</a></li>
        <li><a href="./register.html">Register</a></li>
      </ul>
<!--creates the product display page with product name, image, price and section for quantity-->
    <form name="product_main_display" action="process_cart" method="POST">
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
            <input type="submit" value="Add to cart" name="submitcart" onclick="add_to_cart" class=btn>
        </footer>
    </form>
</body>

</html>