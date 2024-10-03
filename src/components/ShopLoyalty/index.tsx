import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import { ThemColors } from '../../App';
import ButtonComp from '../Button';
import { RootScreenEnum } from '../../constants';
import useRetailers from '../../store/hooks/useRetailers';
import Loader from '../Loader';
import { Retailer } from '../../store/types/stateTypes';


function ShopLoyalty({ navigation }: any): JSX.Element {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [loyalityAffilations, setLoyaltyAffiliations] = useState<string[]>([]);
  const { isLoading, getBrands, brandsInfo } = useRetailers();
  const { retailerInfo, setRetailersShopInfoData } = useRetailers();

console.log("brandsInfo==>",brandsInfo);

console.log("retailerInfo?.loyalityAffilations==>",retailerInfo?.loyalityAffilations);


  useEffect(() => {
    getBrands();
  }, []);

  const handleSubmit = () => {
    setRetailersShopInfoData({
      ...retailerInfo,
      loyalityAffilations,
    } as Retailer);
    navigation.navigate(RootScreenEnum.SHOP_SCREEN);
  };

  useEffect(() => {
    setLoyaltyAffiliations(retailerInfo?.loyalityAffilations ?? []);
  }, [retailerInfo]);

  const toggleSelection = (id: string) => {
    const isSelctedBrand = loyalityAffilations.includes(id);
    if (isSelctedBrand) {
      setLoyaltyAffiliations(loyalityAffilations.filter((afl) => afl !== id))
    } else {
      setLoyaltyAffiliations([...loyalityAffilations, id])
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={{ flex: 1, position: 'relative' }}>
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
              <Text
                style={{ color: colors.text, fontSize: 16, fontWeight: '600' }}>
                {t('loyalty.heading')}
              </Text>
            </View>
          </View>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ marginBottom: 85 }}>
              <View style={styles(colors).container}>
                <View style={[styles(colors).galleryView, styles(colors).flex]}>
                  {brandsInfo?.map((list, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles(colors).galleryCard}
                      onPress={() =>
                        toggleSelection(list.id.toString())
                      }>
                      <View
                        style={[
                          styles(colors).cardImg,
                          loyalityAffilations?.includes(list.id.toString()) &&
                          styles(colors).selectedCard,
                        ]}>
                        <Image source={{ uri: list?.logo }} />
                        {loyalityAffilations?.includes(list.id.toString()) && (
                          <Ionicons
                            name="checkmark-circle"
                            style={styles(colors).checkIcon}
                            color={colors.primary + '80'}
                            size={26}
                          />
                        )}
                      </View>
                      <Text style={styles(colors).cardTitle}>{list.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles(colors).menumain}>
            <ButtonComp
              title={t('loyalty.button')}
              disabled={false}
              onPress={handleSubmit}
            />
          </View>
        </View>
      )}
    </>
  );
}

export default ShopLoyalty;

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
