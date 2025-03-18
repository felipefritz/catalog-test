module.exports = {
  async up(db) {
    await db.createCollection('usuarios');
    await db.createCollection('catalogos');
    
    await db.collection('usuarios').createIndex({ email: 1 }, { unique: true });
    await db.collection('catalogos').createIndex({ nombre: 1 });
    
    await db.collection('usuarios').insertOne({
      nombre: 'Admin',
      email: 'admin@ejemplo.com',
      password: '$2b$10$X/FzCraJKnYxbszMbfn/u.V2HB97/3reztFQO7FmA9qFW8JCdXKfG', // 'admin123' encriptado
      rol: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async down(db) {
    await db.collection('usuarios').drop();
    await db.collection('catalogos').drop();
  }
};