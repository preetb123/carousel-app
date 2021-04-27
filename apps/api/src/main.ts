import * as express from 'express';
import { ImageInfo } from '@carousel-app/api-interfaces';
import imageItems = require('./db.json');

const app = express();

const imageInfoItems: ImageInfo[] = imageItems;

app.get('/api/images', (req, res) => {
  res.json(imageInfoItems);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
