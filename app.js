const express = require('express')
const app = express()
const port = 3000
//import ConvertAPI from 'convertapi';
var convertapi = require('convertapi')('2DyCbZiLbO5mhchr');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

app.get('/:hash', (req, res) => {
 console.log(req.params.hash)
convertapi.convert('png', {
    Url: 'https://ipfs.infura.io/ipfs/'+req.params.hash,
    ImageWidth: '1920',
    ImageHeight: '1080'}, 
    'web').then(async function(result) {
    console.log(result.response.Files[0].Url)

    const [result1] = await client.labelDetection(result.response.Files[0].Url);
const labels = result1.labelAnnotations;
console.log('Labels:');
labels.forEach(label => console.log(label.description));
res.send(labels)
});

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
