// server.js
const jsonServer = require('json-server');
const path = require('path');
const uuidv1 = require('uuid/v1');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

const pathsToReturnWhenPost = [
  '/api/2.0/dojos',
  '/api/2.0/dojos/find',
  '/api/2.0/dojos/search-bounding-box',
  '/api/2.0/events/search',
  '/api/2.0/events/bulk-apply-applications',
];
const pathsToReturnSingular = [
  '/api/2.0/dojos/find',
];
const nonResourcePostUrls = [
  '/api/2.0/users/register',
  '/api/2.0/users/login',
  '/api/2.0/dojos/save-usersdojos',
]
const rewriteRules = {
  '/api/2.0/dojos/find': '/api/2.0/dojos',
  '/api/2.0/dojos/search-bounding-box': '/api/2.0/dojos',
  '/api/2.0/events/search': '/api/2.0/events',
  '/api/2.0/events/bulk-apply-applications': '/api/2.0/bulk-apply-applications'
};

server.use(middlewares);
server.use(require('body-parser').json());
server.use(jsonServer.rewriter(rewriteRules));
server.use((req, res, next) => {
  if (req.method === 'POST' && pathsToReturnWhenPost.indexOf(req.originalUrl) > -1) {
    req.method = 'GET';
    if (req.body.query) {
      req.query = req.body.query;
    }
  }
  next();
});
server.use((req, res, next) => {
  if (pathsToReturnSingular.indexOf(req.originalUrl.split('?')[0]) > -1) {
    const send = res.send;
    res.send = function (string) {
      let body = string instanceof Buffer ? string.toString() : string;
      const json = JSON.parse(body);
      if (json.length && json.length > 0) {
        body = JSON.stringify(json[0]);
      }
      send.call(this, body);
    };
  }
  next();
});
nonResourcePostUrls.forEach((url) => {
  server.post(url, (req, res) => {
    res.send();
  });
});
server.post('/api/2.0/profiles/youth/create', (req, res) => {
  const child = req.body.profile;
  child.id = uuidv1();
  child.userId = uuidv1();
  res.send(child);
});
server.use('/api/2.0', router);

server.listen(3000, () => {
  console.log('JSON Server is running')
})
