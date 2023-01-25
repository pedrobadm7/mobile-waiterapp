import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import * as S from './styles';

interface CartProps {
  cartItems: CartItem[];
}

export function Cart({ cartItems }: CartProps) {
  return (
    <FlatList
      data={cartItems}
      keyExtractor={cartItem => cartItem.product._id}
      showsVerticalScrollIndicator={false}
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
  );
}
