import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { AuthScreen } from '../../pages/Auth';
import { Main } from '../../pages/Main';
import { AUTH_SCREENS, FLOWS, MAIN_SCREENS } from './constants';

const RootStack = createNativeStackNavigator();

const AuthStack = createNativeStackNavigator();

const MainStack = createNativeStackNavigator();

function AuthStackFlow() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name={AUTH_SCREENS.LOGIN}
        component={AuthScreen}
        options={{
          headerShown: false
        }}
      />
    </AuthStack.Navigator>
  );
}

function MainStackFlow() {
  return (
    <MainStack.Navigator>
      <AuthStack.Screen
        name={MAIN_SCREENS.MAIN_PAGE}
        component={Main}
        options={{
          headerShown: false
        }}
      />
    </MainStack.Navigator>
  );
}

function RootStackFlow() {
  return (
    <RootStack.Navigator>

      <RootStack.Screen
        name={FLOWS.AUTH_FLOW}
        component={AuthStackFlow}
        options={{
          headerShown: false
        }}
      />
      <RootStack.Screen
        name={FLOWS.MAIN_FLOW}
        component={MainStackFlow}
        options={{
          headerShown: false
        }}
      />
    </RootStack.Navigator>
  );
}

export function AppNavigation() {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <NavigationContainer>
        <RootStackFlow />
      </NavigationContainer>
    </View>
  );
}
