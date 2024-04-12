import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";
import Database from "./db";



export default class Server {
  constructor(app: Application) {
    this.config(app);
    this.syncDatabase();

    new Routes(app);
  }

  private config (app: Application): void {
    const corsOptions: CorsOptions = {
      origin: "http://localhost:9090",
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

  }
  // Async function to synchronize the database
  private async syncDatabase (): Promise<void> {
    const db = new Database();
    await db.sequelize?.sync();
    // await this.seedDatabase();
  }
}
