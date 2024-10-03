import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useTranslation} from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { ThemColors } from '../../App';
import { RootScreenEnum } from '../../constants';
import { NavigationProps } from '../../interfaceTypes';

function Menubar({navigation}:NavigationProps): JSX.Element {
  const { colors } = useTheme();
  const {t} = useTranslation();
  return (
    <View style={styles(colors).menumain}>
      <View style={styles(colors).menuRow}>
        <Pressable style={styles(colors).menuCol} onPress={() => navigation.navigate(RootScreenEnum.HOME_SCREEN)}>
          <Feather name="home" style={{color: colors.card + "80"}} size={20} />
          <Text style={styles(colors).menuTitle}>{t('menu.title')}</Text>
        </Pressable>
        <Pressable style={styles(colors).menuCol} onPress={() => navigation.navigate(RootScreenEnum.LEADER_BOARD)}>
          <MaterialIcons name="insert-chart-outlined" style={{color: colors.card + "80"}} size={20} />
          <Text style={styles(colors).menuTitle}>{t('menu.title_1')}</Text>
        </Pressable>
        <Pressable style={styles(colors).menuCol}  onPress={() => navigation.navigate(RootScreenEnum.PROFILE_SCREEN)}>
          <Feather name="user" color={colors.card + "80"} size={20} />
          <Text style={styles(colors).menuTitle}>{t('menu.title_2')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Menubar;

const styles = (colors:ThemColors) => StyleSheet.create({
  menumain: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#F3F3F3',
    zIndex: 10,
  },
  menuRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuCol: {
    width: '33.33%',
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 8,
  },
  menuTitle: {
    color: colors.card + '80',
    fontSize: 12,
    lineHeight: 16,
    marginTop: 2,
  },
});
