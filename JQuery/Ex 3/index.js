const path = require('path');
const https = require('https');
const express = require('express');
const xml2js = require('xml2js');

const app = express();

app.use(express.static(path.join(__dirname, '.')));

const xml2jsParser = new xml2js.Parser();
const url = 'https://journals.agh.edu.pl/csci/oai?verb=GetRecord&metadataPrefix=oai_dc&identifier=';

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/search/:ids', (req, res) => {
  const ids = decodeURIComponent(req.params.ids);
  https.get(url + ids, (response) => {
    let body = '';

    response.on('data', (chunk) => {
      body += chunk;
    })
    .on('end', () => {
      console.log(body);
      xml2jsParser.parseString(body, (e, result) => {
        try {
          let data = result['OAI-PMH'].GetRecord[0].record[0].header[0];
          res.send({
            identifier: data.identifier[0],
            datestamp: data.datestamp[0],
            setSpec: data.setSpec[0],
            status: data['$'].status
          });
        } catch (err) {
          res.send({ error: "Bad request" });
        }
      });
    });
  });
});

app.listen(5000, () => {
  console.log(`App on port 5000`);
});
