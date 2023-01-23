import { Button } from '../Button';
import { Categories } from '../Categories';
import { Header } from '../Header';
import { Menu } from '../Menu';
import { TableModal } from '../TableModal';
import * as S from './styles';

export function Main() {
  return (
    <>
      <S.Container>
        <Header />

        <S.CategoriesContainer>
          <Categories />
        </S.CategoriesContainer>

        <S.MenuContainer>
          <Menu />
        </S.MenuContainer>


      </S.Container>

      <S.Footer>
        <S.FooterContainer>
          <Button
            onPress={() => alert('novo pedido')}
          >
            Novo Pedido
          </Button>
        </S.FooterContainer>
      </S.Footer>
      <TableModal />
    </>
  );
}
