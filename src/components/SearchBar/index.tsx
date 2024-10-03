import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { NavigationProp } from '@react-navigation/native';
import { ThemColors } from '../../App';
import { RootParamList } from '../../constants';


export interface ListItem {
  name: string,
  image: string
}
interface Props extends React.ComponentProps<typeof Pressable> {
  title?: string;
  searchIcon?: boolean;
  backIcon?: boolean;
  closeIcon?: boolean;
  navigation: NavigationProp<RootParamList>;
  options: ListItem[],
  handleSelect: (selectedOption: ListItem) => void
}

export default function SearchBar({ searchIcon, backIcon, options, closeIcon, handleSelect, navigation, ...props }: Props) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [renderList, setRenderList] = useState([...options]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setRenderList(options?.filter((option) =>
      option.name.toLowerCase().includes(text?.toLowerCase())))
  };

  return (
    <Pressable style={{ position: 'relative' }} {...props}>
      {searchIcon && (
        <Feather name="search" style={styles(colors).searchIcon} size={26} />
      )}
      {backIcon && (
        <Feather name="arrow-left" style={styles(colors).backIcon} size={22} onPress={() => { navigation.goBack() }} />
      )}
      <TextInput
        style={styles(colors).searchbar}
        placeholder={t('search.title')}
        onChangeText={handleSearch}
        value={searchQuery}
        placeholderTextColor={colors.card + '80'}
      />
      {closeIcon && (
        <AntDesign
          name="closecircleo"
          style={styles(colors).closeIcon}
          size={20}
          onPress={() => handleSearch('')}
        />
      )}
      <View style={{ marginTop: 10 }}>
        {renderList?.map((list, index) => (
          <Pressable onPress={() => handleSelect(list)}>
            <View key={index} style={styles(colors).locationRow}>
              <Image source={{ uri: list.image }} style={{ flex: 1, height: 100, width: 100 }} resizeMode='contain' />
              <Text style={styles(colors).pieceTitle}>{list?.name}</Text>
            </View>
          </Pressable>
        ))
        }
      </View >
    </Pressable >
  );
}

const styles = (colors: ThemColors) =>
  StyleSheet.create({
    searchbar: {
      backgroundColor: '#FAFAFA',
      minHeight: 48,
      height: 48,
      fontSize: 16,
      borderRadius: 8,
      padding: 12,
      paddingLeft: 46,
      borderWidth: 1,
      borderColor: colors.border,
    },
    locationRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      flexDirection: 'row',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    pieceTitle: {
      textAlign: 'center',
      fontSize: 12,
      color: colors.card + '90',
      lineHeight: 16,
    },
    searchIcon: {
      position: 'absolute',
      left: 12,
      lineHeight: 48,
      zIndex: 1,
      color: colors.card + '80',
    },
    backIcon: {
      position: 'absolute',
      left: 12,
      lineHeight: 48,
      zIndex: 1,
      color: colors.card,
    },
    closeIcon: {
      position: 'absolute',
      right: 12,
      lineHeight: 48,
      zIndex: 1,
      color: colors.card,
    },
  });
