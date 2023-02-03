const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

app.use('/static', express.static(path.resolve(__dirname,"static")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve("index.html"));
});

app.listen(process.env.PORT,()=> { 
    console.log(process.env.PORT,'server is running')
})