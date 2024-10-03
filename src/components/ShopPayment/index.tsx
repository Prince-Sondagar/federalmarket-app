import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ThemColors} from '../../App';
import ButtonComp from '../Button';
import {RootScreenEnum} from '../../constants';
import useRetailers from '../../store/hooks/useRetailers';
import {Retailer} from '../../store/types/stateTypes';
import {paymentMethodsTitleAdjustment} from '../../utils';
import {NavigationProps} from '../../interfaceTypes';

const paymentList = [
  {image: require('../../assets/img/shopPayment/payment1.png'), title: 'Upi'},
   {image: require('../../assets/img/shopPayment/payment3.png'), title: 'Paytm'},
  {
    image: require('../../assets/img/shopPayment/payment4.png'),
    title: 'PhonePay',
  },
  {
    image: require('../../assets/img/shopPayment/payment5.png'),
    title: 'GooglePay',
  },
  {image: require('../../assets/img/shopPayment/payment6.png'), title: 'Cod'},
  {
    image: require('../../assets/img/shopPayment/payment7.png'),
    title: 'BharatPe',
  },
];

function ShopPayment({navigation}: NavigationProps): JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {retailerInfo, setRetailersShopInfoData} = useRetailers();
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState<
    String[]
  >([]);

  useEffect(() => {
    setAvailablePaymentMethods(retailerInfo?.availablePaymentMethods ?? []);
  }, []);

  const savePaymentMethodHandler = () => {
    setRetailersShopInfoData({
      ...retailerInfo,
      availablePaymentMethods,
    } as Retailer);
    navigation.navigate(RootScreenEnum.SHOP_SCREEN);
  };

  const toggleSelection = (title: string) => {
    const isSelected = availablePaymentMethods.includes(title);
    if (isSelected) {
      setAvailablePaymentMethods(
        availablePaymentMethods.filter(item => item !== title),
      );
    } else {
      setAvailablePaymentMethods([...availablePaymentMethods, title]);
    }
  };

  return (
    <View style={{flex: 1, position: 'relative'}}>
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
          <Text style={{color: colors.text, fontSize: 16, fontWeight: '600'}}>
            {t('payment.heading')}
          </Text>
        </View>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={{marginBottom: 85}}>
          <View style={styles(colors).container}>
            <View style={[styles(colors).galleryView, styles(colors).flex]}>
              {paymentList.map((list, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles(colors).galleryCard}
                  onPress={() => toggleSelection(list.title)}>
                  <View
                    style={[
                      styles(colors).cardImg,
                      availablePaymentMethods?.includes(list.title) &&
                        styles(colors).selectedCard,
                    ]}>
                    <Image source={list.image} />
                    {availablePaymentMethods?.includes(list.title) && (
                      <Ionicons
                        name="checkmark-circle"
                        style={styles(colors).checkIcon}
                        color={colors.primary + '80'}
                        size={26}
                      />
                    )}
                  </View>
                  <Text style={styles(colors).cardTitle}>
                    {paymentMethodsTitleAdjustment?.[list.title]?.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles(colors).menumain}>
        <ButtonComp
          title={t('payment.button')}
          disabled={false}
          onPress={savePaymentMethodHandler}
        />
      </View>
    </View>
  );
}

export default ShopPayment;

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
    cardTitle: {
      marginTop: 6,
      textAlign: 'center',
      color: colors.card + '90',
      fontSize: 12,
      lineHeight: 16,
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
  });
