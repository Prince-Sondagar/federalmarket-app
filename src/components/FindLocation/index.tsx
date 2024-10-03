import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTheme} from '@react-navigation/native';
import SearchBar from '../SearchBar';
import {ThemColors} from '../../App';
import {NavigationProps} from '../../interfaceTypes';

const locationList = [
  {title: 'Huda city center'},
  {title: 'Huda cafe'},
  {title: 'Huda city center metro'},
  {title: 'Huda park, gurgaon'},
  {title: 'Hudan road, sec-56'},
  {title: 'Hudapur'},
];

function FindLocation({navigation}: NavigationProps): JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  return (
    <View style={{position: 'relative', flex: 1}}>
      <View style={styles(colors).networkError}>
        <View style={styles(colors).networkErrorRow}>
          <Text style={{color: '#FAFAFA', fontSize: 12}}>No Internet</Text>
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
              {t('location.title')}
            </Text>
            <AntDesign name="close" color={colors.background} size={18} />
          </View>
        </View>
      </View>
      <View style={styles(colors).container}>
        <ScrollView style={{flex: 1}}>
          <SearchBar backIcon={true} closeIcon={true} navigation={navigation} />
          <View style={{marginTop: 10}}>
            {locationList.map((location, index) => (
              <View
                key={index}
                style={[
                  styles(colors).locationRow,
                  index === locationList.length - 1 && {borderBottomWidth: 0},
                ]}>
                <Ionicons name="location-sharp" color={'#E50027'} size={24} />
                <Text style={styles(colors).title}>{location.title}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={styles(colors).locationContent}>
          <Image
            style={{height: 127, width: 127}}
            source={require('../../assets/img/home/search-location.png')}
          />
          <Text style={styles(colors).locationTitle}> {t('location.heading')}</Text>
          <Text style={{color: colors.primary}}>{t('location.heading_1')}</Text>
        </View>
      </View>
    </View>
  );
}

export default FindLocation;

const styles = (colors: ThemColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      flex: 1,
      paddingTop: 12,
      position: 'relative',
      backgroundColor: '#fff',
    },
    networkError: {
      backgroundColor: colors.notification,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 20,
      display: 'none',
    },
    networkErrorRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    locationContent: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    locationTitle: {
      color: colors.card + '80',
      fontSize: 14,
      lineHeight: 20,
      marginTop: 12,
    },
    locationRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      flexDirection: 'row',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      color: colors.card,
      fontSize: 16,
    },
  });
