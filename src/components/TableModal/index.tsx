import { Modal, Platform, TouchableOpacity } from 'react-native';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';

import * as S from './styles';

export function TableModal() {

  const isAndroid = Platform.OS === 'android';

  return (
    <Modal
      transparent
    >
      <S.Overlay behavior={isAndroid ? 'height' : 'padding'}>
        <S.ModalBody>
          <S.Header>
            <Text weight='600'>Informe a mesa</Text>

            <TouchableOpacity>
              <Close color='#666' />
            </TouchableOpacity>
          </S.Header>
          <S.Form>
            <S.Input
              placeholder='Número da mesa'
              placeholderTextColor='#666'
            />
            <Button onPress={() => { }}>
              Salvar
            </Button>
          </S.Form>
        </S.ModalBody>
      </S.Overlay>
    </Modal>
  );
}
