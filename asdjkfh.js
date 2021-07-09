const express = require('express')
const app = express()
const port = 3000
//import ConvertAPI from 'convertapi';
var convertapi = require('convertapi')('2DyCbZiLbO5mhchr');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();


app.get('/:hash', (req, res) => {

convertapi.convert('png', {
    Url: 'https://ipfs.infura.io/ipfs/'+req.hash
}, 'web').then(async function(result) {
    console.log(result.response.Files[0].Url)

    const [result1] = await client.labelDetection(result.response.Files[0].Url);
const labels = result1.labelAnnotations;
console.log('Labels:');
var labResult = []

labels.forEach(label => labResult.push({"desc" : label.description, "sco" : label.score}));

res.send(labResult)
});


})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//set GOOGLE_APPLICATION_CREDENTIALS=D:\conCloud\ubtf-318418-e51ff204c76b.json
