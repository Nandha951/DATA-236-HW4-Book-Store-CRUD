const express = require('express');
const sequelize = require('./config/database');
const bookRoutes = require('./routes/book.routes');

const app = express();
app.use(express.json());

app.use('/api', bookRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync the models
    await sequelize.sync();
    console.log('Database synced successfully');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to database:', error.message);
    process.exit(1);
  }
}

startServer();