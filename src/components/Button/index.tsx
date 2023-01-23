import { ReactNode } from 'react';
import { Text } from '../Text';
import * as S from './styles';

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onPress: () => void;
}

export function Button({ children, disabled, onPress }: ButtonProps) {
  return (
    <S.Container onPress={onPress} disabled={disabled}>
      <Text weight='600' color='#fff'>{children}</Text>
    </S.Container>
  );
}
