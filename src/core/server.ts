import app from './app.js';
import config from '../config/index.js';
import { initializeSchedulers } from './scheduler.js';

const port = config.port;

app.listen(port, () => {
  console.log(`[server]: Server berjalan di http://localhost:${port}`);

  initializeSchedulers();
});
