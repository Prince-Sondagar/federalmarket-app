import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Image} from 'react-native';
import {ThemColors} from '../../App';
import {RootScreenEnum} from '../../constants';
import {NavigationProps} from '../../interfaceTypes';

const areaList = [
  {image: require('../../assets/img/shopArea/area1.png'), title: 'Hospital'},
  {
    image: require('../../assets/img/shopArea/area2.png'),
    title: 'School/collage',
  },
  {
    image: require('../../assets/img/shopArea/area3.png'),
    title: 'Railway Station',
  },
  {
    image: require('../../assets/img/shopArea/area4.png'),
    title: 'Offices',
  },
  {
    image: require('../../assets/img/shopArea/area5.png'),
    title: 'Cafe',
  },
];

function AddAreaInfo({navigation}: NavigationProps): JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  return (
    <View style={{flex: 1, position: 'relative'}}>
      <View style={styles(colors).header}>
        <View style={[styles(colors).headerRow]}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Feather
              onPress={() => {
                navigation.goBack();
              }}
              name="arrow-left"
              color={colors.card}
              size={24}
            />
            <Text
              style={{
                color: colors.text,
                fontSize: 16,
                fontWeight: '600',
                paddingLeft: 16,
              }}>
              {t('proximity.heading')}
            </Text>
          </View>
          <View>
            <Text
              style={{color: colors.primary, fontSize: 16, fontWeight: '600'}}
              onPress={() => navigation.navigate(RootScreenEnum.AREA_INFO)}>
              {t('proximity.title')}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={{marginBottom: 85}}>
          <View style={styles(colors).container}>
            <View style={[styles(colors).galleryView, styles(colors).flex]}>
              {areaList.map((list, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles(colors).galleryCard}>
                  <View style={styles(colors).cardImg}>
                    <Image source={list.image} />
                  </View>
                  <Text style={styles(colors).cardTitle}>{list.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default AddAreaInfo;

const styles = (colors: ThemColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
    },
    header: {
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      marginBottom: 16,
    },
    headerRow: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 16,
      justifyContent: 'space-between',
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    galleryView: {
      rowGap: 16,
      columnGap: 14,
    },
    galleryCard: {
      width: '30.87%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
    },
    cardImg: {
      height: 117,
      borderRadius: 8,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: '#FAFAFA',
    },
    cardTitle: {
      marginTop: 6,
      textAlign: 'center',
      color: colors.card + '90',
      fontSize: 12,
      lineHeight: 16,
    },
  });
