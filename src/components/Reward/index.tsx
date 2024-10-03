import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Feather from 'react-native-vector-icons/Feather';
import { ThemColors } from '../../App';
import { NavigationProps } from '../../interfaceTypes';
import { ProductCategory, ProductCategoryImages } from '../../store/types/stateTypes';

function Reward({ navigation, category, selectedCategoory, categoryImages, setSelectedCategory }: NavigationProps & { setSelectedCategory: React.Dispatch<React.SetStateAction<number | undefined>>, categoryImages: ProductCategoryImages[], category: ProductCategory[], selectedCategoory: number | undefined }): JSX.Element {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles(colors).container}>
          <View
            style={{
              paddingVertical: 12,
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
            <Text style={styles(colors).title}>{t('bodyBath.heading')}</Text>
          </View>
        </View>
        <View style={[styles(colors).galleryView, styles(colors).flex]}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {category.map((list, index) => (
              <Pressable onPress={() => setSelectedCategory(list.id)}>
                <View key={index} style={{ ...styles(colors).galleryCard }}>
                  <View style={{ ...styles(colors).cardImg, backgroundColor: list.id == selectedCategoory ? "white" : "gray" }}>
                    <Image source={{ uri: list.image ?? "" }}
                      style={{ flex: 1, height: 10, width: 10 }}
                      resizeMode='contain'
                    />
                    {categoryImages?.find((category) => category.productCategoryId == list.id)?.images?.length && <Ionicons name="checkmark-circle" color={'#67C265'} size={20} />}
                  </View>
                  <View>
                    <Text style={styles(colors).pieceTitle}>{list.name}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <View style={styles(colors).container}>
          <View style={styles(colors).collectBox}>
            <View style={styles(colors).orange}></View>
            <Image
              style={{ position: 'absolute', zIndex: 1, right: 25, top: 9 }}
              source={require('../../assets/img/bodyBath/coin.png')}
            />
            <Image
              style={{ position: 'absolute', right: 34, bottom: 11 }}
              source={require('../../assets/img/bodyBath/round.png')}
            />
            <Image
              style={{ position: 'absolute', bottom: 11, right: 56 }}
              source={require('../../assets/img/bodyBath/round1.png')}
            />
            <Image
              style={{ position: 'absolute', right: 0 }}
              source={require('../../assets/img/bodyBath/line.png')}
            />
            <Image
              style={{ position: 'absolute', right: 0 }}
              source={require('../../assets/img/bodyBath/line1.png')}
            />
            <Text style={styles(colors).dataTitle}>{t('bodyBath.heading_1')}</Text>
            <Text style={styles(colors).pointTitle}>{t('bodyBath.heading_2')}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
export default Reward;

const styles = (colors: ThemColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
    },
    orange: {
      width: '104%',
      height: 18,
      backgroundColor: '#FECD82',
      position: 'absolute',
      bottom: 0,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
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
      justifyContent: 'space-between',
    },
    galleryView: {
      backgroundColor: colors.primary,
      paddingTop: 15,
      paddingBottom: 12,
    },
    galleryCard: {
      marginLeft: 20,
      width: '13%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardImg: {
      width: '100%',
      borderRadius: 50,
      backgroundColor: '#FAFAFA',
      height: 75,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    pieceTitle: {
      textAlign: 'center',
      fontSize: 12,
      color: '#FAFAFA',
      lineHeight: 16,
      paddingTop: 2,
      fontWeight: '500',
    },
    collectBox: {
      backgroundColor: '#FBAF00' + 20,
      marginTop: 14,
      paddingTop: 18,
      paddingLeft: 16,
      paddingBottom: 28,
      borderRadius: 8,
      position: 'relative',
    },
    dataTitle: {
      fontSize: 14,
      fontWeight: '400',
      color: colors.text,
      lineHeight: 20,
    },
    pointTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      lineHeight: 20,
    },
  });
