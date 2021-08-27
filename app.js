const express = require("express");
const sass = require("node-sass");
const path = require("path");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(__dirname));

app.post("/api", (req, res) => {
    res.json({ 
        status: "success", 
        message: "Thank you. You are now subscribed." 
    });
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
