module.exports = {
  secret: "your-secret-key-here", // In production, use environment variable
  jwtExpiration: 86400, // 24 hours
  jwtRefreshExpiration: 604800, // 7 days
};
