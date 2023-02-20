import { useState } from 'react';
import { Platform, View } from 'react-native';
import { Button } from '../../components/Button';
import { Text } from '../../components/Text';
import { FLOWS, MAIN_SCREENS } from '../../core/navigation/constants';

import * as S from './styles';
const isAndroid = Platform.OS === 'android';

export function AuthScreen({navigation}: any) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <S.Wrapper>
      <S.Container behavior={isAndroid ? 'height' : 'padding'}>
        <View />
        <View style={{alignItems: 'center',  marginHorizontal: 10}}>
          <Text size={14} opacity={0.9}>Bem vindo(a) ao</Text>
          <Text size={24} weight='700'>
            WAITER
            <Text size={24}>APP</Text>
          </Text>
        </View>

        <S.Form>
          <Text weight='400' size={14} color='#333333'>E-mail</Text>
          <S.Input
            value={email}
            placeholder='Seu e-mail de acesso'
            placeholderTextColor='#666'
            onChangeText={setEmail}
          />
          <Text weight='400' size={14} color='#333333'>Senha</Text>
          <S.Input
            value={password}
            placeholder='Informe sua senha'
            placeholderTextColor='#666'
            onChangeText={setPassword}
          />
        </S.Form>

        <S.ButtonContainer>
          <Button
            disabled={email === '' || password === ''}
            loading={false}
            onPress={() => navigation.navigate(FLOWS.MAIN_FLOW, {
              page: MAIN_SCREENS.MAIN_PAGE
            })}
          >
        Fazer Login
          </Button>
        </S.ButtonContainer>
      </S.Container>

    </S.Wrapper>
  );
}
