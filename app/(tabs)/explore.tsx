// 登入頁面
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { getApiBaseUrl, getApiUrl } from '@/constants/ApiConfig';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function LoginScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  
  // 登入表單狀態
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // 註冊表單狀態
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRole, setRegisterRole] = useState('client');

  // 處理登入
  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      Alert.alert('錯誤', '請填寫所有必填欄位');
      return;
    }

    try {
      setIsLoading(true);
      const apiUrl = getApiUrl('/api/login');
      console.log('嘗試連接到:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.user && data.access_token) {
        // 清空表單
        setLoginEmail('');
        setLoginPassword('');
        // 導航到首頁並傳遞用戶資訊
        router.push({
          pathname: '/', // 首頁路由
          params: {
            loginSuccess: 'true',
            userId: data.user.id,
            userEmail: data.user.email,
            userRole: data.user.role,
            token: data.access_token,
          },
        });
      } else {
        Alert.alert('錯誤', data.error || '登入失敗，請檢查回傳的資料');
      }
    } catch (error) {
      console.error('登入錯誤:', error);
      Alert.alert('錯誤', '連接伺服器失敗，請確保後端服務正在運行或檢查網路');
    } finally {
      setIsLoading(false);
    }
  };

  // 處理註冊
  const handleRegister = async () => {
    if (!registerName || !registerEmail || !registerPassword) {
      Alert.alert('錯誤', '請填寫所有必填欄位');
      return;
    }

    try {
      setIsLoading(true);
      const apiUrl = getApiUrl('/api/register');
      console.log('嘗試連接到:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
          role: registerRole,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('成功', '註冊成功，請登入', [{ text: 'OK' }]);
        // 清空註冊表單
        setRegisterName('');
        setRegisterEmail('');
        setRegisterPassword('');
      } else {
        Alert.alert('錯誤', data.error || '註冊失敗');
      }
    } catch (error) {
      console.error('註冊錯誤:', error);
      Alert.alert('錯誤', '連接伺服器失敗，請確保後端服務正在運行');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={150}
          color="#ffffff"
          name="person.fill"
          style={styles.headerIcon}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">會員中心</ThemedText>
      </ThemedView>
      
      <Collapsible title="登入">
        <ThemedView style={styles.formContainer}>
          <TextInput
            style={[
              styles.input, 
              { backgroundColor: colorScheme === 'dark' ? '#333' : '#fff', 
                color: colorScheme === 'dark' ? '#fff' : '#000' }
            ]}
            placeholder="電子郵件"
            placeholderTextColor={colorScheme === 'dark' ? '#999' : '#999'}
            value={loginEmail}
            onChangeText={setLoginEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={[
              styles.input, 
              { backgroundColor: colorScheme === 'dark' ? '#333' : '#fff',
                color: colorScheme === 'dark' ? '#fff' : '#000' }
            ]}
            placeholder="密碼"
            placeholderTextColor={colorScheme === 'dark' ? '#999' : '#999'}
            value={loginPassword}
            onChangeText={setLoginPassword}
            secureTextEntry
          />
          <TouchableOpacity 
            style={[styles.button, isLoading && styles.buttonDisabled]} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            <ThemedText style={styles.buttonText}>
              {isLoading ? '登入中...' : '登入'}
            </ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.helperText}>
            API 連接地址: {getApiBaseUrl()}
          </ThemedText>
        </ThemedView>
      </Collapsible>
      
      <Collapsible title="註冊">
        <ThemedView style={styles.formContainer}>
          <TextInput
            style={[
              styles.input, 
              { backgroundColor: colorScheme === 'dark' ? '#333' : '#fff',
                color: colorScheme === 'dark' ? '#fff' : '#000' }
            ]}
            placeholder="姓名"
            placeholderTextColor={colorScheme === 'dark' ? '#999' : '#999'}
            value={registerName}
            onChangeText={setRegisterName}
          />
          <TextInput
            style={[
              styles.input, 
              { backgroundColor: colorScheme === 'dark' ? '#333' : '#fff',
                color: colorScheme === 'dark' ? '#fff' : '#000' }
            ]}
            placeholder="電子郵件"
            placeholderTextColor={colorScheme === 'dark' ? '#999' : '#999'}
            value={registerEmail}
            onChangeText={setRegisterEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={[
              styles.input, 
              { backgroundColor: colorScheme === 'dark' ? '#333' : '#fff',
                color: colorScheme === 'dark' ? '#fff' : '#000' }
            ]}
            placeholder="密碼"
            placeholderTextColor={colorScheme === 'dark' ? '#999' : '#999'}
            value={registerPassword}
            onChangeText={setRegisterPassword}
            secureTextEntry
          />

          <ThemedText style={styles.helperText}>請放心輸入，密碼皆經過加密後儲存，開發者也沒辦法知道您的密碼。</ThemedText>

          <ThemedText type="subtitle" style={styles.roleTitle}>您的身份是</ThemedText>
          <ThemedView style={styles.roleContainer}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                registerRole === 'client' && styles.roleButtonActive,
              ]}
              onPress={() => setRegisterRole('client')}
            >
              <ThemedText
                style={[
                  styles.roleButtonText,
                  registerRole === 'client' && styles.roleButtonTextActive,
                ]}
              >
                尋找看護
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roleButton,
                registerRole === 'caregiver' && styles.roleButtonActive,
              ]}
              onPress={() => setRegisterRole('caregiver')}
            >
              <ThemedText
                style={[
                  styles.roleButtonText,
                  registerRole === 'caregiver' && styles.roleButtonTextActive,
                ]}
              >
                提供看護服務
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
          
          <TouchableOpacity 
            style={[styles.button, isLoading && styles.buttonDisabled]} 
            onPress={handleRegister}
            disabled={isLoading}
          >
            <ThemedText style={styles.buttonText}>
              {isLoading ? '註冊中...' : '註冊'}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    bottom: 20,
    alignSelf: 'center',
    position: 'absolute',
    opacity: 0.7,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  formContainer: {
    gap: 12,
    marginBottom: 8,
    width: '100%',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
    width: '100%',
  },
  button: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  buttonDisabled: {
    backgroundColor: '#999999',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  roleTitle: {
    marginBottom: 8,
  },
  roleContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 16,
  },
  roleButton: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  roleButtonActive: {
    backgroundColor: '#007AFF',
  },
  roleButtonText: {
    color: '#007AFF',
  },
  roleButtonTextActive: {
    color: 'white',
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
});
