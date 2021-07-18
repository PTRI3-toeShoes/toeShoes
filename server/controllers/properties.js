const fetch = require('node-fetch');
const { URL, URLSearchParams } = require('url');
const { quantileSorted } = require('d3');
const { maxHeaderSize } = require('http');
const { features } = require('process');

const middlewares = {};

const headers = {
  'x-rapidapi-key': '4715328601msha1ddf1310f1bd33p19543ajsn0f32a86b34bd',
  'x-rapidapi-host': 'zillow-com1.p.rapidapi.com',
  useQueryString: true,
};

const calcMortgage = (price, int, down = 0.2, years = 30) => {
  const r = int / 12;
  return ((price * (1 - down)) / (1 - r) / (1 - (1 - r) ** (12 * years))) * r;
};

middlewares.getPropertiesForSale = async (req, res, next) => {
  const url = new URL(
    'https://zillow-com1.p.rapidapi.com/propertyExtendedSearch'
  );
  const params = {
    location: req.query.location.replace(/, United States$/, ''),
    status_type: 'ForSale',
  };
  if (req.query.home_type !== '') params.home_type = req.query.home_type;
  if (! isNaN(Number(req.query.bedsMin))) params.bedsMin = Number(req.query.bedsMin);
  if (! isNaN(Number(req.query.bathsMin))) params.bathsMin = Number(req.query.bathsMin);
  if (! isNaN(Number(req.query.minPrice))) params.minPrice = Number(req.query.minPrice);
  if (! isNaN(Number(req.query.maxPrice))) params.maxPrice = Number(req.query.maxPrice);

  url.search = new URLSearchParams(params).toString();
  const result = await fetch(url, { method: 'GET', headers: headers }).then(
    (res) => res.json()
  );

  if ('zpid' in result) {
    res.locals.zpid = result.zpid;
  } else if ('totalResultCount' in result) {
    if (result.totalResultCount > 0) {
      res.locals.propertiesForSale = {
        type: 'FeatureCollection',
        features: result['props']
          .filter((x) => !isNaN(Number(x.zpid)))
          .map(
            ({
              latitude,
              longitude,
              address,
              price,
              propertyType,
              livingArea,
              bedrooms,
              bathrooms,
              imgSrc,
              zpid,
            }) => ({
              type: 'Feature',
              properties: {
                Address: address,
                Price: `$${price}`,
                Type: propertyType,
                Size: `${livingArea} sqft`,
                '# bedrooms': bedrooms,
                '# bathrooms': bathrooms,
                Image: imgSrc,
                ZPID: zpid,
              },
              geometry: {
                coordinates: [longitude,latitude],
                type: 'Point',
              },
            })
          ),
      };
    }
  } else {
    return next({
      log: 'getPropertiesForSale: ERROR: Invalid search query.',
      status: 400,
      message: { err: 'getPropertiesForSale: ERROR: Invalid search query.' },
    });
  }

  return next();
};

middlewares.getTargetForSale = async (req, res, next) => {
 
  const url = new URL('https://zillow-com1.p.rapidapi.com/property');
  const params = {
    zpid: req.params.zpid,
  };
  url.search = new URLSearchParams(params).toString();
  const result = await fetch(url, { method: 'GET', headers: headers }).then(
    (res) => res.json()
  );

  if ('zpid' in result) {
    const {
      latitude,
      longitude,
      address,
      price,
      mortgageRates,
      homeType,
      livingArea,
      bedrooms,
      bathrooms,
      imgSrc,
      zpid,
    } = result;
    res.locals.targetForSale = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            'Street address': address.streetAddress,
            City: address.city,
            State: address.state,
            'Zip code': address.zipcode,
            Address: `${address.streetAddress}, ${address.city}, ${address.state} ${address.zipcode}`,
            Price: `$${price}`,
            'Interest rate': mortgageRates.thirtyYearFixedRate,
            Type: homeType,
            Size: `${livingArea} sqft`,
            '# bedrooms': bedrooms,
            '# bathrooms': bathrooms,
            'Est. monthly mortgage': Math.round(
              calcMortgage(price, mortgageRates.thirtyYearFixedRate / 100)
            ),
            'Rent array': 'N/A',
            'Est. monthly rent': 'N/A',
            'Price-to-rent ratio': 'N/A',
            Rating: 'N/A',
            Image: imgSrc,
            ZPID: zpid,
          },
          geometry: {
            coordinates: [longitude, latitude],
            type: 'Point',
          },
        },
      ],
    };
  } else {
    return next({
      log: 'getTargetForSale: ERROR: Unable to get result of target property.',
      status: 400,
      message: {
        err: 'getTargetForSale: ERROR: Unable to get result of target property.',
      },
    });
  }

  return next();
};

