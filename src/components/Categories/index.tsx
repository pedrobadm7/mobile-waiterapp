import * as S from './styles';
import {
  categories
} from '../../mocks/categories';
import { Text } from '../Text';
export function Categories() {
  return (
    <>
      {categories.map((category) => {
        return (
          <S.Category key={category._id}>
            <S.Icon>
              <Text>{category.icon}</Text>
            </S.Icon>
            <Text size={14} weight='600'>{category.name}</Text>
          </S.Category>
        );
      })}
    </>
  );
}
