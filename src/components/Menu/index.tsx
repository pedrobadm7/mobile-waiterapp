import { useState } from 'react';
import { FlatList } from 'react-native';
import { products } from '../../mocks/products';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { Text } from '../Text';

import * as S from './styles';

interface MenuProps {
  onAddToCart: (product: Product) => void;
}

export function Menu({ onAddToCart }: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleOpenModal(product: Product) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
      <FlatList
        data={products}
        keyExtractor={product => product._id}
        ItemSeparatorComponent={S.Separator}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        renderItem={({ item: product }) => {
          return (
            <S.Product onPress={() => handleOpenModal(product)}>
              <S.ProductImage
                source={{
                  uri: `http://192.168.100.7:3001/uploads/${product.imagePath}`,
                }}
              />

              <S.ProductDetails>
                <Text weight='600'>{product.name}</Text>
                <Text size={14} color='#666' style={{ marginVertical: 8 }}>
                  {product.description}
                </Text>
                <Text size={14} weight='600'>{formatCurrency(product.price)}</Text>
              </S.ProductDetails>

              <S.AddToCardButton onPress={() => onAddToCart(product)}>
                <PlusCircle />
              </S.AddToCardButton>
            </S.Product>
          );
        }}
      />
    </>
  );
}
