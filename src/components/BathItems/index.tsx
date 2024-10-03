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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { ThemColors } from '../../App';
import ButtonComp from '../Button';
import Reward from '../Reward';
import AddImage from '../AddImages';
import { NavigationProps } from '../../interfaceTypes';
import { RootScreenEnum } from '../../constants';
import useRetailers from '../../store/hooks/useRetailers';
import {
  ProductCategory,
  ProductCategoryImages,
  RetailStoreImage,
  Retailer,
} from '../../store/types/stateTypes';

const frontImages = [
  { image: require('../../assets/img/bodyBath/image25.png') },
  { image: require('../../assets/img/bodyBath/image26.png') },
  { image: require('../../assets/img/bodyBath/image27.png') },
  { image: require('../../assets/img/bodyBath/image28.png') },
  { image: require('../../assets/img/bodyBath/image29.png') },
];

const brandList = [
  {
    image: require('../../assets/img/bodyBath/image19.png'),
    title: 'Lifeboy',
  },
  {
    image: require('../../assets/img/bodyBath/image20.png'),
    title: 'Dettol',
  },
  {
    image: require('../../assets/img/bodyBath/image21.png'),
    title: 'Lux',
  },
];

function BathItems({ route, navigation }: NavigationProps): JSX.Element {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const {
    productCategory,
    setRetailersShopInfoData,
    retailerInfo,
    updateRetailer,
  } = useRetailers();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [subCategory, setSubCategory] = useState<ProductCategory[]>([]);
  const [selectedCategoory, setSelectedCategory] = useState<number>();
  const [categoryImages, setCategoryImages] = useState<ProductCategoryImages[]>(
    [],
  );

  useEffect(() => {
    const { selectedCategory } = route?.params;
    const category = productCategory?.filter(
      category => category.parentProductCategory?.id == selectedCategory?.id,
    );
    setSelectedCategory(category?.[0]?.id);
    setSubCategory(category);
  }, [productCategory.length]);

  useEffect(() => {
    if (retailerInfo !== null) {
      setCategoryImages(retailerInfo.productCategoryImages ?? []);
    }
  }, [retailerInfo]);

  const toggleSelection = (index: number) => {
    const isSelected = selectedItems.includes(index);
    if (isSelected) {
      // If already selected, remove it from the array
      setSelectedItems(selectedItems.filter(item => item !== index));
    } else {
      // If not selected, add it to the array
      setSelectedItems([...selectedItems, index]);
    }
  };
  const isSelected = (index: number) => selectedItems.includes(index);

  const handleRemoveImage = (index: number) => {
    // setCategoryImages(
    //   categoryImages?.map(categoryImage =>
    //     categoryImage.productCategoryId == selectedCategoory
    //       ? {
    //         ...categoryImage,
    //         images: categoryImage.images.filter(
    //           (image, imageIndex) => index !== imageIndex,
    //         ),
    //       }
    //       : categoryImage,
    //   ),
    // );
    setCategoryImages([]);
  };

  const setSelectedCategoryImage = (selectedImages: string[]) => {
    const selectedCategoryData: any = subCategory?.find(
      category => category.id == selectedCategoory,
    );
    let newImages = categoryImages;
    if (
      newImages?.find(
        (categoryImage: any) => categoryImage?.productCategoryId == selectedCategoory,
      )
    ) {
      newImages = newImages?.map((categoryImage: any) =>
        categoryImage?.productCategoryId == selectedCategoory
          ? {
            ...categoryImage,
            images: [
              ...categoryImage?.images,
              ...selectedImages,
            ],
          }
          : categoryImage,
      );
    } else {
      newImages.push({
        productCategoryId: selectedCategoryData?.id,
        productCategoryName: selectedCategoryData?.name,
        images: selectedImages,
      });
    }

    setCategoryImages([...newImages]);
  };

  const handleSubmit = async () => {
    try {
      const updatedRetailerInfo = {
        productCategoryImages: categoryImages,
      };

      setRetailersShopInfoData({
        ...retailerInfo,
        ...updatedRetailerInfo,
      } as Retailer);

      const status = await updateRetailer(
        updatedRetailerInfo,
        retailerInfo?.id as any,
      );
      if (status) {
        navigation.navigate(RootScreenEnum.EARN_SCREEN);
      }
    } catch (error) {
      console.log('Error ==> ', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, marginBottom: 100 }}>
        <Reward navigation={navigation} category={subCategory} selectedCategoory={selectedCategoory} setSelectedCategory={setSelectedCategory} categoryImages={categoryImages} />
        {subCategory.length ? <><View style={styles(colors).container}>
          <Text
            style={{
              color: colors.text,
              fontSize: 16,
              fontWeight: '600',
              paddingBottom: 8,
              paddingTop: 14,
            }}>
            {t('bodyBath.heading_3')}
          </Text>
          <View>
            <View style={[styles(colors).galleryView]}>
              {(categoryImages?.filter((category) => category.productCategoryId == selectedCategoory)?.[0]?.images.length ?? 0) < 6 && <Pressable
                style={styles(colors).galleryCard}
                onPress={() =>
                  navigation.navigate(RootScreenEnum.CAMERA_SCREEN, {
                    prevRoute: RootScreenEnum.BATH_SCREEN,
                    setSelectedCategoryImage,
                  })
                }>
                <View style={[styles(colors).cardImg, styles(colors).addCard]}>
                  <Feather name="plus" color={'#20222FCC'} size={24} />
                  <Text style={{ fontSize: 16, color: colors.card + '90' }}>
                    Add
                  </Text>
                </View>
              </Pressable >}
              {
                categoryImages
                  ?.find(
                    category => category.productCategoryId == selectedCategoory,
                  )
                  ?.images.map((image, index) => (
                    <View key={index} style={styles(colors).galleryCard}>
                      <View style={styles(colors).cardImg}>
                        <Image
                          source={{ uri: image }}
                          style={{ width: '100%', height: '100%', borderRadius: 8 }}
                        />
                        <Text
                          style={styles(colors).closeIcon}
                          onPress={() => handleRemoveImage(index)}>
                          <AntDesign name="close" color={'#000'} size={12} />
                        </Text>
                        <View style={styles(colors).coinBox}>
                          <Text style={styles(colors).coinText}>20</Text>
                          <Image
                            source={require('../../assets/img/bodyBath/coin1.png')}
                          />
                        </View>
                      </View>
                    </View>
                  ))}
            </View>
          </View>
          <View style={styles(colors).add}>
            <View style={styles(colors).addBorder}></View>
            <Text style={styles(colors).addTitle}>or</Text>
            <View style={styles(colors).addBorder}></View>
          </View>
          <Text
            style={{
              color: colors.text,
              fontSize: 16,
              fontWeight: '600',
              paddingBottom: 8,
              paddingTop: 14,
            }}>
            {t('bodyBath.heading_4')}
          </Text>
          <View style={[styles(colors).addView, styles(colors).flex]}>
            {brandList.map((list, index) => (
              <Pressable
                key={index}
                style={styles(colors).brandCard}
                onPress={() => toggleSelection(index)}>
                <View
                  style={[
                    styles(colors).brandImg,
                    isSelected(index) && styles(colors).selectedCard,
                  ]}>
                  <Image source={list.image} />
                  {isSelected(index) && (
                    <Ionicons
                      name="checkmark-circle"
                      style={styles(colors).checkIcon}
                      color={colors.primary + '80'}
                      size={26}
                    />
                  )}
                </View>
                <View>
                  <Text style={styles(colors).brandTitle}>{list.title}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View >
          <AddImage /></> : <></>}
      </ScrollView >
      <View style={styles(colors).menumain}>
        <ButtonComp
          title={t('bodyBath.button')}
          onPress={() => handleSubmit()}
        />
      </View>
    </View >
  );
}
export default BathItems;

const styles = (colors: ThemColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
    },
    addCard: {
      backgroundColor: colors.text + '20',
    },
    add: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 14,
    },
    closeIcon: {
      height: 16,
      width: 16,
      position: 'absolute',
      top: 6,
      right: 6,
      backgroundColor: '#FAFAFA',
      borderRadius: 10,
      textAlign: 'center',
      lineHeight: 16,
    },
    galleryView: {
      gap: 16,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    galleryCard: {
      width: '30%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardImg: {
      height: 117,
      borderRadius: 8,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    addTitle: {
      fontSize: 14,
      color: colors.card + 60,
      textAlign: 'center',
    },
    brandImg: {
      width: '100%',
      borderRadius: 8,
      backgroundColor: '#FAFAFA',
      borderWidth: 1,
      borderColor: colors.border,
      height: 117,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    addBorder: {
      width: 170,
      height: 1,
      backgroundColor: colors.border,
    },
    addView: {
      columnGap: 14,
    },
    brandCard: {
      width: '30.87%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    pieceTitle: {
      textAlign: 'center',
      fontSize: 12,
      color: '#FAFAFA',
      lineHeight: 16,
      paddingTop: 2,
      fontWeight: '500',
    },
    brandTitle: {
      textAlign: 'center',
      fontSize: 12,
      color: colors.card + 90,
      lineHeight: 16,
      paddingTop: 6,
      fontWeight: '500',
    },
    menumain: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      backgroundColor: '#FAFAFA',
      zIndex: 10,
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.border,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    selectedCard: {
      backgroundColor: colors.primary + '20',
      borderColor: colors.primary,
      borderWidth: 2,
    },
    checkIcon: {
      position: 'absolute',
      top: 2,
      right: 2,
    },
    coinBox: {
      backgroundColor: colors.text + 70,
      position: 'absolute',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 4,
      bottom: 0,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
    coinText: {
      color: '#FAFAFA',
      fontSize: 14,
      lineHeight: 16,
      fontWeight: '500',
      textAlign: 'center',
      paddingRight: 4,
    },
  });
