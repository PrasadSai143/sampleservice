const bcrypt = require('bcrypt');

async function run(){
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('1235',salt);
    console.log(hash);
    console.log(salt);
}

run();