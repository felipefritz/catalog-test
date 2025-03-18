const config = {
  mongodb: {
    url: process.env.MONGODB_URI || "mongodb://localhost:27017/catalog",

    databaseName: "catalog",

    options: {
   
    }
  },

  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  lockCollectionName: "changelog_lock",
  lockTtl: 0,
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'commonjs',
};

module.exports = config;