middlewares.getPropertiesForRental = async (req, res, next) => {
  const url = new URL(
    'https://zillow-com1.p.rapidapi.com/propertyExtendedSearch'
  );

  url.search = new URLSearchParams(req.params).toString();

  const result = await fetch(url, { method: 'GET', headers: headers }).then(
    (res) => res.json()
  );

  if ('totalResultCount' in result) {
    if (result.totalResultCount > 0) {
      res.locals.propertiesForRental = {
        type: 'FeatureCollection',
        features: result['props']
          .filter((x) => !isNaN(Number(x.zpid)))
          .map(
            ({
              latitude,
              longitude,
              address,
              price,
              propertyType,
              livingArea,
              bedrooms,
              bathrooms,
              imgSrc,
              zpid,
            }) => ({
              type: 'Feature',
              properties: {
                Address: address,
                'Monthly rent': `$${price}`,
                Type: propertyType,
                Size: `${livingArea} sqft`,
                '# bedrooms': bedrooms,
                '# bathrooms': bathrooms,
                Image: imgSrc,
                ZPID: zpid,
              },
              geometry: {
                coordinates: [longitude, latitude],
                type: 'Point',
              },
            })
          ),
      };
      if ('targetForSale' in res.locals) {
        const target = res.locals.targetForSale['features'][0]['properties'];
        const rentArr = res.locals.propertiesForRental['features']
          .map((p) => Number(p['properties']['Monthly rent'].slice(1)))
          .sort((a, b) => a - b);
        const rent = quantileSorted(rentArr, 0.5);
        const ratio = Math.round(
          Number(target['Price'].slice(1)) / (rent * 12)
        );
        const rating =
          ratio <= 15 ? 'Strong buy' : ratio >= 21 ? 'Strong no buy' : 'No buy';
        Object.assign(target, {
          'Rent array': rentArr,
          'Est. monthly rent': rent,
          'Price-to-rent ratio': ratio,
          Rating: rating,
        });
      }
    }
  } else {
    return next({
      log: 'getPropertiesForRental: ERROR: Invalid search query.',
      status: 400,
      message: { err: 'getPropertiesForRental: ERROR: Invalid search query.' },
    });
  }

  return next();
};


/**
 * 
 * @param {* zpid } req 
 * @param {* locals.similarProperties } res 
 * @param {*} next 
 */
middlewares.getComparableProperties = async (req, res, next) => {
  const url = new URL(
    'https://zillow-com1.p.rapidapi.com/similarProperty'
  );

  console.log('req.body inside of getComparableProperties: ', req.body);
  // console.log('RGR req.body inside of getComparableProperties middleware: ', req.body);

  const zpid = req.body.zpid;
  // console.log('zpid from response: ', zpid);
  const params = {
    // zpid: zpid
    zpid: zpid
  };

  url.search = new URLSearchParams(params).toString();
  // console.log('url inside getComparableProperties: ', url);

  // RETURNS: array of objects 
  /**
   * [
      0:
      {"bathrooms":4
      "bedrooms":3
      "miniCardPhotos":[...]1 item
      "zpid":48749498
      "longitude":-122.346914
      "address":{...}4 items
      "latitude":47.632692
      "livingArea":1838
      "homeType":"TOWNHOUSE"
      "livingAreaUnits":"Square Feet"
      "currency":"USD"
      "price":1699900}
    ]
   */
  // const result = await fetch(url, { method: 'GET', headers: headers }).then(
  //   (res) => {
  //     console.log('res.Response.body.json() inside of fetch ZillowAPI url: ' , JSON.stringify(res));
  //     // console.log('res inside of fetch ZillowAPI url: ' , res.body);
  //     res.json();
  //   }
  // );
  const result = await fetch("https://zillow-com1.p.rapidapi.com/similarProperty?zpid=2080998890", {
    "method": "GET",
    "headers": headers
    }).then(
    (res) => res.json()
  );
  // .then(response => {
  //   console.log('after fetch from ZillowAPI: ', response);
  //   result = response.json();
  // })
  // .catch(err => {
  //   console.error(err);
  // });

  console.log('result after fetch to Zillow: ', result);

  if(result){
    if(result.length > 0){
      // console.log('RGR inside of getComparableProperties miniCardPhotos[0].url: ', miniCardPhotos[0].url);
      let fts = result.filter((element) => !isNaN(Number(element.zpid)));
        console.log('ft: ', fts);
      fts.forEach((el, idx) => {
          console.log('el.miniCardPhotos: ', el.miniCardPhotos[0].url);
          fts[idx].miniCardPhotos = el.miniCardPhotos[0].url
      });
      console.log('Newest fts: ', fts);

      res.locals.similarProperties =
        fts
          .map(
            ({
              latitude,
              longitude,
              address,
              price,
              propertyType,
              livingArea,
              bedrooms,
              bathrooms,
              miniCardPhotos,
              zpid,
            }) => ({
              type: 'Feature',
              properties: {
                Address: address,
                'Monthly rent': `$${price}`,
                Type: propertyType,
                Size: `${livingArea} sqft`,
                '# bedrooms': bedrooms,
                '# bathrooms': bathrooms,
                Image: miniCardPhotos[0].url,
                ZPID: zpid,
              },
              geometry: {
                coordinates: [Number(longitude), Number(latitude)],
                type: 'Point',
              },
            })
          );
  
      // console.log('res.locals.similarProperties: ', res.locals.similarProperties);
    }
  }else {
    return next({
      log: 'getComparableProperties: ERROR: Invalid search query.',
      status: 400,
      message: { err: 'getComparableProperties: ERROR: Invalid search query.' },
    });
  }
  console.log('before next');
  return next();
}

module.exports = middlewares;
