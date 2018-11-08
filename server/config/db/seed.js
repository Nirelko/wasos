import mongoose from 'mongoose';

const seeds = [];

export const createModelAndSeed = entities => (collectionName, schema) => {
  const collection = mongoose.model(collectionName, schema);

  collectionName = collectionName.toLowerCase();

  const seeder = {
    collectionName,
    run: () => mongoose.connection.db.listCollections({
      name: collectionName
    }).toArray()
      .then(collections => collections.length && mongoose.connection.dropCollection(collectionName))
      .then(() => Promise.all(entities.map(x => collection.create(x))))
  };

  seeds.push(seeder);

  return collection;
};

export default seeds;
