import { Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';

const isAndroid = Platform.OS === 'android';

export const Wrapper = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
  background: #ffffff;
  flex: 1;
`;

export const Container = styled.KeyboardAvoidingView`
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

export const Form = styled.View`
  margin: 0 32px;
`;

export const Input = styled.TextInput`
  background-color: #ffffff;
  border: 1px solid rgba(204, 204, 204, 0.5);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  margin-top: 10px;
`;

export const ButtonContainer = styled.View`
  margin: 0 15px;
`;
