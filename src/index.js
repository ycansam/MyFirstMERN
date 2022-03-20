const express = require("express");
const { type } = require("express/lib/response");
const morgan = require("morgan"); // Obtiene mensajes de consola del cliente a la consola del servidor
const path = require("path");
const  jwt = require('jsonwebtoken')
// connection to database
const { mongoose } = require("./database");

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/tasks", require("./routes/tasks.routes"));
app.use("/api/login", require("./routes/login.routes"));

app.get("/api/protected", ensureToken, (req, res) => {
    jwt.verify(req.token, 'my_secret_key',(err, data) => {
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                text: "protected",
                data
              });
        }
    })
 

});

function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    console.log(bearerHeader);
    if( typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}

// Static files
// path.join une las rutas independientemente del sistema operativo en el que estemos
app.use(express.static(path.join(__dirname, "public")));

// Starting server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
