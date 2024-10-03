import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {ThemColors} from '../../App';
import {RootScreenEnum} from '../../constants';
import ButtonComp from '../Button';
import {NavigationProps} from '../../interfaceTypes';
import useRetailers from '../../store/hooks/useRetailers';

const TimingList = [
  { title: 'Monday', time: '--:-- AM to --:-- PM' },
  { title: 'Tuesday', time: '--:-- AM to --:-- PM' },
  { title: 'Wednesday', time: '--:-- AM to --:-- PM' },
  { title: 'Thursday', time: '--:-- AM to --:-- PM' },
  { title: 'Friday', time: '--:-- AM to --:-- PM' },
  { title: 'Saturday', time: '--:-- AM to --:-- PM' },
  { title: 'Sunday', time: '--:-- AM to --:-- PM' },
];

function timeToAMPM(time: number) {
  if (time >= 0 && time <= 2359) {
    const hours = Math.floor(time / 100) % 12 || 12;
    const mins = time % 100;
    const period = time < 720 || time === 2400 ? 'AM' : 'PM';
    const hourStr = hours === 0 ? '12' : hours < 10 ? hours.toString() : hours;
    const minStr = mins.toString().padStart(2, '0');
    return `${hourStr}:${minStr} ${period}`;
  }
  return 'Invalid time';
}

function ShopTimings({navigation}: NavigationProps): JSX.Element {
  const {colors} = useTheme();
  const {retailerInfo} = useRetailers();
  const {t} = useTranslation();
  const [shopTimeList, setShopTimeList] = useState(TimingList);

  const handleSubmit = () => {
    navigation.navigate(RootScreenEnum.EDIT_TIME);
  };

  useEffect(() => {
    setShopTimeList(prevShopTimeList =>
      prevShopTimeList.map(time => {
        const matchedTime = retailerInfo?.operatingTime?.find(dbTime =>
          time?.title.toLowerCase().includes(dbTime?.day.toLowerCase()),
        );
        return matchedTime
          ? {
              ...time,
              time:
                matchedTime?.startTime == 0 && matchedTime?.endTime == 0
                  ? 'Holiday'
                  : `${timeToAMPM(matchedTime?.startTime)} to ${timeToAMPM(
                      matchedTime?.endTime,
                    )}`,
            }
          : time;
      }),
    );
  }, [JSON.stringify(retailerInfo?.operatingTime)]);

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <View style={styles(colors).header}>
        <View style={[styles(colors).headerRow]}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Feather
              onPress={() => {
                navigation.goBack();
              }}
              name="arrow-left"
              color={colors.card}
              size={24}
            />
            <Text
              style={{
                color: colors.text,
                fontSize: 16,
                fontWeight: '600',
                paddingLeft: 16,
              }}>
              {t('timing.heading')}
            </Text>
          </View>
          <View>
            <Text
              style={{color: colors.primary, fontSize: 16, fontWeight: '600'}}
              onPress={handleSubmit}>
              {t('timing.heading_1')}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={styles(colors).container}>
          <View style={{marginTop: 10}}>
            {shopTimeList?.map((timing, index) => (
              <View
                key={index}
                style={[
                  styles(colors).TimingRow,
                  index === TimingList.length - 1 && {borderBottomWidth: 0},
                ]}>
                <Text style={styles(colors).title}>{timing.title}</Text>
                <Text
                  style={[
                    styles(colors).title,
                    timing.time === `${t('timing.heading_2')}` && {
                      color: colors.notification,
                    },
                  ]}>
                  {t(timing.time)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles(colors).menumain}>
        <ButtonComp
          title={t('timing.button')}
          disabled={false}
          onPress={() => navigation.navigate(RootScreenEnum.SHOP_SCREEN)}
        />
      </View>
    </View>
  );
}

export default ShopTimings;

const styles = (colors: ThemColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
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
      justifyContent: 'space-between',
    },
    TimingRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      color: colors.card,
      fontSize: 16,
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
