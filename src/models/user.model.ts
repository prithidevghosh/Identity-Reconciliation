// Import Sequelize and define method
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

// Define your Sequelize model
class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  phoneNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false
  },
  linkedId: {
    type: DataTypes.INTEGER,
    allowNull: true // Assuming linkedId can be null
  },
  linkPrecedence: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true // Assuming deletedAt can be null
  }
}, {
  sequelize, // Provide the sequelize instance
  modelName: 'User', // Model name
  tableName: 'users', // Name of your table in the database
  timestamps: true // Set to true if you want Sequelize to automatically manage createdAt and updatedAt fields
});

(async () => {
  try {
    await User.sync({force:true});

    console.log("User model synchronized with the database.");
  } catch (error) {
    console.error("Error synchronizing User model:", error);
  }
})();

export default User;
