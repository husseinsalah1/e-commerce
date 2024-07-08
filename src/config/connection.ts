import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, "../entities/*.{ts,js}")],
  migrations: [path.join(__dirname, "../migrations/*.{ts,js}")],
  synchronize: false,
  migrationsTableName: process.env.DB_MIGRATION_TABLE_NAME,
  extra: {
    trustServerCertificate: true,
  },
});

export class Connection {
  static async connect() {
    try {
      await AppDataSource.initialize();
      console.log("Database connected successfully");
    } catch (error) {
      console.log("Error connecting to the database", error);
    }
  }
}
