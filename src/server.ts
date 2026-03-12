import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import dns from 'dns';

dns.setServers(['1.1.1.1', '8.8.8.8']);

async function server() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(5000, () => {
      console.log(`server is runnig at 5000`);
    });
  } catch (error) {
    console.log(error);
  }
}
server();
