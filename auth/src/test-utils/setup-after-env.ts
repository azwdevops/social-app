import mongoose from "mongoose";

// before everything
// create an instance of my MongoDb server
// connect to my mongodb server via mongoose

beforeAll(async () => {
  const mongoUri = "mongodb://localhost:27017/social-app-jest";
  await mongoose.connect(mongoUri);
});

// before each test
// clean up the database
beforeEach(async () => {
  const allCollections = await mongoose.connection.db.collections();
  await Promise.all(
    allCollections.map((collection) => collection.deleteMany({}))
  );
});

// after all tests
// close the connection with the database
afterAll(async () => {
  await mongoose.connection.close();
});
