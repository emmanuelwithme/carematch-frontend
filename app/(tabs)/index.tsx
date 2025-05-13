// 首頁
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { getApiUrl } from '@/constants/ApiConfig';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function HomeScreen() {
  const params = useLocalSearchParams();
  const { loginSuccess, userId, userEmail, userRole, token } = params;
  const colorScheme = useColorScheme() ?? 'light';
  const tintColor = Colors[colorScheme].tint;
  const [modalVisible, setModalVisible] = useState(false);
  const [apkDownloadUrl, setApkDownloadUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchApkDownloadUrl = async () => {
      setIsLoading(true);
      try {
        // 使用 getApiUrl 函數構造完整的 API URL
        const apiUrl = getApiUrl('api/download');
        console.log('請求 API URL:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API錯誤詳情:', errorText);
          throw new Error(`獲取下載連結失敗: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API 回應數據:', data);
        setApkDownloadUrl(data.url || '');
      } catch (error) {
        console.error('獲取APK下載連結錯誤:', error);
        setApkDownloadUrl('');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchApkDownloadUrl();
  }, []);
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <IconSymbol
          size={150}
          color="#ffffff"
          name="heart.fill"
          style={styles.headerIcon}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">歡迎來到妙管家 👋</ThemedText>
      </ThemedView>
      
      {Platform.OS === 'web' && (
        <ThemedView style={styles.downloadContainer}>
          <Pressable
            style={({pressed}) => [
              styles.downloadButton,
              {opacity: pressed ? 0.8 : 1}
            ]}
            onPress={() => setModalVisible(true)}
          >
            <IconSymbol name="arrow.down.circle.fill" size={20} color="#FFFFFF" />
            <ThemedText style={styles.downloadButtonText}>下載 Android APK</ThemedText>
          </Pressable>
        </ThemedView>
      )}
      
      {modalVisible && Platform.OS === 'web' && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <ThemedView style={styles.modalOverlay}>
            <ThemedView style={[styles.modalContent]}>
              <ThemedView style={styles.modalHeader}>
                <ThemedText type="subtitle">下載妙管家應用</ThemedText>
                <Pressable onPress={() => setModalVisible(false)}>
                  <IconSymbol name="xmark.circle.fill" size={24} color={tintColor} />
                </Pressable>
              </ThemedView>
              
              <ThemedText style={styles.modalText}>
                掃描下方QR碼或點擊連結下載妙管家Android安裝檔
              </ThemedText>
              
              {isLoading ? (
                <ThemedView style={styles.qrContainer}>
                  <ThemedText>正在獲取下載連結...</ThemedText>
                </ThemedView>
              ) : apkDownloadUrl ? (
                <>
                  <ThemedView style={styles.qrContainer}>
                    <QRCode
                      value={apkDownloadUrl}
                      size={200}
                      color="#000000"
                      backgroundColor="#FFFFFF"
                    />
                  </ThemedView>
                  
                  <ThemedView style={styles.linkContainer}>
                    <ThemedText type="defaultSemiBold">下載連結：</ThemedText>
                    <ThemedText
                      type="link"
                      style={styles.downloadLink}
                      onPress={() => window.open(apkDownloadUrl, '_blank')}
                    >
                      點擊此處下載APK
                    </ThemedText>
                  </ThemedView>
                </>
              ) : (
                <ThemedView style={styles.qrContainer}>
                  <ThemedText>獲取下載連結失敗，請稍後再試</ThemedText>
                </ThemedView>
              )}
              
              <ThemedText style={styles.noteText}>
                *請放心安裝應用程式。100%安全無毒。
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </Modal>
      )}
      
      {loginSuccess === 'true' && (
        <ThemedView 
          style={styles.sectionContainer} 
          lightColor="rgba(240, 249, 255, 0.8)"
          darkColor="rgba(26, 46, 56, 0.7)"
        >
          <ThemedView style={styles.loginSuccessHeader}>
            <IconSymbol name="checkmark.circle.fill" size={24} color={tintColor} />
            <ThemedText type="subtitle" style={{color: tintColor}}>登入成功</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.infoItem}>
            <ThemedText type="defaultSemiBold">用戶 ID:</ThemedText>
            <ThemedText>{userId}</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.infoItem}>
            <ThemedText type="defaultSemiBold">Email:</ThemedText>
            <ThemedText>{userEmail}</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.infoItem}>
            <ThemedText type="defaultSemiBold">身份:</ThemedText>
            <ThemedText>{userRole === 'client' ? '尋找看護' : '提供看護服務'}</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.infoItem}>
            <ThemedText type="defaultSemiBold">JWT:</ThemedText>
            <ThemedText selectable style={styles.tokenText}>{token}</ThemedText>
          </ThemedView>
        </ThemedView>
      )}
      
      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle">🏠 我們的使命</ThemedText>
        <ThemedText>
          妙管家致力於連結有需求的家庭與專業的看護人員，提供安心、便利的媒合服務，讓每一位家人都能獲得最合適的照顧。
        </ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle">✨ 我們的優勢</ThemedText>
        
        <ThemedView style={styles.featureContainer}>
          <IconSymbol name="checkmark.seal.fill" size={24} color="#34C759" />
          <ThemedText type="defaultSemiBold">專業認證人員</ThemedText>
        </ThemedView>
        <ThemedText style={styles.featureText}>
          所有看護人員皆經過嚴格篩選與認證，確保專業素質。
        </ThemedText>
        
        <ThemedView style={styles.featureContainer}>
          <IconSymbol name="heart.text.square.fill" size={24} color="#FF3B30" />
          <ThemedText type="defaultSemiBold">個人化需求配對</ThemedText>
        </ThemedView>
        <ThemedText style={styles.featureText}>
          根據家庭特殊需求，提供最合適的看護人選，滿足不同照顧需求。
        </ThemedText>
        
        <ThemedView style={styles.featureContainer}>
          <IconSymbol name="clock.fill" size={24} color="#007AFF" />
          <ThemedText type="defaultSemiBold">彈性服務時間</ThemedText>
        </ThemedView>
        <ThemedText style={styles.featureText}>
          提供全天候、短期或長期的看護服務，滿足各種時間安排需求。
        </ThemedText>
        
        <ThemedView style={styles.featureContainer}>
          <IconSymbol name="hand.thumbsup.fill" size={24} color="#FF9500" />
          <ThemedText type="defaultSemiBold">滿意度保證</ThemedText>
        </ThemedView>
        <ThemedText style={styles.featureText}>
          服務結束後進行評分回饋，持續提升服務品質。
        </ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle">📱 如何開始</ThemedText>
        <ThemedText>
          點擊下方的「登入」標籤，創建您的帳戶或登入既有帳號，即可開始使用我們的服務，尋找最適合的看護人員。
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  loginSuccessHeader: {
    backgroundColor: 'transparent', // 確保是透明
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  infoItem: {
    backgroundColor: 'transparent', // 確保是透明
    marginBottom: 8,
  },
  tokenText: {
    fontSize: 12,
    marginTop: 4,
    flexWrap: 'wrap',
  },
  sectionContainer: {
    gap: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
  },
  featureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  featureText: {
    marginLeft: 32,
    marginBottom: 16,
  },
  headerIcon: {
    height: 150,
    width: 150,
    bottom: 20,
    alignSelf: 'center',
    position: 'absolute',
    opacity: 0.7,
  },
  downloadContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34C759',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  downloadButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    maxWidth: 400,
    borderRadius: 12,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  downloadLink: {
    marginLeft: 8,
    textDecorationLine: 'underline',
  },
  noteText: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
