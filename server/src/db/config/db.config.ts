export const config = {
  HOST: "db",
  PORT: 5432,
  USER: "user",
  PASSWORD: "password",
  DB: "minitwitter",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export const dialect = "postgres";
