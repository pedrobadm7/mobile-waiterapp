import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Main } from './src/components/Main';
import * as SplashScreen from 'expo-splash-screen';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { useEffect} from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'GeneralSans-400': require('./src/assets/fonts/GeneralSans-Regular.otf'),
    'GeneralSans-600': require('./src/assets/fonts/GeneralSans-Semibold.otf'),
    'GeneralSans-700': require('./src/assets/fonts/GeneralSans-Bold.otf'),
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Main /></>
  );
}

