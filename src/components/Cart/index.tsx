import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import * as S from './styles';

interface CartProps {
  cartItems: CartItem[];
}

export function Cart({ cartItems }: CartProps) {
  return (
    <>
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
                  <TouchableOpacity style={{ marginRight: 24 }}>
                    <PlusCircle />
                  </TouchableOpacity>

                  <TouchableOpacity>
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
              <Text weight='600' size={20}>{formatCurrency(35)}</Text>
            </>
          ) : (
            <Text color='#666'>Seu carrinho está vazio</Text>)
          }
        </S.TotalContainer>

        <Button onPress={() => console.log('Confirmar pedido')} disabled={cartItems.length === 0}>
          Confirmar pedido
        </Button>
      </S.Summary>
    </>
  );
}
