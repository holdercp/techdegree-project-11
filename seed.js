const conn = new Mongo();
const db = conn.getDB('course-api');

db.dropDatabase();

db.createCollection('users');
db.createCollection('courses');
db.createCollection('reviews');

// Create a unique index on user's email addresses
db.users.createIndex({ emailAddress: 1 }, { unique: true });
