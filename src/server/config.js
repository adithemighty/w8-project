module.exports = {
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/ja",
  SECRET_JWT_PASSPHRASE: process.env.SECRET_JWT_PASSPHRASE,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
  GIT_TOKEN: process.env.GIT_TOKEN
};
