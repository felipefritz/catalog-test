export default {
    mongodb: {
      url: process.env.MONGODB_URI,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
    migrationsDir: 'migrations',
    changelogCollectionName: 'migrations',
  };