var age_count = 1; // start the age count
var age = 20; 
while (age_count < age) {
    if (age_count >= math.sqrt(age)) {
        console.log("I'm old!");
        break;
    }
    console.log(`age ${age_count}`);
    age_count++;
}
console.log(`Alyssa is ${age_count} years old`)
