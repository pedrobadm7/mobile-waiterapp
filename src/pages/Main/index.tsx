import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';
import * as S from './styles';
import { Category } from '../../types/Category';

import { api } from '../../utils/api';
import { Header } from '../../components/Header';
import { Categories } from '../../components/Categories';
import { Menu } from '../../components/Menu';
import { Empty } from '../../components/Icons/Empty';
import { Text } from '../../components/Text';
import { Button } from '../../components/Button';
import { Cart } from '../../components/Cart';
import { TableModal } from '../../components/TableModal';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/products')
    ]).then(([categoriesResponse, productsResponse]) => {
      setCategories(categoriesResponse.data);
      setProducts(productsResponse.data);
      console.log({categories, products})
      setIsLoading(false);
    });
  }, []);

  async function handleSelectCategory(categoryId: string) {
    try {
      setIsLoadingProducts(true);
      const route = !categoryId
        ? '/products'
        : `/categories/${categoryId}/products`;

      const { data } = await api.get(route);

      setProducts(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadingProducts(false);
    }
  }

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

        {isLoading ? (

          <S.CenteredContainer>
            <ActivityIndicator
              color="#D73035"
              size="large"
            />
          </S.CenteredContainer>

        ) : (
          <>
            <S.CategoriesContainer>
              <Categories
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </S.CategoriesContainer>

            {isLoadingProducts ? (
              <S.CenteredContainer>
                <ActivityIndicator
                  color="#D73035"
                  size="large"
                />
              </S.CenteredContainer>
            ) : (
              <>
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
            )}
          </>
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
            selectedTable={selectedTable}
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
