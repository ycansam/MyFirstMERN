const express = require('express');
const router = express.Router();
const  jwt = require('jsonwebtoken')


// todas las tareas
router.post('/', async(req, res) => {

    const user = {id: 3};
    const token = jwt.sign({user}, 'my_secret_key');
    res.json({
        token
    });
})


module.exports = router;