const mongoose = require('mongoose');
const uri = "mongodb+srv://root:root@tasks.as1fc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri)
    .then(db => console.log(' DB CONNECTED'))
    .catch(err => console.error(error));

module.exports = mongoose;