import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { Text } from '../Text';
import * as S from './styles';

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void
  onDecrement: (product: Product) => void
  onConfirmOrder: () => void
}

export function Cart({
  cartItems,
  onAdd,
  onDecrement,
  onConfirmOrder
}: CartProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  function handleConfirmOrder() {
    setIsModalVisible(true);
  }

  function handleOk() {
    onConfirmOrder();
    setIsModalVisible(false);
  }

  return (
    <>
      <OrderConfirmedModal
        visible={isModalVisible}
        onOk={handleOk}
      />

      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item: cartItem }) => {
            return (
              <S.Item>
                <S.ProductContainer>
                  <S.Image source={{ uri: `http://192.168.100.7:3001/uploads/${cartItem.product.imagePath}` }} />
                  <S.QuantityContainer>
                    <Text size={14} color="#666">{cartItem.quantity}x</Text>
                  </S.QuantityContainer>

                  <S.ProductDetails>
                    <Text size={14} weight="600">{cartItem.product.name}</Text>
                    <Text size={14} color="#666" style={{ marginTop: 4 }}>{formatCurrency(cartItem.product.price)}</Text>
                  </S.ProductDetails>
                </S.ProductContainer>

                <S.Actions>
                  <TouchableOpacity style={{ marginRight: 24 }} onPress={() => onAdd(cartItem.product)}>
                    <PlusCircle />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                    <MinusCircle />
                  </TouchableOpacity>
                </S.Actions>
              </S.Item>
            );
          }}
        />
      ) : null}

      <S.Summary>
        <S.TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color='#666'>Total</Text>
              <Text weight='600' size={20}>{formatCurrency(total)}</Text>
            </>
          ) : (
            <Text color='#666'>Seu carrinho está vazio</Text>)
          }
        </S.TotalContainer>

        <Button
          disabled={cartItems.length === 0}
          loading={isLoading}
          onPress={handleConfirmOrder}
        >
          Confirmar pedido
        </Button>
      </S.Summary>
    </>
  );
}
