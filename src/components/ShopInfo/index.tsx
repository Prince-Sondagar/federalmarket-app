import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useTranslation} from 'react-i18next';
import SelectDropdown from 'react-native-select-dropdown';
import {ThemColors} from '../../App';
import ButtonComp from '../Button';
import {RootScreenEnum} from '../../constants';
import {NavigationProps, retailerType} from '../../interfaceTypes';
import {Retailer, ShopInfoData} from '../../store/types/stateTypes';
import useRetailers from '../../store/hooks/useRetailers';
import AntDesign from 'react-native-vector-icons/AntDesign';

const location: retailerType[] = ['ModernTrade', 'Pharmacy'];
function ShopInfo({navigation}: NavigationProps): JSX.Element {
  const {colors} = useTheme();
  const {retailerInfo, setRetailersShopInfoData} = useRetailers();
  const {t} = useTranslation();
  const [isTyping, setIsTyping] = useState(false);
  const [shopInfo, setShopInfo] = useState<ShopInfoData>({
    ownerName: '',
    shopContactNum: '',
    storeType: '',
    storeImages: [],
  });
  const [isnumber, setIsNumber] = useState(false);

  const handleFormChange = (
    field: keyof ShopInfoData,
    value: string | number,
  ) => {
    if (field === 'ownerName') {
      setIsTyping(typeof value == 'string' ? value?.length > 0 : false);
    } else if (field === 'shopContactNum') {
      setIsNumber(typeof value == 'string' ? value.length > 0 : false);
    }
    setShopInfo({...shopInfo, [field]: value});
  };

  useEffect(() => {
    if (retailerInfo !== null) {
      const reatalerContact =
        retailerInfo.retailerContacts && retailerInfo?.retailerContacts[0];
      setShopInfo({
        ...shopInfo,
        ownerName: reatalerContact?.firstName,
        shopContactNum: reatalerContact?.mobileNumber,
        storeType: retailerInfo?.retailerType,
        storeImages: retailerInfo?.storeImages,
      });
    }
  }, [retailerInfo]);

  const handleSubmit = () => {
    const updatedRetailerInfo = {
      retailerContacts: [
        {
          firstName: shopInfo.ownerName,
          mobileNumber: shopInfo.shopContactNum,
        },
      ],
      retailerType: shopInfo.storeType,
      storeImages: shopInfo.storeImages,
    };

    setRetailersShopInfoData({
      ...retailerInfo,
      ...updatedRetailerInfo,
    } as Retailer);
    navigation.navigate(RootScreenEnum.SHOP_SCREEN);
  };

  const handleRemoveImage = (imageLink: string) => {
    const storeImg = shopInfo?.storeImages?.filter(
      img => img !== imageLink,
    );
    setShopInfo({
      ...shopInfo,
      storeImages: storeImg ?? [],
    });
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
            {t('shopInfo.heading_4')}
          </Text>
        </View>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={{marginBottom: 85}}>
          <View style={styles(colors).container}>
            <View style={styles(colors).inputContainer}>
              <TextInput
                style={[
                  styles(colors).input,
                  isTyping || shopInfo.ownerName
                    ? styles(colors).inputTyping
                    : null,
                ]}
                onChangeText={text => handleFormChange('ownerName', text)}
                value={shopInfo.ownerName}
                autoComplete="password"
              />
              <Text
                style={[
                  styles(colors).placeholder,
                  isTyping || shopInfo.ownerName
                    ? styles(colors).inputplaceholder
                    : null,
                ]}>
                {t('shopInfo.heading')}
              </Text>
            </View>
            <View style={styles(colors).inputContainer}>
              <TextInput
                style={[
                  styles(colors).input,
                  isnumber || shopInfo.shopContactNum
                    ? styles(colors).inputTyping
                    : null,
                ]}
                onChangeText={text => handleFormChange('shopContactNum', text)}
                value={shopInfo.shopContactNum}
                keyboardType="numeric"
                autoComplete="password"
              />
              <Text
                style={[
                  styles(colors).placeholder,
                  isnumber || shopInfo.shopContactNum
                    ? styles(colors).inputplaceholder
                    : null,
                ]}>
                {t('shopInfo.heading_1')}
              </Text>
            </View>
            <SelectDropdown
              data={location}
              onSelect={(selectedItem, index) => {
                handleFormChange('storeType', selectedItem);
              }}
              defaultValue={shopInfo.storeType}
              renderCustomizedButtonChild={selectedItem => {
                return (
                  <View style={styles(colors).dropdown3BtnChildStyle}>
                    <Text style={styles(colors).dropdownBtnTxtStyle}>
                      {shopInfo.storeType}
                      {/* {t(
                        selectedItem
                          ? selectedItem.title
                          : 'shopInfo.heading_5',
                      )} */}
                    </Text>
                    <EvilIcons
                      name="chevron-down"
                      color={colors.text + '70'}
                      size={35}
                    />
                  </View>
                );
              }}
              buttonStyle={styles(colors).dropdownBtnStyle}
              dropdownOverlayColor="transparent"
              dropdownStyle={styles(colors).dropdownMenuStyle}
              selectedRowStyle={{backgroundColor: colors.primary}}
              selectedRowTextStyle={{color: colors.background}}
              rowTextStyle={{textAlign: 'left', paddingLeft: 5}}
              rowStyle={{borderBottomColor: colors.border}}
            />
            {/* <View style={styles(colors).cashierRow}>
              <View style={styles(colors).cashierCol}>
                <Text style={styles(colors).cashierTitle}>
                  {t('shopInfo.title')}
                </Text>
                <View
                  style={[styles(colors).input, styles(colors).cashierInput]}>
                  <Pressable
                    onPress={() => {
                      if (shopInfo.helper > 0) {
                        handleFormChange('helper', shopInfo.helper - 1);
                      }
                    }}>
                    <Feather
                      name="minus"
                      color={colors.text + '80'}
                      size={24}
                    />
                  </Pressable>
                  <Text style={{ color: colors.card + '80', fontSize: 16 }}>
                    {shopInfo.helper}
                  </Text>
                  <Pressable
                    onPress={() =>
                      handleFormChange('helper', shopInfo.helper + 1)
                    }>
                    <Feather name="plus" color={colors.primary} size={24} />
                  </Pressable>
                </View>
              </View>
              <View style={styles(colors).cashierCol}>
                <Text style={styles(colors).cashierTitle}>
                  {t('shopInfo.title_1')}
                </Text>
                <View
                  style={[styles(colors).input, styles(colors).cashierInput]}>
                  <Pressable
                    onPress={() => {
                      if (shopInfo.cashier > 0) {
                        handleFormChange('cashier', shopInfo.cashier - 1);
                      }
                    }}>
                    <Feather
                      name="minus"
                      color={colors.text + '80'}
                      size={24}
                    />
                  </Pressable>
                  <Text style={{ color: colors.card + '80', fontSize: 16 }}>
                    {shopInfo.cashier}
                  </Text>
                  <Pressable
                    onPress={() =>
                      handleFormChange('cashier', shopInfo.cashier + 1)
                    }>
                    <Feather name="plus" color={colors.primary} size={24} />
                  </Pressable>
                </View>
              </View>
            </View> */}
            <View style={styles(colors).ImageContainer}>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                  fontWeight: '600',
                  paddingBottom: 8,
                }}>
                {t('shopInfo.heading_2')}
              </Text>
              <View style={[styles(colors).galleryView]}>
                <Pressable
                  style={styles(colors).galleryCard}
                  onPress={() =>
                    navigation.navigate(RootScreenEnum.CAMERA_SCREEN, {
                      setShopInfo: setShopInfo,
                    })
                  }>
                  <View
                    style={[styles(colors).cardImg, styles(colors).addCard]}>
                    <Feather name="plus" color={'#20222FCC'} size={24} />
                    <Text style={{fontSize: 16, color: colors.card + '90'}}>
                      Add
                    </Text>
                  </View>
                </Pressable>
                {shopInfo?.storeImages?.map((imageLink, index: number) => (
                  <View key={index} style={styles(colors).galleryCard}>
                    <View style={styles(colors).cardImg}>
                      <Image
                        source={{uri: imageLink ?? imageLink}}
                        style={{width: '100%', height: '100%', borderRadius: 8}}
                      />
                      <Text style={styles(colors).closeIcon}>
                        <AntDesign
                          name="close"
                          onPress={() => handleRemoveImage(imageLink)}
                          color={'#000'}
                          size={12}
                        />
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            {/* <Text
              style={{
                color: colors.text,
                fontSize: 16,
                fontWeight: '600',
                paddingBottom: 8,
                paddingTop: 14,
              }}>
              {t('shopInfo.heading_3')}
            </Text> */}
            {/* <Pressable
              style={[styles(colors).galleryView]}
              onPress={() =>
                navigation.navigate(RootScreenEnum.CAMERA_SCREEN, {
                  setShopInfo: setShopInfo,
                })
              }>
              <View style={styles(colors).galleryCard}>
                <View style={[styles(colors).cardImg, styles(colors).addCard]}>
                  <Feather name="plus" color={'#20222FCC'} size={24} />
                  <Text style={{fontSize: 16, color: colors.card + '90'}}>
                    Add
                  </Text>
                </View>
              </View>
            </Pressable> */}
          </View>
        </View>
      </ScrollView>
      <View style={styles(colors).menumain}>
        <ButtonComp
          title={t('shopInfo.button')}
          disabled={false}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
}

export default ShopInfo;

const styles = (colors: ThemColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingTop: 14,
    },
    header: {
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerRow: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 16,
    },
    inputContainer: {
      position: 'relative',
    },
    input: {
      paddingHorizontal: 12,
      height: 48,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      backgroundColor: '#FAFAFA',
      color: colors.card,
      fontSize: 16,
      marginBottom: 14,
    },
    inputTyping: {
      backgroundColor: colors.background,
      color: colors.card,
    },
    placeholder: {
      position: 'absolute',
      top: 18,
      left: 12,
      fontSize: 16,
      lineHeight: 16,
      color: colors.card + '80',
      zIndex: 1,
    },
    inputplaceholder: {
      fontSize: 12,
      top: -8,
      backgroundColor: colors.background,
      paddingHorizontal: 4,
    },
    dropdownBtnStyle: {
      backgroundColor: '#FAFAFA',
      borderWidth: 1,
      borderColor: colors.border,
      width: '100%',
      paddingHorizontal: 12,
      height: 48,
      borderRadius: 8,
    },
    dropdownBtnTxtStyle: {
      color: colors.card + '80',
      fontSize: 16,
      marginRight: 2,
    },
    dropdown3BtnChildStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dropdownMenuStyle: {
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      textAlign: 'center',
      marginTop: 4,
    },
    cashierRow: {
      paddingVertical: 14,
      display: 'flex',
      gap: 12,
      flexDirection: 'row',
    },
    cashierCol: {
      width: '47%',
      display: 'flex',
      gap: 6,
    },
    cashierTitle: {
      fontSize: 16,
      color: colors.card + '80',
      lineHeight: 24,
    },
    cashierInput: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
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
    addCard: {
      backgroundColor: colors.text + '20',
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
    ImageContainer: {
      marginTop: '10%',
    },
  });
