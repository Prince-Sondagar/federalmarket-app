import React, { useEffect, useState } from 'react';
import {
  Image,
  PermissionsAndroid,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Geolocation from 'react-native-geolocation-service';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useTranslation } from 'react-i18next';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from '@react-navigation/native';
import CardComp from '../../components/Card';
import Menubar from '../../components/Menubar';
import FilterModal from '../../components/filterModal';
import { ThemColors } from '../../App';
import { RootScreenEnum } from '../../constants';
import { NavigationProps } from '../../interfaceTypes';
import useRetailers from '../../store/hooks/useRetailers';
import { userSummaryData } from '../../store/types/stateTypes';
import Loader from '../../components/Loader';
import { isShopOpenNow } from '../../utils';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

function Home({ navigation }: NavigationProps): JSX.Element {
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const { colors } = useTheme();
  const { t } = useTranslation();
  const {
    getUserSummaryData,
    userSummaryData,
    isLoading,
    getRetailersData,
    retailers,
  } = useRetailers();
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<any>({});
  const [locationName, setLocationName] = useState('')
  const [alertShow, setalertShow] = useState<{
    hasLocation: boolean;
    isClosed: boolean;
  }>({
    hasLocation: false,
    isClosed: false,
  });

  const isFocused = useIsFocused();

  useEffect(() => {
    if (location.latitude && location.longitude) {
      getUserSummaryData();
      getRetailersData(location?.latitude, location?.longitude);
    }
  }, [location, navigation]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        setalertShow({
          hasLocation: true,
          isClosed: true,
        });
        return true;
      } else {
        setalertShow({
          hasLocation: false,
          isClosed: false,
        });
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const showFilterModal = () => {
    setFilterModalVisible(true);
  };

  const hideFilterModal = () => {
    setFilterModalVisible(false);
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = (): void => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          async (position) => {
            const coords = position.coords;

            if (locationName === "") {
              const getLocationFromGoogle = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords?.latitude},${coords?.longitude}&key=AIzaSyAYuXTxBpjvOzdidP51eIXevaDWOi4McZY`);
              setLocationName(getLocationFromGoogle.data.results?.[0]?.formatted_address);
            }
            setLocation(coords);
          },
          error => {
            setLocation({});
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    });
  };

  return (
    <>
      {isLoading || locationLoading ? (
        <Loader size={30} color={colors.primary} />
      ) : (
        <View style={{ flex: 1, position: 'relative' }}>
          <Image
            style={{ width: '100%', height: '100%', position: 'absolute' }}
            source={require('../../assets/img/login/bg.png')}
          />
          <ScrollView style={{ flex: 1, zIndex: 1 }}>
            <View style={{ marginBottom: 58 }}>
              <View style={styles(colors).rectangle}>
                <View style={styles(colors).circle} />
                <View style={styles(colors).circle1} />
              </View>
              {!alertShow.hasLocation && !alertShow.isClosed ? (
                <View style={styles(colors).locationError}>
                  <View style={styles(colors).locationErrorRow}>
                    <Text style={{ color: '#FAFAFA', fontSize: 12 }}>
                      {t('home.heading_1')}
                    </Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 16,
                        alignItems: 'center',
                      }}>
                      <Text
                        onPress={getLocation}
                        style={{
                          color: colors.notification,
                          fontSize: 12,
                          lineHeight: 16,
                          borderRadius: 4,
                          paddingVertical: 6,
                          paddingHorizontal: 12,
                          backgroundColor: '#FAFAFA',
                        }}>
                        {t('home.heading_2')}
                      </Text>
                      <AntDesign
                        name="close"
                        onPress={() =>
                          setalertShow({ ...alertShow, isClosed: true })
                        }
                        color={colors.background}
                        size={18}
                      />
                    </View>
                  </View>
                </View>
              ) : (
                <></>
              )}
              <View style={styles(colors).dropdown}>
                <SelectDropdown
                  buttonStyle={{ backgroundColor: 'transparent', width: '65%' }}
                  defaultButtonText={'Iffco Chowk, Gurugram'}
                  dropdownStyle={{ backgroundColor: '#FAFAFA' }}
                  data={location}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                  }}
                  renderCustomizedButtonChild={(selectedItem, index) => {
                    return (
                      <View style={styles(colors).dropdown3BtnChildStyle}>
                        <EvilIcons name="location" color={'#fff'} size={30} />
                        <Text style={styles(colors).dropdownBtnTxtStyle}>
                          {/* {selectedItem
                            ? selectedItem.title
                            : locationName} */}
                          {locationName}
                        </Text>
                        <EvilIcons
                          name="chevron-down"
                          color={'#FFFFFF'}
                          size={34}
                        />
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 16,
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: colors.notification,
                              fontSize: 12,
                              lineHeight: 16,
                              borderRadius: 4,
                              paddingVertical: 6,
                              paddingHorizontal: 12,
                              backgroundColor: '#FAFAFA',
                            }}>
                            {t('home.heading_2')}
                          </Text>
                          <AntDesign
                            name="close"
                            color={colors.background}
                            size={18}
                          />
                        </View>
                      </View>
                    );
                  }}
                />
              </View>

              <View style={styles(colors).container}>
                <Pressable
                  style={styles(colors).searchbar}
                  onPress={() =>
                    navigation.navigate(RootScreenEnum.FIND_LOCATION)
                  }>
                  <Feather name="search" color={colors.card + '80'} size={26} />
                  <Text style={{ fontSize: 16, color: colors.card + '80' }}>
                    {t('home.title_9')}
                  </Text>
                </Pressable>
                <View
                  style={{
                    position: 'relative',
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    paddingHorizontal: 16,
                    paddingTop: 12,
                    paddingBottom: 26,
                    marginBottom: 28,
                    marginTop: 16,
                    shadowColor: 'rgba(0,0,0,0.3)',
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    elevation: 28,
                  }}>
                  <Image
                    style={styles(colors).starVector}
                    source={require('../../assets/img/home/star1.png')}
                  />
                  <Image
                    style={styles(colors).starVector1}
                    source={require('../../assets/img/home/star2.png')}
                  />
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 24,
                    }}>
                    <Text
                      style={{
                        color: colors.card,
                        fontSize: 16,
                        fontWeight: '600',
                      }}>
                      {t('home.heading')}
                    </Text>
                    <Image source={require('../../assets/img/home/star.png')} />
                  </View>
                  <View style={styles(colors).summaryRow}>
                    {userSummaryData?.map(
                      (counter: userSummaryData, index: number) => (
                        <Pressable
                          key={index}
                          style={styles(colors).summaryCol}
                          onPress={() =>
                            navigation.navigate(RootScreenEnum.HISTORY_SCREEN)
                          }>
                          <Text style={styles(colors).counterNo}>
                            {counter.value}
                          </Text>
                          <Text style={styles(colors).counterTitle}>
                            {t(counter.title as string)}
                          </Text>
                        </Pressable>
                      ),
                    )}
                  </View>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 16,
                  }}>
                  <Text style={styles(colors).shoptitle}>
                    {t('home.title_3')}
                  </Text>
                  <TouchableOpacity
                    onPress={showFilterModal}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                    }}>
                    <Text style={styles(colors).filtertitle}>
                      {t('home.title_4')}
                    </Text>
                    <Feather
                      name="filter"
                      style={{ color: colors.card + '90' }}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>

                {retailers?.map((rtl, index) => {
                  return (
                    <CardComp
                      key={index}
                      image={
                        {
                          uri: rtl?.storeImages?.[0],
                        } as any
                      }
                      retailer={rtl}
                      navigation={navigation}
                      startCollection={true}
                      isShopOpen={isShopOpenNow(rtl.operatingTime)}
                    />
                  );
                })}
                {/* <CardComp
                    image={require('../../assets/img/home/wholeFoods.png')}
                    shop="Whole foods market"
                    username="Sushank Kumar"
                    continueCollection={true}
                    navigation={navigation}
                    title={t('home.title_5')}
                  /> */}
                {/* <CardComp
                    image={require('../../assets/img/home/wholeFoods.png')}
                    shop="Navjeevan grocery store"
                    username="Rajnish Kumar"
                    doneCollection={true}
                    navigation={navigation}
                    style={{ backgroundColor: colors.notification }}
                    title={t('home.title_6')}
                  /> */}
              </View>
            </View>
          </ScrollView>
          <Menubar navigation={navigation} />
          <FilterModal
            title1={t('home.title_7')}
            title2={t('home.title_8')}
            isVisible={isFilterModalVisible}
            hideModal={hideFilterModal}
            icon={false}
          />
        </View>
      )}
    </>
  );
}

const styles = (colors: ThemColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      position: 'relative',
    },
    rectangle: {
      height: 246,
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: colors.primary,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
    circle: {
      height: 97,
      width: 97,
      borderRadius: 50,
      backgroundColor: 'rgba(32, 34, 47, 0.1)',
      position: 'absolute',
      top: 126,
      left: -35,
    },
    circle1: {
      height: 191,
      width: 191,
      borderRadius: 100,
      backgroundColor: 'rgba(32, 34, 47, 0.1)',
      position: 'absolute',
      top: -15,
      right: -59,
    },
    dropdown: {
      paddingTop: 12,
      paddingBottom: 12,
      paddingHorizontal: 16,
    },
    dropdownBtnStyle: {
      backgroundColor: 'transparent',
      width: '60%',
    },
    dropdownBtnTxtStyle: {
      color: '#FAFAFA',
      fontSize: 16,
      marginLeft: 10,
      marginRight: 2,
    },
    dropdown3BtnChildStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationError: {
      backgroundColor: colors.notification,
      paddingHorizontal: 14,
      paddingVertical: 12,
      marginBottom: 20,
    },
    locationErrorRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    searchbar: {
      backgroundColor: '#FAFAFA',
      minHeight: 48,
      height: 48,
      fontSize: 16,
      borderRadius: 8,
      padding: 12,
      borderWidth: 1,
      borderColor: colors.border,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    starVector: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    starVector1: {
      position: 'absolute',
      bottom: 0,
      left: 0,
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 16,
      gap: 16,
    },
    summaryCol: {
      width: '33.33%',
    },
    counterNo: {
      color: '#D57028',
      fontSize: 26,
      lineHeight: 36,
      textAlign: 'center',
      backgroundColor: '#D570281A',
      borderRadius: 8,
      paddingVertical: 8,
      fontWeight: '600',
    },
    counterTitle: {
      color: colors.card,
      fontSize: 12,
      textAlign: 'center',
      marginTop: 8,
    },
    shoptitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    filtertitle: {
      color: colors.card + '90',
      fontSize: 16,
      fontWeight: '500',
    },
  });

export default Home;
