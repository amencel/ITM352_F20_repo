function isNonNegIntString(stringtocheck, 
    /* this function will check if stringtocheck is a non negative integer. If returnErrors is true it will return the array of reasons it is not a non-negative integer */
    returnErrors) {
        errors = []; // assume no errors at first
        if(Number(stringtocheck) != stringtocheck) errors.push('Not a number!'); // Check if string is a number value
        if(stringtocheck < 0) errors.push('Negative value!'); // Check if it is non-negative
        if(parseInt(stringtocheck) != stringtocheck) errors.push('Not an integer!'); // Check that it is an integer
        return returnErrors ? errors : (errors.length == 0);
    }
    age= 20;
    name= "Alyssa"
    attributes  =  name + ";" + age + ";" + (age+0.5)+ ";" + (0.5 -age);
    pieces = attributes.split(';');
    
    callback = function(part,i){
        console.log(`${part} is non neg integer ${isNonNegIntString(part, true).join("***")}`);
    }
    pieces.forEach(function(item,i){console.log( (typeof item == 'string' && item.length > 0)?true:false )
    });
        