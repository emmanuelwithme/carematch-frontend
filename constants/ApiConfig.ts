import Constants from 'expo-constants';

// 從 Expo Constants 獲取 API 基礎路徑
export const getApiBaseUrl = () => {
  // 優先使用app.config.js中的API_BASE_URL，若沒有設定就用localhost
  return Constants.expoConfig?.extra?.API_BASE_URL || 'http://localhost:5000';
};

// 構造完整 API URL 的函數
export const getApiUrl = (endpoint: string) => {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
}; 