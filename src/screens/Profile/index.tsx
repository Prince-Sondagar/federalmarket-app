import React, { useEffect } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationProps} from '../../interfaceTypes';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
import {ThemColors} from '../../App';
import Menubar from '../../components/Menubar';
import { RootScreenEnum } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../store/actions/authAction';
import { RootDispatch, RootState } from '../../store';
import Loader from '../../components/Loader';
import useRetailers from '../../store/hooks/useRetailers';

function Profile({ navigation }: NavigationProps): JSX.Element {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const { isLoading: logoutLoading } = useSelector((state: RootState) => state.auth);
  const { getUserProfileData, userProfileData } = useRetailers();

  //for logOut from the App 
  const handleLogOut = async () => {
    const status = await dispatch<RootDispatch>(logOut());
    if (status === true) {
      navigation.navigate(RootScreenEnum.LOGIN_SCREEN)
    }
  }

  useEffect(() => {
    getUserProfileData()
  }, [])

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <View style={styles(colors).header}>
        <Text
          style={{
            color: colors.text,
            fontSize: 16,
            fontWeight: '600',
          }}>
          {t('profile.heading')}
        </Text>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={{marginBottom: 58}}>
          <View style={styles(colors).profileMain}>
            <Image
              style={styles(colors).profileBgVector}
              source={require('../../assets/img/profile/profileBgVector.png')}
            />
            <Image
              style={styles(colors).profileBgVector1}
              source={require('../../assets/img/profile/profileBgVector1.png')}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate(RootScreenEnum.CAMERA_SCREEN)}>
              <View style={{position: 'relative'}}>
                <Image
                  style={{width: 88, height: 88}}
                  source={require('../../assets/img/profile/profile.png')}
                />
                <Text
                  style={styles(colors).editIcon}
                  onPress={() =>
                    navigation.navigate(RootScreenEnum.CAMERA_SCREEN)
                  }>
                  <Feather
                    name="edit-3"
                    style={{color: colors.primary}}
                    size={14}
                  />
                </Text>
              </View>
            </TouchableOpacity>
            <View>
              <Text
                style={{
                  color: '#FAFAFA',
                  fontSize: 16,
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                Mansh Kumar
              </Text>
              <Text style={{color: '#FAFAFA', textAlign: 'center'}}>
                Work Area: Gurugram
              </Text>
            </View>
          </View>
          <View style={styles(colors).container}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 14,
                marginBottom: 14,
                borderWidth: 1,
                borderColor: colors.border,
                marginTop: 17,
              }}>
              <View style={styles(colors).profileHeader}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                  <Feather name="user" color={colors.card} size={16} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: colors.card,
                    }}>
                    {t('profile.heading_1')}
                  </Text>
                </View>
                <Text
                  style={{
                    color: colors.primary,
                    fontWeight: '500',
                    fontSize: 16,
                  }}
                  onPress={() =>
                    navigation.navigate(RootScreenEnum.EDIT_ADDRESS)
                  }>
                  {t('profile.heading_2')}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 6,
                  marginBottom: 12,
                }}>
                <Feather name="phone" color={colors.card} size={20} />
                <Text style={styles(colors).userNo}>{userProfileData?.phoneNumber}</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 6,
                  marginBottom: 12,
                }}>
                <Ionicons
                  name="location-outline"
                  color={colors.card}
                  size={20}
                />
                <Text style={styles(colors).userNo}>
                  Plus office, landmark cyber park, Sector 67, Gurugram, Haryana
                  122101
                </Text>
              </View>
            </View>
            <Pressable
              style={{
                backgroundColor: '#fff',
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 13,
                marginBottom: 14,
                borderWidth: 1,
                borderColor: colors.primary,
              }}
              onPress={handleLogOut}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: colors.primary,
                  }}>
                  {logoutLoading ? <Loader color={colors.primary} /> : t('profile.button')}
                </Text>
                {!logoutLoading && (<Ionicons
                  name="arrow-forward-circle-outline"
                  color={colors.primary}
                  size={20}
                />)}
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <Menubar navigation={navigation} />
    </View>
  );
}

export default Profile;

const styles = (colors: ThemColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
      backgroundColor: colors.background,
      marginTop: -7,
    },
    header: {
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingVertical: 13,
      paddingHorizontal: 16,
    },
    profileBgVector: {
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
    profileBgVector1: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
    profileMain: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      backgroundColor: colors.text,
      paddingTop: 28,
      paddingBottom: 24,
      position: 'relative',
    },
    editIcon: {
      position: 'absolute',
      bottom: 2,
      right: -4,
      height: 24,
      width: 24,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: '#FAFAFA',
      textAlign: 'center',
      lineHeight: 24,
    },
    profileHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      marginBottom: 14,
    },
    userNo: {
      color: colors.card,
      fontSize: 14,
    },
    batchesRow: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    batchCard: {
      width: '33.33%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      gap: 6,
    },
  });
