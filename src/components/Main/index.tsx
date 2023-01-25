import { useState } from 'react';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';
import { Button } from '../Button';
import { Cart } from '../Cart';
import { Categories } from '../Categories';
import { Header } from '../Header';
import { Menu } from '../Menu';
import { TableModal } from '../TableModal';
import * as S from './styles';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleCancelOrder() {
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
          onCancelOrder={handleCancelOrder}
        />

        <S.CategoriesContainer>
          <Categories />
        </S.CategoriesContainer>

        <S.MenuContainer>
          <Menu onAddToCart={handleAddToCart} />
        </S.MenuContainer>


      </S.Container>

      <S.Footer>
        {/* <S.FooterContainer> */}
        {!selectedTable ? <Button
          onPress={() => setIsTableModalVisible(true)}
        >
          Novo Pedido
        </Button> :
          <Cart
            cartItems={cartItems}
            onAdd={handleAddToCart}
            onDecrement={handleDecrementCartItem}
          />}
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
