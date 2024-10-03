import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import ButtonComp from '../Button';
import { ThemColors } from '../../App';
import { NavigationProps } from '../../interfaceTypes';
import { ACCESS_TOKEN, RootScreenEnum, TEMP_ACCESS_TOKEN } from '../../constants';
import SvgUri from 'react-native-svg-uri';
import { getItemAsyncStorage, setItemAsyncStorage } from '../../utils';
import { checkAuth } from '../../store/actions/authAction';
import { RootDispatch } from '../../store';
import { useDispatch } from 'react-redux';

function LoginSuccess({ navigation }: NavigationProps): JSX.Element {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scale = useRef(new Animated.Value(0)).current;

  const handleZoomIn = () => {
    Animated.spring(scale, {
      toValue: 13,
      useNativeDriver: false,
      speed: 1,
    }).start();
  };

  useEffect(() => {
    handleZoomIn();
  }, []);

  const handleLoginSuccess = async () => {
    const token = await getItemAsyncStorage(TEMP_ACCESS_TOKEN);
    await setItemAsyncStorage(ACCESS_TOKEN, token);
    const getToken = await dispatch<RootDispatch>(checkAuth());
    // navigation.navigate(RootScreenEnum.HOME_SCREEN)
  };

  return (
    <View style={styles(colors).container}>
      <View style={styles(colors).suceessMain}>
        <Image
          style={{ width: '100%', height: '100%' }}
          source={require('../../assets/img/login/successBg.png')}
        />
        {/* <SvgUri source={require('../../assets/img/login/successBg.svg')} /> */}
        {/* <SvgUri source={require('../../assets/img/login/logo.svg')} /> */}
        <View style={styles(colors).successContent}>
          <Animated.View
            style={[
              styles(colors).successImgContainer,
              { transform: [{ scale }] },
            ]}>
            <Image
              source={require('../../assets/img/login/loginSuccess.png')}
              style={styles(colors).successImg}
            />
          </Animated.View>
          <Text style={styles(colors).successTitle}>{t('done.heading')}</Text>
          <Text style={styles(colors).successDesc}>{t('done.heading_1')}</Text>
        </View>
        <View style={styles(colors).button}>
          <ButtonComp
            title={t('done.button')}
            onPress={handleLoginSuccess}
          />
        </View>
      </View>
    </View>
  );
}

export default LoginSuccess;

const styles = (colors: ThemColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
    },
    suceessMain: {
      height: '100%',
      position: 'relative',
    },
    successContent: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 75,
    },
    successTitle: {
      color: colors.text,
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
      marginTop: 16,
      marginBottom: 6,
    },
    successDesc: {
      color: colors.card + '90',
      fontSize: 14,
      textAlign: 'center',
    },
    button: {
      position: 'absolute',
      bottom: 32,
      width: '100%',
    },
    successImgContainer: {
      height: 13,
      width: 13,
      transformOrigin: 'center',
      overflow: 'hidden',
      marginBottom: 70,
      marginTop: 60,
    },

    successImg: {
      flex: 1,
      width: undefined,
      height: undefined,
      resizeMode: 'contain',
    },
  });
