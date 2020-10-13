day= 24;
month= "November";
year= 1999;

step1 = year % 100;

step2= parseInt(step1/4);

step3= step1 + step2;

if (month== "January") {
    step5= day + step3;
} else {
    switch (month) {
        case "February": 
            step4 = 3; break;
        case "March": 
            step4 = 3; break;
        case "April": 
            step4 = 6; break;
        case "May": 
            step4 = 1; break;
        case "June": 
            step4 = 4; break;
        case "July": 
            step4 = 6; break;
        case "August": 
            step4 = 2; break;
        case "September": 
            step4 = 5; break;
        case "October": 
            step4 = 0; break;
        case "November": 
            step4 = 3; break;
        case "December": 
            step4 = 5; break;
    }
    step6 = step4 + step3;
    step7 = step6 + day;
}

step8 = (typeof step5 !=='undefined') ? step5 : step7;

//Leap year function
isLeapYear = ( (year%4 == 0) && (year % 100 !=0) && (year % 400 ==0));

if (parseInt (year/100) == 19) {
    //1900s
    if(isLeapYear) {
        if(month == "January" || "February") {
            step9 = step8 - 1;
        } else {
            step9= step8;
        }
    } else {
            step9= step8;
        }
    } else {
        //2000s
        if(isLeapYear) {
            if(month == "January" || "February") {
                step9 = step8 - 2;
            } else {
                step9= step8 - 1;
            }  
        } else {
            step9= step8-1;
        }
    }

step10= step9 % 7;
if(step10 ==0) {
    dow = 'Sunday';
}
else if(step10 ==1) {
    dow = 'Monday';
}
else if(step10 ==2) {
    dow = 'Tuesday';
}
else if(step10 ==3) {
    dow = 'Wednesday';
}
else if(step10 ==4) {
    dow = 'Thursday';
}
else if(step10 ==5) {
    dow = 'Friday';
}
else if(step10 ==6) {
    dow = 'Saturday';
}

console.log(`${month} ${day}, ${year} was a ${dow}!`)