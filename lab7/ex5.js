// -- Price depends on quantity
quantity =  25;

if ( quantity >0 && quantity <10 ) {
    price = 100; 
} 
else if ( quantity >= 10 && quantity <25) {
            price = 50 ; 
} 
else if ( quantity >= 25) {
            price = 35;
} 
else {
    price = "no purchase" ; 
}

console.log( quantity + ' products will cost $' + price + ' each.' ) ;

/*extra credit*/
function getMonthString(num)
    {
      var month;
      var num_days;
      switch(num)
      {
        case 0:
          month="January";
          num_days= 31;
          break;
        case 1:
          month="February";
          num_days= 28;
          break;
        case 2:
          month="March";
          num_days= 31;
          num_days= 31;
          break;
        case 3:
          month="April";
          num_days= 30;
          break;
        case 4:
          month="May";
          num_days= 31;
          break;
        case 5:
          month="June";
          num_days= 30;
          break;
        case 6:
          month="July";
          num_days= 31;
          break;
        case 7:
          month="August";
          num_days= 31;
          break;
        case 8:
          month="September";
          num_days= 30;
          break;
        case 9:
          month="October";
          num_days= 31;
          break;
        case 10:
          month="November";
          num_days= 30;
          break;
        case 11:
          month="December";
          num_days= 31;
          break;
        default:
          month="-1";
      }
      return month;
    }
    theDate = new Date();
    document.write("The month is ",getMonthString(theDate.getMonth()));
