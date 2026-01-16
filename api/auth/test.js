// api/test.js
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    return res.status(200).end();
  }

  res.json({
    message: 'API работает!',
    method: req.method,
    timestamp: new Date().toISOString(),
    body: req.body || 'No body'
  });
};
