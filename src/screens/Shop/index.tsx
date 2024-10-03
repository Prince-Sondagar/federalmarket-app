import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import { ThemColors } from '../../App';
import { RootScreenEnum } from '../../constants';
import ButtonComp from '../../components/Button';
import useRetailers from '../../store/hooks/useRetailers';
import { isStepCompeleted } from '../../utils';

const steps = [
  {
    img: require('../../assets/img/shopInfo/shop.png'),
    title: 'shop.heading',
    path: RootScreenEnum.SHOP_INFO,
  },
  {
    img: require('../../assets/img/shopInfo/timing.png'),
    title: 'shop.heading_1',
    path: RootScreenEnum.TIMINGS,
  },
  {
    img: require('../../assets/img/shopInfo/debitCard.png'),
    title: 'shop.heading_2',
    path: RootScreenEnum.SHOP_PAYMENT,
  },
  {
    img: require('../../assets/img/shopInfo/location.png'),
    title: 'shop.heading_3',
    path: RootScreenEnum.AREA_INFO,
  },
  {
    img: require('../../assets/img/shopInfo/Group.png'),
    title: 'shop.heading_4',
    path: RootScreenEnum.SHOP_LOYALTY,
  },
];


function Shop({ navigation }: any): JSX.Element {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { updateRetailer, retailerInfo, isLoading ,updateRetaiterStoreImg} = useRetailers();

  const shopInfo = steps.map((step) => ({
    img: step.img,
    title: step.title,
    check: isStepCompeleted(step.path, retailerInfo),
    path: step.path,
  }));

  const handleUpdateShopInfo = async () => {
    const landmarkTypeIds = retailerInfo?.landmarkTypes.map((ldm: any) =>
      ldm.id ? ldm.id : ldm,
    );
   
    const requestBody = {
      ...retailerInfo,
      // loyalityProgrammeIds: retailerInfo?.loyalityAffilations,
      loyalityAffilationIds: retailerInfo?.loyalityAffilations,
      landmarkTypeIds: landmarkTypeIds,
      ...(retailerInfo?.storeImages && retailerInfo.storeImages.length > 0
        ? { storeImages: retailerInfo.storeImages }
        : {}),
    };

    delete requestBody.id;
    delete requestBody.loyalityAffilations;
    delete requestBody.landmarkTypes;

    //  const updateStatus= await updateRetaiterStoreImg(retailerInfo?.id as any, retailerInfo?.storeImages)
    //  console.log("updateStatus===>",updateStatus);
    
     const status = await updateRetailer(requestBody, retailerInfo?.id as any);

    if (status === true) {
      navigation.navigate(RootScreenEnum.HOME_SCREEN);
    }
  };

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Image
        style={{ width: '100%', height: '100%', position: 'absolute' }}
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
          <Text style={{ color: colors.text, fontSize: 16, fontWeight: '600' }}>
            {t('shop.title')}
          </Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles(colors).container}>
          {shopInfo.map((shop, index) => (
            <TouchableOpacity
              key={index}
              style={styles(colors).shopRow}
              onPress={() => navigation.navigate(shop?.path)}>
              <View style={styles(colors).shopImgPart}>
                <View style={styles(colors).shopImg}>
                  <Image source={shop.img} />
                </View>
                <Text style={styles(colors).shopTitle}>{t(shop.title)}</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {shop.check ? <Ionicons name="checkmark-circle" color={'#67C265'} size={20} /> : ''}
                <EvilIcons name="chevron-right" color={colors.card} size={36} />
              </View>
            </TouchableOpacity>
          ))}

          <View>
            <ButtonComp
              title={t('Update')}
              disabled={isLoading}
              onPress={handleUpdateShopInfo}
              loading={isLoading}
            />
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

export default Shop;

const styles = (colors: ThemColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      flex: 1,
      paddingTop: 14,
    },
    header: {
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    headerRow: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 16,
    },
    shopRow: {
      backgroundColor: colors.background,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
      padding: 16,
    },
    shopImg: {
      height: 56,
      width: 56,
      borderRadius: 30,
      backgroundColor: '#FAFAFA',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    shopImgPart: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    shopTitle: {
      fontSize: 16,
      color: colors.card,
    },
  });
