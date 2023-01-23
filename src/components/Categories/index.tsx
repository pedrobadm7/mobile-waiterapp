import { FlatList } from 'react-native';
import * as S from './styles';
import { categories } from '../../mocks/categories';
import { Text } from '../Text';
export function Categories() {
  return (
    <>
      <FlatList
        data={categories}
        keyExtractor={category => category._id}
        horizontal
        contentContainerStyle={{ paddingRight: 24 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <S.Category key={item._id}>
            <S.Icon>
              <Text>{item.icon}</Text>
            </S.Icon>
            <Text size={14} weight='600'>{item.name}</Text>
          </S.Category>
        )}
      />
      {/* {categories.map((category) => {
        return (
          <S.Category key={category._id}>
            <S.Icon>
              <Text>{category.icon}</Text>
            </S.Icon>
            <Text size={14} weight='600'>{category.name}</Text>
          </S.Category>
        );
      })} */}
    </>
  );
}
