module.exports = {
  apps : [{
    name   : "front",
    script : "npm run prod",
    env_production: {
        NODE_ENV: "production"
    }
  }]
}
  