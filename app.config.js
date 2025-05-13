import 'dotenv/config'; // 自動讀取 .env 檔案

export default {
  expo: {
    name: "CareMatch",
    slug: "carematch",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon1.png",
    scheme: "carematch",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      package: "com.carematch.app",
      versionCode: 1,
      permissions: [],
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon1.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      bundler: "metro",
      output: "static", // static適合靜態網站，也可以用"single"，適合單頁應用程式
      favicon: "./assets/images/favicon1_48X48.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon1.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {},
      eas: {
        projectId: "2bea4818-a30d-48d9-9b69-e1ad7d59d1cb"
      },
      API_BASE_URL: process.env.API_BASE_URL
    },
    owner: "chenyuanmou"
  }
};
