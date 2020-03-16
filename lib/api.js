const http = require('http');
const https = require('https');
const URL = require('url');

const getRequest = async (url, isSecure = true) => {
  const module = URL.parse(url).protocol === 'https:' ? https : http;
  return new Promise((resolve, reject) => {
    module.get(url, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        try {
            let json = JSON.parse(data);
            resolve(json);
        } catch(e) {
            reject(`Service ${url} did not respond with valid json`);
        }
      });
    }).on('error', (err) => reject(err));
  });
}

module.exports = {
  getRequest
}
