import { useState } from 'react';
import { Modal, Platform, TouchableOpacity } from 'react-native';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';

import * as S from './styles';

interface TableModalProps {
  visible: boolean;
  onClose: () => void
  onSave: (table: string) => void
}

export function TableModal({ visible, onClose, onSave }: TableModalProps) {
  const [table, setTable] = useState('');

  function handleSave() {
    onSave(table);
    onClose();
  }

  const isAndroid = Platform.OS === 'android';

  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
    >
      <S.Overlay behavior={isAndroid ? 'height' : 'padding'}>
        <S.ModalBody>
          <S.Header>
            <Text weight='600'>Informe a mesa</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color='#666' />
            </TouchableOpacity>

          </S.Header>
          <S.Form>
            <S.Input
              placeholder='Número da mesa'
              placeholderTextColor='#666'
              keyboardType='number-pad'
              onChangeText={setTable}
            />
            <Button onPress={handleSave} disabled={table.length === 0}>
              Salvar
            </Button>
          </S.Form>
        </S.ModalBody>
      </S.Overlay>
    </Modal>
  );
}
