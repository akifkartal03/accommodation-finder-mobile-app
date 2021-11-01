import "dotenv/config";

export default {
  expo: {
    name: "GtuAccommodationFinder",
    slug: "GtuAccommodationFinder",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      apiKey: process.env.ApiKey,
      authDomain: process.env.AuthDomain,
      projectId: process.env.ProjectId,
      storageBucket: process.env.StorageBucket,
      messagingSenderId: process.env.MessagingSenderId,
      appId: process.env.AppId,
      measurementId: process.env.MeasurementId,
    },
  },
};
