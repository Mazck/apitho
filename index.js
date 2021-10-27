const app = require('express')();
const img = require('./tho.json');
app.get("/", function(req, res) { 
return res.json({url: img[Math.floor(Math.random() * img.length)]})
});
app.listen(80)
console.log("Server is listening on port 80...")