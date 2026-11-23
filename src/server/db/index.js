const data = require('./data.json');

function getEndpoints() {
  return { data: data };
}

module.exports = getEndpoints;
module.exports.default = getEndpoints;
