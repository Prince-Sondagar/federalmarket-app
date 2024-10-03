import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Feather from 'react-native-vector-icons/Feather';
import { ThemColors } from '../../App';
import { RootScreenEnum } from '../../constants';
import { NavigationProps } from '../../interfaceTypes';
import useRetailers from '../../store/hooks/useRetailers';
import { ProductCategory } from '../../store/types/stateTypes';
import { ListItem } from '../../components/SearchBar';

const galleryList = [
  {
    image: require('../../assets/img/skuDetail/image1.png'),
    title: 'Sweet tooths',
  },
  {
    image: require('../../assets/img/skuDetail/image2.png'),
    title: 'Body & bath',
  },
  { image: require('../../assets/img/skuDetail/image3.png'), title: 'Spices' },
  { image: require('../../assets/img/skuDetail/image9.png'), title: 'vegetable' },
  { image: require('../../assets/img/skuDetail/image4.png'), title: 'fruits' },
  {
    image: require('../../assets/img/skuDetail/image5.png'),
    title: 'Dairy products',
  },
  {
    image: require('../../assets/img/skuDetail/image6.png'),
    title: 'Rice & atta',
  },
  { image: require('../../assets/img/skuDetail/image7.png'), title: 'Hygiene' },
  { image: require('../../assets/img/skuDetail/image8.png'), title: 'Munchies' },
  {
    image: require('../../assets/img/skuDetail/image6.png'),
    title: 'Rice & atta',
  },
  { image: require('../../assets/img/skuDetail/image7.png'), title: 'Hygiene' },
  { image: require('../../assets/img/skuDetail/image8.png'), title: 'Munchies' },
  {
    image: require('../../assets/img/skuDetail/image6.png'),
    title: 'Rice & atta',
  },
  { image: require('../../assets/img/skuDetail/image7.png'), title: 'Hygiene' },
  { image: require('../../assets/img/skuDetail/image8.png'), title: 'Munchies' },
  {
    image: require('../../assets/img/skuDetail/image6.png'),
    title: 'Rice & atta',
  },
  { image: require('../../assets/img/skuDetail/image7.png'), title: 'Hygiene' },
  { image: require('../../assets/img/skuDetail/image8.png'), title: 'Munchies' },
];

function Sku({ navigation }: NavigationProps): JSX.Element {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { productCategory, getSkuproductCategory } = useRetailers();
  const [skuProductCategory, setSkuProductCategory] = useState<ProductCategory[]>([]);

  useEffect(() => {
    getSkuproductCategory();
  }, [])

  useEffect(() => {
    const category = productCategory?.filter((category) => category.parentProductCategory == null);
    setSkuProductCategory(category);
  }, [productCategory.length]);


  const handleSelect = (selectedOption: ListItem) => {
    if (selectedOption)
      navigation.navigate(RootScreenEnum.BATH_SCREEN, {
        selectedCategory: selectedOption
      })
  }

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Image
        style={{ width: '100%', height: '100%', position: 'absolute' }}
        source={require('../../assets/img/login/bg.png')}
      />
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            marginBottom: 14,
            paddingVertical: 12,
            paddingHorizontal: 16,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
          }}>
          <Feather
            onPress={() => {
              navigation.goBack();
            }}
            name="arrow-left"
            color={colors.card}
            size={20}
          />
          <Text style={styles(colors).title}>SKU</Text>
        </View>
        <View style={styles(colors).container}>
          <Pressable
            style={styles(colors).searchbar}
            onPress={() => navigation.navigate(RootScreenEnum.SEARCH_SCREEN, {
              options: skuProductCategory,
              handleSelect: handleSelect
            })}
          >
            <Feather name="search" color={colors.card + '80'} size={26} />
            <Text style={{ fontSize: 16, color: colors.card + '80' }}>
              {t('sku.heading')}
            </Text>
          </Pressable>
          <View style={[styles(colors).galleryView, styles(colors).flex]}>
            {skuProductCategory?.map((list, index) => (
              <Pressable
                onPress={() => navigation.navigate(RootScreenEnum.BATH_SCREEN, {
                  selectedCategory: list
                })}
                key={index}
                style={styles(colors).galleryCard}>
                <View style={styles(colors).cardImg}>
                  <Image source={{ uri: list.image ?? "" }}
                    style={{ flex: 1, height: 100, width: 100 }}
                    resizeMode='contain'
                  />
                </View>
                <View>
                  <Text style={styles(colors).pieceTitle}>{list.name}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView >
    </View >
  );
}

export default Sku;

const styles = (colors: ThemColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    galleryView: {
      columnGap: 14,
    },
    galleryCard: {
      width: '30.87%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardImg: {
      width: '100%',
      borderRadius: 8,
      backgroundColor: '#FAFAFA',
      borderWidth: 1,
      borderColor: colors.border,
      height: 117,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 16,
    },
    pieceTitle: {
      textAlign: 'center',
      fontSize: 12,
      color: colors.card + '90',
      lineHeight: 16,
      paddingTop: 6,
    },
    searchbar: {
      backgroundColor: '#FAFAFA',
      minHeight: 48,
      height: 48,
      fontSize: 16,
      borderRadius: 8,
      padding: 12,
      borderWidth: 1,
      borderColor: colors.border,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
  });
