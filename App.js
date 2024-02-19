
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import LoginScreen from './app/screen/LoginScreen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-SemiBold.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
  });

  
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  
  return (
    <ClerkProvider publishableKey={'pk_test_YXJ0aXN0aWMtY2ljYWRhLTc3LmNsZXJrLmFjY291bnRzLmRldiQ'}>
    <View style={styles.container} onLayout={onLayoutRootView}>
      <LoginScreen/>
      <StatusBar style="auto" />
    </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
