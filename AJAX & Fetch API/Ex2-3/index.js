const path = require('path');
const http = require('http');
const express = require('express');


const app = express();

app.use(express.static(path.join(__dirname, '/views')));

app.get('/', (req, res) => {
   res.send('index.html');
});

app.get('/:area/:location', (req, res) => {
  try {
    const { area, location } = req.params;

    http.get(`http://worldtimeapi.org/api/timezone/${area}/${location}`, response => {
      response.setEncoding('utf8');
      let body = '';

      response
        .on('data', data => {
          body += data;
        })
        .on('end', () => {
          body = JSON.parse(body);
          var {datetime, timezone} = body;
          res.type('application/json').send( {datetime, timezone} );
        });
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(5000, () => {
  console.log(`App is listening at port 5000`);
});