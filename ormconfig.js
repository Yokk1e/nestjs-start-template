module.exports = {
  type: "mysql",
  host: process.env.NEST_TYPEORM_HOST,
  port: process.env.NEST_TYPEORM_PORT,
  username: process.env.NEST_TYPEORM_USERNAME,
  password: process.env.NEST_TYPEORM_PASSWORD,
  database: process.env.NEST_TYPEORM_DATABASE,
  entities: ["dist/**/*.entity{.ts,.js}"],
  seeds: ["dist/seeds/*.seed{.ts,.js}"],
  factories: ["dist/factories/*.factory{.ts,.js}"],
  synchronize: process.env.NEST_TYPEORM_SYNCHRONIZE === "TRUE",
  logging: process.env.NEST_TYPEORM_LOGGING === "TRUE",
  timezone: process.env.NEST_TYPEORM_TIMEZONE,
};
