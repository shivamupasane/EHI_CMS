// import the file system module
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const PORT = process.env.PORT || '4300';
const app = express();
app.set('port', PORT);
const FILE_NAME = 'contacts.json';
let contacts = {};
const readFileAsync = () => {
  
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist/contact-mgmt-system')));
app.get('/contacts', function(req, res) {
  fs.readFile(FILE_NAME, (error, data) => {
    console.log('Async Read: starting...');

    if (error) {
      // if there is an error, print it
      console.log('Async Read: NOT successful!');
      console.log(error);
      res.send({contacts: []});
    } else {
      try {
        // try to parse the JSON data
        const dataJson = JSON.parse(data);
        contacts = dataJson;
        console.log('Async Read: successful!');
        console.log(dataJson);
        res.send(contacts);
      } catch (error) {
        // else print an error (e.g. JSON was invalid)
        console.log(error);
        res.send({contacts: []});
      }
    }
  });
});
app.post('/contacts', function(req, res) {
  console.log('req', req);
  console.log('req.body', req.body);
  
  fs.writeFile(FILE_NAME,JSON.stringify({"contacts": req.body}),(err) => {
    if(err){
      console.log("error occured while saving");
      res.status(200).send({'message': "error occured while saving/deleting"});
    } else {
      console.log("contacts saved successfully");
      res.status(200).send({'message': "post is successful"});
    }
})
});
app.get('/*', (req, res) =>  res.sendFile(path.resolve('dist/contact-mgmt-system/index.html')));
app.listen(PORT, function() {
    console.log('server is running on local Host ' + PORT);
})