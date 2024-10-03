import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Feather from 'react-native-vector-icons/Feather';
import { ThemColors } from '../../App';
import { NavigationProps } from '../../interfaceTypes';

const galleryList = [
  {
    image: require('../../assets/img/bodyBath/image15.png'),
    title: 'Sweet tooths',
  },
  {
    image: require('../../assets/img/bodyBath/image16.png'),
    title: 'Body & bath',
  },
  {
    image: require('../../assets/img/bodyBath/image17.png'),
    title: 'Sweet tooths',
  },
  {
    image: require('../../assets/img/bodyBath/image18.png'),
    title: 'Body & bath',
  },
  {
    image: require('../../assets/img/bodyBath/image18.png'),
    title: 'Body & bath',
  },
  {
    image: require('../../assets/img/bodyBath/image18.png'),
    title: 'Body & bath',
  },
  {
    image: require('../../assets/img/bodyBath/image18.png'),
    title: 'Body & bath',
  },
];
const paymentList = [
  { image: require('../../assets/img//bodyBath/image25.png') },
  {
    image: require('../../assets/img//bodyBath/image26.png'),
  },
  { image: require('../../assets/img//bodyBath/image27.png') },
  {
    image: require('../../assets/img//bodyBath/image28.png'),
  },
  {
    image: require('../../assets/img//bodyBath/image29.png'),
  },
  { image: require('../../assets/img//bodyBath/image29.png') },
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
function DataCollection({ navigation }: NavigationProps): JSX.Element {
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
            <Text style={styles(colors).title}>Body & bath</Text>
          </View>
        </View>
        <View style={[styles(colors).galleryView, styles(colors).flex]}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {galleryList.map((list, index) => (
              <View key={index} style={styles(colors).galleryCard}>
                <View style={styles(colors).cardImg}>
                  <Image source={list.image} />
                </View>
                <View>
                  <Text style={styles(colors).pieceTitle}>{list.title}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ marginBottom: 85 }}>
            <View style={styles(colors).container}>
              <View style={{
                flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 8,
                paddingTop: 16,
              }}>
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 16,
                    fontWeight: '600',
                  }}>
                  {t('bodyBath.title')}
                </Text>
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                  {t('bodyBath.title_1')}
                </Text>
              </View>
              <View style={[styles(colors).dataView, styles(colors).flex]}>
                {paymentList.map((list, index) => (
                  <View key={index} style={styles(colors).dataCard}>
                    <Image style={{ width: '100%', borderRadius: 8 }} source={list.image} />
                  </View>
                ))}
              </View>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                  fontWeight: '600',
                  paddingBottom: 8,
                  paddingTop: 16,
                }}>
                SKU
              </Text>
              <View style={[styles(colors).addView, styles(colors).flex]}>
                {brandList.map((list, index) => (
                  <View
                    key={index}
                    style={styles(colors).brandCard}
                  >
                    <View
                      style={
                        styles(colors).brandImg
                      }>
                      <Image source={list.image} />
                    </View>
                    <View>
                      <Text style={styles(colors).brandTitle}>{list.title}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}
export default DataCollection;

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
      justifyContent: 'space-between',
    },
    galleryView: {
      backgroundColor: colors.primary,
      paddingTop: 15,
      paddingBottom: 12,
    },
    galleryCard: {
      marginLeft: 20,
      width: '12%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardImg: {
      width: '100%',
      borderRadius: 50,
      backgroundColor: '#FAFAFA',
      height: 70,
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
    dataCard: {
      width: '30%',
      display: 'flex',
      alignItems: 'center',
    },
    dataView: {
      rowGap: 14,
      columnGap: 14,
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
    brandTitle: {
      textAlign: 'center',
      fontSize: 12,
      color: colors.card + 90,
      lineHeight: 16,
      paddingTop: 6,
      fontWeight: '500',
    },
  });
