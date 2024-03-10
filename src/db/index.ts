import { Sequelize } from "sequelize";

// console.log("endpoint", process.env.AWS_RDS_ENDPOINT);

const aws_rds_endpoint: string = process.env.AWS_RDS_ENDPOINT || '';
const aws_rds_master_username: string = process.env.AWS_RDS_MASTER_USERNAME || '';
const aws_rds_password: string = process.env.AWS_RDS_MASTER_PASSWORD || '';
const aws_rds_db_name: string = process.env.AWS_RDS_DB_NAME || '';



const sequelize = new Sequelize(aws_rds_db_name, aws_rds_master_username, aws_rds_password, {
    host: aws_rds_endpoint,
    dialect: 'postgres',
    port: 5432,
    logging: false,
    ssl: true, 
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      }
    }
});

const connectDB = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default connectDB;
