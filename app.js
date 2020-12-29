import { db } from './db/index.js';
import { app } from './routes/userRoutes.js';

global.BR_OFFSET = 3*60*60*1000;

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log('Databse connected');
  } catch (error) {
    console.log('Database error', error);
  }
})();


app.listen(3000, () => {
  try {
    console.log('API started');
  } catch (error) {
    console.log('API error', error);
  }
});