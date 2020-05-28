const path = require('path');
const https = require('https');
const express = require('express');
const app = express();

const views = path.join(__dirname, '/views');
app.set('views', views);
app.set('view engine', 'pug');
app.use(express.json());

const apiCovid = `https://api.covid19api.com/`;


app.get('/', async(req, res) => {
  res.render('home_page');
});

app.get('/summary/:Parameter', async(req, resolve) => {
  let parameter = req.params.Parameter;
  try{
    https.get(`${apiCovid}/summary`, res => {
      res.setEncoding("utf8");  
      let body = ""; 
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
        body = JSON.parse(body);
        countries = body.Countries;
        resolve.render('index', {countries, parameter});
      });
    });
  }
  catch{
    console.log("Error during read api context");
  }
});

// http://localhost:5000/byCountryLive/03-02/03-04/Poland/Switzerland/Germany
app.get('/byCountryLive/:Date1/:Date2/:Country1/:Country2/:Country3', async(req, resolve) => {
  //console.log(req.params);
  let countriesList = [req.params.Country1, req.params.Country2, req.params.Country3]
  let data = [];
  let dates = new Map();
  for(var i = parseInt(req.params.Date1.substring(3)); i <= parseInt(req.params.Date2.substring(3)); i++){
    if (i < 10)
      dates.set(`${(req.params.Date1.substring(0, 3))}0${i}`, []);
    else
      dates.set(`${(req.params.Date1.substring(0, 3))}${i}`, []);
  }

  await Promise.all(
    countriesList.map(async (country) => {
      let requestUri = `${apiCovid}/country/${country}/status/confirmed/live?from=2020-${req.params.Date1}T00:00:00Z&to=2020-${req.params.Date2}T00:00:00Z`
      try {
        const covid = await new Promise((resolve, reject) => {
          return https.get(requestUri, (res) => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', (data) => {
              body += data;
            });
            res.on('end', () => {
              body = JSON.parse(body);
              resolve(body);
            });
            res.on('error', (err) => {
              reject(err);
            });
          });
        });
        data.push(covid);
      } 
      catch {
        console.log("Error occured");
      }
    })
  );
  data.forEach(country => country.forEach(
    date => {
      dates.get(date.Date.toString().substring(5, 10)).push(date);
    }
  ));
  dates = Object.fromEntries(dates)
    resolve.render('index', {dates, countriesList});
});


app.listen(5000, () => {
  console.log(`App is listening at port 5000`);
});