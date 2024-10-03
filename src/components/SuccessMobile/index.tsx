import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import ButtonComp from '../Button';
import {ThemColors} from '../../App';
import {NavigationProps} from '../../interfaceTypes';
import {RootScreenEnum} from '../../constants';

function SuccessMobile({navigation}: NavigationProps): JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  return (
    <View style={styles(colors).container}>
      <View style={styles(colors).suceessMain}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={require('../../assets/img/login/successBg.png')}
        />
        <View style={styles(colors).successContent}>
          <Image
            style={{height: 153, width: 153}}
            source={require('../../assets/img/leaderboard/watch.png')}
          />
          <Text style={styles(colors).successTitle}>
            {t('success.heading')}
          </Text>
          <Text style={styles(colors).successDesc}>{t('success.heading_1')}</Text>
        </View>
        <View style={styles(colors).button}>
          <Text
            style={{
              textAlign: 'center',
              marginBottom: 14,
              fontSize: 14,
              color: colors.card + 90,
            }}>
            {t('success.heading_2')}
          </Text>
          <ButtonComp
            title={t('success.button')}
            onPress={() => navigation.navigate(RootScreenEnum.LEADER_BOARD)}
          />
        </View>
      </View>
    </View>
  );
}

export default SuccessMobile;

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
  });
