import { ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';
import { Text } from '../Text';
import * as S from './styles';

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
}

export function Button({
  children,
  disabled,
  loading,
  onPress
}: ButtonProps) {
  return (
    <S.Container onPress={onPress} disabled={disabled || loading}>
      {!loading ? (
        <Text weight='600' color='#fff'>{children}</Text>
      ) : (
        <ActivityIndicator
          color="#fff"
        />
      )}
    </S.Container>
  );
}
