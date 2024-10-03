import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import ButtonComp from '../Button';
import {ThemColors} from '../../App';
import {NavigationProps} from '../../interfaceTypes';
import {RootScreenEnum} from '../../constants';

function EarnReward({navigation}: NavigationProps): JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  return (
    <View style={styles(colors).earnReward}>
      <Image
        style={{
          position: 'absolute',
          right: 0,
          width: '100%',
          height: '65%',
          top: 80,
        }}
        source={require('../../assets/img/bodyBath/white.png')}
      />
      <View style={styles(colors).container}>
        <View style={styles(colors).suceessMain}>
          <View style={styles(colors).round}></View>
          <Image
            style={{width: '100%', height: '100%'}}
            source={require('../../assets/img/bodyBath/bg.png')}
          />
          <View style={styles(colors).successContent}>
            <Image source={require('../../assets/img/bodyBath/earncoin.png')} />
            <Text style={styles(colors).successTitle}> {t('earnReward.heading')}</Text>
            <View style={styles(colors).reward}>
              <Text style={styles(colors).successDesc}>{t('earnReward.title')}</Text>
              <Text style={styles(colors).successText}>25</Text>
              <Image source={require('../../assets/img/bodyBath/coin1.png')} />
              <Text style={styles(colors).successText}>{t('earnReward.title_1')}</Text>
              <Text style={styles(colors).successDesc}>{t('earnReward.title_2')}</Text>
            </View>
          </View>
          <View style={styles(colors).button}>
            <ButtonComp
              title={t('earnReward.button')}
              onPress={() => navigation.navigate(RootScreenEnum.DATA_SCREEN)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default EarnReward;

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
    successText: {
      color: '#D57028',
      fontSize: 16,
      fontWeight: '700',
      paddingHorizontal: 4,
    },
    button: {
      position: 'absolute',
      bottom: 32,
      width: '100%',
    },
    round: {
      width: 180,
      height: 180,
      borderRadius: 100,
      backgroundColor: '#FBAF00' + 70,
      position: 'absolute',
      top: '32%',
      left: '26.5%',
    },
    earnReward: {
      backgroundColor: '#FBAF00' + 70,
    },
    reward: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
