# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started
0. 設定環境變數
   在根目錄下創建`.env`，然後包含:
   ```
   API_BASE_URL=你自己設定的flask API server ip:port或只有ip或URL
   ```
   > 舉例: `API_BASE_URL=https:blablabla.azurewebsites.net`
1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app(測試用)
   這個server可以同時產生動態網頁、android及ios上可以用`Expo Go`這個app掃描qrcode執行在手機上。
   ```bash
   npx expo start
   ```
   如果有問題時，可以加上`--clear`參數，清除Metro Bundler快取、Babel快取、TypeScript編譯快取、expo-router的route快取
3. 編譯成apk(正式用)
   當測試都沒有問題時，可以用`eas build --platform android --profile preview`(可加上--clear-cache，強制清除雲端快取、依賴快取)在雲端上自動編譯成apk，然後可以下載。
4. 編譯成靜態網站(正式用)
   執行`npm run deploy`，背後會同時執行`package.json`的predeploy和deploy設定好的指令，也就是先編譯靜態網站到`/dist`然後再上傳`/dist`到github gh-pages分支。

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
