import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useTranslation} from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import {ThemColors} from '../../App';
import ButtonComp from '../Button';
import {NavigationProps} from '../../interfaceTypes';
import {RootScreenEnum} from '../../constants';
import {formatTime, isShopOpenNow} from '../../utils';
import useRetailers from '../../store/hooks/useRetailers';
import {Retailer} from '../../store/types/stateTypes';

const galleryList = [
  {image: require('../../assets/img/bodyBath/image22.png')},
  {image: require('../../assets/img/bodyBath/image22.png')},
  {image: require('../../assets/img/bodyBath/image22.png')},
  {image: require('../../assets/img/bodyBath/image22.png')},
  {image: require('../../assets/img/bodyBath/image22.png')},
  {image: require('../../assets/img/bodyBath/image22.png')},
];

function ShopDetail({navigation}: NavigationProps): JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const currentDay = new Date()
    .toLocaleString('en-us', {weekday: 'long'})
    .split(',')[0]
    .toUpperCase();
  const {retailerInfo} = useRetailers();

  const {retailerContacts, operatingTime, name, retailerType} =
    retailerInfo as Retailer;

  const currentDayTime = operatingTime?.find(
    shopTime => shopTime.day.toUpperCase() === currentDay,
  );

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <Image
        style={{width: '100%', height: '100%', position: 'absolute'}}
        source={require('../../assets/img/login/bg.png')}
      />
      <View style={styles(colors).header}>
        <View style={[styles(colors).headerRow]}>
          <Feather
            onPress={() => {
              navigation.goBack();
            }}
            name="arrow-left"
            color={colors.card}
            size={24}
          />
          {name && (
            <Text style={{color: colors.text, fontSize: 16, fontWeight: '600'}}>
              {name}
            </Text>
          )}
        </View>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={{marginBottom: 85}}>
          <View style={{position: 'relative'}}>
            <Image
              style={{width: '100%',height:120}}
              source={{uri: retailerInfo?.storeImages?.[0]}}
            />
            <View
              style={[
                styles(colors).opencontent,
                {
                  backgroundColor: isShopOpenNow(operatingTime)
                    ? '#67C265'
                    : '#FF3131',
                },
              ]}>
              <Feather name="clock" color={'#fff'} size={16} />
              <Text style={styles(colors).openText}>
                {isShopOpenNow(operatingTime)
                  ? t('store.title')
                  : t('close Now')}
              </Text>
            </View>
          </View>
          <View style={styles(colors).container}>
            <View style={styles(colors).shopCard}>
              {name && <Text style={styles(colors).shopTitle}>{name}</Text>}
              <View style={[styles(colors).flex, styles(colors).cardDetail]}>
                {retailerContacts && (
                  <View style={styles(colors).flex}>
                    <Feather name="user" color={colors.card} size={16} />
                    {retailerContacts?.map((rcd, index) => (
                      <Text key={index} style={styles(colors).cardUser}>
                        {rcd.firstName} {rcd.lastName}
                      </Text>
                    ))}
                  </View>
                )}
                {retailerType && (
                  <Text style={styles(colors).cardUser}>{retailerType}</Text>
                )}
              </View>
              {operatingTime && (
                <View style={[styles(colors).flex, styles(colors).time]}>
                  <Feather name="clock" color={colors.card} size={16} />
                  {currentDayTime && (
                    <Text style={styles(colors).cardUser}>
                      {currentDayTime.day} |{' '}
                      {formatTime(currentDayTime?.startTime)} to{' '}
                      {formatTime(currentDayTime?.endTime)}
                    </Text>
                  )}
                </View>
              )}
              {retailerContacts && (
                <View style={styles(colors).flex}>
                  <Feather name="phone" color={colors.card} size={16} />
                  {retailerContacts?.map((rtc, index) => (
                    <Text key={index} style={styles(colors).cardUser}>
                      {rtc.mobileNumber}
                    </Text>
                  ))}
                </View>
              )}
            </View>
            <View style={[styles(colors).flex, styles(colors).cornerRow]}>
              <Text style={styles(colors).cornerTitle}>
                {t('store.heading')}
              </Text>
              <Text style={styles(colors).viewAllTitle}>
                {t('store.heading_1')}
              </Text>
            </View>
            <View style={[styles(colors).galleryView, styles(colors).flex]}>
              {galleryList.map((list, index) => (
                <View key={index} style={styles(colors).galleryCard}>
                  <View style={styles(colors).cardImg}>
                    <Image source={list.image} />
                  </View>
                  <View>
                    <Text style={styles(colors).brandsubTitle}>
                      Dove Beauty Cream Bar Soap
                    </Text>
                    <Text style={{color: colors.card, fontSize: 12}}>
                      100pc.
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles(colors).menumain}>
        <View style={[styles(colors).menuRow, styles(colors).flex]}>
          <View style={styles(colors).menuCol}>
            <ButtonComp
              title={t('store.button')}
              disabled={false}
              icon={
                <MaterialIcons name="storefront" color={'#FAFAFA'} size={18} />
              }
              onPress={() => navigation.navigate(RootScreenEnum.SHOP_SCREEN)}
            />
          </View>
          <View style={styles(colors).menuCol}>
            <ButtonComp
              title={t('store.button_1')}
              disabled={false}
              icon={
                <MaterialIcons name="storefront" color={'#FAFAFA'} size={18} />
              }
              onPress={() => navigation.navigate(RootScreenEnum.SKU_SCREEN)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default ShopDetail;

const styles = (colors: ThemColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      flex: 1,
    },
    header: {
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    headerRow: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 16,
    },
    opencontent: {
      position: 'absolute',
      bottom: 40,
      paddingTop: 6,
      paddingBottom: 10,
      paddingHorizontal: 8,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      right: 16,
      display: 'flex',
      flexDirection: 'row',
      gap: 4,
      alignItems: 'center',
    },
    openText: {
      fontSize: 12,
      color: '#FAFAFA',
    },
    shopCard: {
      paddingHorizontal: 12,
      paddingTop: 12,
      paddingBottom: 16,
      borderRadius: 8,
      backgroundColor: colors.background,
      marginTop: -44,
      marginBottom: 16,
      shadowColor: 'rgba(0,0,0,0.3)',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      elevation: 28,
    },
    shopTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingBottom: 12,
      marginBottom: 12,
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    cardDetail: {
      gap: 16,
      justifyContent: 'flex-start',
      marginBottom: 10,
    },
    cardUser: {
      color: colors.card,
      fontSize: 14,
      marginLeft: 4,
    },
    time: {
      marginBottom: 10,
    },
    cornerRow: {
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    cornerTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    viewAllTitle: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: '500',
    },
    galleryView: {
      gap: 14,
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
    },
    brandsubTitle: {
      fontSize: 12,
      color: colors.card + 90,
      lineHeight: 16,
      paddingVertical: 4,
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
    menuRow: {
      justifyContent: 'center',
      gap: 16,
    },
    menuCol: {
      width: '47%',
    },
  });
