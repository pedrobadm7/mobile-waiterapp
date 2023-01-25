import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';
import { Button } from '../Button';
import { Cart } from '../Cart';
import { Categories } from '../Categories';
import { Header } from '../Header';
import { Menu } from '../Menu';
import { TableModal } from '../TableModal';
import * as S from './styles';
import { Empty } from '../Icons/Empty';
import { Text } from '../Text';
import { Category } from '../../types/Category';
import axios from 'axios';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('http://192.168.100.7:3001/categories')
      .then((response) => {
        const { data } = response;

        setCategories(data);
      });

    axios.get('http://192.168.100.7:3001/products')
      .then((response) => {
        const { data } = response;

        setProducts(data);
      });
  }, []);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex((cartItem) => cartItem.product._id === product._id);

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product
        });
      }

      const newCartItems = [...prevState];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1
      };

      return newCartItems;
    });
  }

  function handleDecrementCartItem(product: Product) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex((cartItem) => cartItem.product._id === product._id);

      const item = prevState[itemIndex];

      if (item.quantity === 1) {
        const newCartItems = [...prevState];
        newCartItems.splice(itemIndex, 1);

        return newCartItems;
      }

      const newCartItems = [...prevState];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1
      };

      return newCartItems;

    });
  }



  return (
    <>
      <S.Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {!isLoading ? (
          <>
            <S.CategoriesContainer>
              <Categories categories={categories} />
            </S.CategoriesContainer>

            {products.length > 0 ? (
              <S.MenuContainer>
                <Menu
                  onAddToCart={handleAddToCart}
                  products={products}
                />
              </S.MenuContainer>
            ) : (
              <S.CenteredContainer>
                <Empty />
                <Text color="#666" style={{ marginTop: 24 }}>Nenhum produto foi encontrado!</Text>
              </S.CenteredContainer>
            )}
          </>
        ) : (
          <S.CenteredContainer>
            <ActivityIndicator
              color="#D73035"
              size="large"
            />
          </S.CenteredContainer>
        )}

      </S.Container>

      <S.Footer>
        {/* <S.FooterContainer> */}
        {!selectedTable ? (
          <Button
            onPress={() => setIsTableModalVisible(true)}
            disabled={isLoading}
          >
            Novo Pedido
          </Button>
        ) : (
          <Cart
            cartItems={cartItems}
            onAdd={handleAddToCart}
            onDecrement={handleDecrementCartItem}
            onConfirmOrder={handleResetOrder}
          />
        )}
        {/* </S.FooterContainer> */}
      </S.Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}
