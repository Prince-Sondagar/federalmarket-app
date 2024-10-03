import React from 'react';
import {
  Image,
  ImageURISource,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import ButtonComp from '../Button';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';
import { ThemColors } from '../../App';
import { RootParamList, RootScreenEnum } from '../../constants';
import { Retailer } from '../../store/types/stateTypes';
import useRetailers from '../../store/hooks/useRetailers';

interface Props extends React.ComponentProps<typeof Pressable> {
  retailer: Retailer;
  image: ImageURISource;
  style?: ViewStyle;
  navigation: NavigationProp<RootParamList>;
  startCollection: boolean;
  isShopOpen: boolean;
}

export default function CardComp({
  retailer,
  image,
  style,
  startCollection,
  navigation,
  isShopOpen,
  ...props
}: Props) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { name, retailerType, retailerContacts } = retailer;
  const { setRetailersShopInfoData, isLoading } = useRetailers();


  const hadleSetRetailer = async () => {

    // const storeImages = retailer?.storeImages?.map(data => ({
    //   name: '',
    //   // data: convertImageToBinary(data.data ?? data) as any,
    //   data: data.data ?? data,
    //   format: '',
    // }));
    setRetailersShopInfoData({
      ...retailer,
      // storeImages: storeImages ?? [],
    });
    navigation.navigate(RootScreenEnum.SHOP_DETAIL);
  };

  return (
    <View>
      <Pressable style={styles(colors).card} {...props}>
        <View style={{ position: 'relative' }}>
          <Image
            style={{
              height: 100,
              width: '100%',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
            source={image}
          />
          <View
            style={[
              styles(colors).opencontent,
              style,
              { backgroundColor: isShopOpen ? '#67C265' : '#FF3131' },
            ]}>
            <Feather name="clock" color={'#fff'} size={16} />
            <Text style={styles(colors).openText}>
              {isShopOpen ? t('store.title') : t('close Now')}
            </Text>
          </View>
        </View>
        <View style={styles(colors).cardContent}>
          <Text style={styles(colors).cardTitle}>{name}</Text>
          <View style={[styles(colors).flex, styles(colors).cardDetail]}>
            {retailerContacts && (
              <View style={styles(colors).flex}>
                <Feather name="user" color={colors.card} size={16} />
                {retailerContacts?.map((rc, index) => (
                  <Text
                    key={index}
                    style={styles(colors).cardUser}>{`${rc.firstName}`}</Text>
                ))}
              </View>
            )}
            {retailerType && (
              <View style={styles(colors).flex}>
                <MaterialIcons
                  name="storefront"
                  color={colors.card}
                  size={16}
                />
                <Text style={styles(colors).cardUser}>{retailerType}</Text>
              </View>
            )}
          </View>
          {startCollection && (
            <ButtonComp
              title={t('home.button')}
              disabled={isLoading}
              onPress={hadleSetRetailer}
              loading={isLoading}
            />
          )}
          {/* {continueCollection && (
            <View style={{ position: 'relative' }}>
              <View style={styles(colors).progressBarContainer}>
                <View style={[styles(colors).progressBar]} />
              </View>
              <Text style={styles(colors).buttonText}>
                {t('home.button_1')}
              </Text>
            </View>
          )}
          {doneCollection && (
            <View style={styles(colors).button}>
              <Text
                style={{ color: colors.card, fontSize: 16, fontWeight: '500' }}>
                {t('home.button_2')}
              </Text>
            </View>
          )} */}
        </View>
      </Pressable>
    </View>
  );
}

const styles = (colors: ThemColors) =>
  StyleSheet.create({
    progressBarContainer: {
      width: '100%',
      height: 49,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      backgroundColor: '#FBAF00E5',
      width: '50%',
    },
    card: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      backgroundColor: '#FAFAFA',
      marginBottom: 21,
    },
    cardContent: {
      padding: 12,
    },
    cardTitle: {
      color: colors.text,
      fontWeight: '600',
      fontSize: 16,
      marginBottom: 10,
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
    },
    cardDetail: {
      gap: 16,
      justifyContent: 'flex-start',
      marginBottom: 16,
    },
    cardUser: {
      color: colors.card,
      fontSize: 14,
      marginLeft: 4,
    },
    buttonText: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      color: colors.card,
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 49,
      textAlign: 'center',
    },
    opencontent: {
      position: 'absolute',
      bottom: 0,
      paddingVertical: 6,
      paddingHorizontal: 8,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      right: 8,
      display: 'flex',
      flexDirection: 'row',
      gap: 4,
      alignItems: 'center',
    },
    openText: {
      fontSize: 12,
      color: '#FAFAFA',
    },
    button: {
      width: '100%',
      backgroundColor: '#67C265',
      padding: 14,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      gap: 10,
    },
  });
