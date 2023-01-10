const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();

const app = express();

app.use('/static', express.static(path.resolve(__dirname,"static")));

console.log(path.resolve(__dirname,"static"))

app.get("/*", (req, res) => {
    res.sendFile(path.resolve("index.html"));
});


app.listen(process.env.PORT || 3000,()=> { 
    console.log('server is running')
})

