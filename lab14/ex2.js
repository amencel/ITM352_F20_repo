var fs = require('fs');

var user_data_filename = 'user_data.json';

//check if file exists before reading it 
if( fs.existsSync(user_data_filename)) {
    stats= fs.startSync(user_data_filename);
    console.log(`user_data.json has ${stats['size']} characters `);
var data = fs.readFileSync(user_data_filename, 'utf-8');
user_reg_data = JSON.parse(data);
if (typeof user_reg_data ['itm 352'] !='undefined') { console.log (users_rega_data ['itm352']['password']=='xxx');
}
} else {
    console.log(`ERR: ${user_data_filename} does not exist!!!`)
};

