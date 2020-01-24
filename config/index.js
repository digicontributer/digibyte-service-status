const config = {
  expressPort: 3000, // Port to run express on
  cronTimer: 5, // Time in minutes

  // Gmail Settings
  enableEmail: false,
  gmailUsername: '',
  gmailPassword: '',

  // Service Settings
  serviceList: [
    'insightInstances',
    'DWSInstances',
    'poolInstances'
  ],
  insightInstances: [{
    url: 'https://digiexplorer.info',
    maintainer: 'admin@digibyte.io',
    donationAddress: ''
  }, {
    url: 'https://explorer-1.us.digibyteservers.io',
    maintainer: 'admin@digibyte.io',
    donationAddress: ''
  }],
  DWSInstances: [{
    url: 'https://go.digibyte.io',
    maintainer: 'admin@digibyte.io',
    donationAddress: ''  
  }],
  poolInstances: [{
    url: 'http://digihash.co',
    maintainer: 'admin@digibyte.io',
    donationAddress: '',     
  }],
  getServiceUrls: () => {
    const serviceUrls = [];
    config['serviceList'].forEach(serviceName => {
      config[serviceName].forEach(service => serviceUrls.push(service.url));
    });
    return serviceUrls;
  }
}

module.exports = config;