const request = require('request');

const options = {
  url: 'https://api.github.com/users/github',
  headers: {
    'user-agent': 'node.js',
  },
};

function callback(error, response, body) {
  if (!error && response.statusCode === 200) {
    const info = JSON.parse(body);

    console.log(info);
  }
}

request(options, callback);