import { FlatList } from 'react-native';
import * as S from './styles';

import { Text } from '../Text';
import { useState } from 'react';
import { Category } from '../../types/Category';

interface CategoriesProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => Promise<void>;
}

export function Categories({ categories, onSelectCategory }: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? '' : categoryId;

    onSelectCategory(category);
    setSelectedCategory(category);
  }

  return (
    <>
      <FlatList
        data={categories}
        keyExtractor={category => category._id}
        horizontal
        contentContainerStyle={{ paddingRight: 24 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: category }) => {
          const isSelected = selectedCategory === category._id;
          return (
            <S.Category key={category._id} onPress={() => handleSelectCategory(category._id)}>
              <S.Icon>
                <Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
              </S.Icon>
              <Text size={14} weight='600' opacity={isSelected ? 1 : 0.5}>{category.name}</Text>
            </S.Category>
          );
        }}
      />
    </>
  );
}
