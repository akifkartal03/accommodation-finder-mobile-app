import "dotenv/config";

export default {
  expo: {
    name: "GtuAccommodationFinder",
    slug: "GtuAccommodationFinder",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon2.png",
    splash: {
      image: "./assets/icon2.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/icon2.png",
        backgroundColor: "#FFFFFF",
      },
      package: "com.akif05.GtuKalacakYeriniBull",
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
