module.exports = {
  apps : [{
    name   : "webapp",
    script : "./dist/src/server.js",
    env_production: {
        NODE_ENV: "production"
    }
  }]
}
