import { connect } from 'mongoose';

// Check mongoose docs for connection options
// https://mongoosejs.com/docs/connections.html#options

export const connectToDB = async (connectionString: string) => {
  const db = await connect(connectionString, {
    poolSize: 5, // It's the default poolSize
    useNewUrlParser: true, // New parser for connection string.
    promiseLibrary: Promise,
    useUnifiedTopology: true, // https://mongoosejs.com/docs/deprecations.html#useunifiedtopology
    useFindAndModify: false, // https://mongoosejs.com/docs/deprecations.html#findandmodify
  });

  console.log('Connected to DB');

  return db;
};
