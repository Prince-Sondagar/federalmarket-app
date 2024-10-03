import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ThemColors } from '../../App';
import { NavigationProps } from '../../interfaceTypes';
import ButtonComp from '../Button';
import { RootScreenEnum } from '../../constants';
import useRetailers from '../../store/hooks/useRetailers';
import { Retailer } from '../../store/types/stateTypes';

const dayList = [
  { title: 'Mon', fullDayName: "Monday" },
  { title: 'Tues', fullDayName: "Tuesday" },
  { title: 'Wed', fullDayName: "Wednesday" },
  { title: 'Thur', fullDayName: "Thursday" },
  { title: 'Fri', fullDayName: "Friday" },
  { title: 'Sat', fullDayName: "Saturday" },
  { title: 'Sun', fullDayName: "Sunday" },
];

interface VisibleTimePicker {
  startTime: boolean,
  endTime: boolean
}

function EditTime({ navigation }: NavigationProps): JSX.Element {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { retailerInfo, setRetailersShopInfoData } = useRetailers();

  const [shopTiming, setShopTiming] = useState<any>({
    day: [],
    startTime: new Date(),
    endTime: new Date()
  });
  const [visibleTimePicker, setVisibleTimePicker] = useState<VisibleTimePicker>({
    startTime: false,
    endTime: false
  });
  const [isHoliDay, setIsHoliday] = useState(false);

  const handleTimeChange = (key: keyof VisibleTimePicker, time: Date) => {
    setVisibleTimePicker({ ...visibleTimePicker, [key]: !visibleTimePicker[key] })
    setShopTiming({ ...shopTiming, [key]: time })
  };

  const handlePickerVisibleChange = (key: keyof VisibleTimePicker) => {
    setVisibleTimePicker({ ...visibleTimePicker, [key]: !visibleTimePicker[key] })
  };

  const handleSubmit = () => {
    let timingData = shopTiming;
    if (isHoliDay) {
      timingData = {
        ...timingData,
        startTime: 0,
        endTime: 0,
      };
    }

    const startHours = timingData?.startTime == 0 ? 0 : timingData?.startTime?.getHours();
    const startMinites = timingData?.startTime == 0 ? 0 : timingData?.startTime?.getMinutes()?.toString().padStart(2, '0');
    const endHours = timingData?.endTime == 0 ? 0 : timingData?.endTime?.getHours();
    const endMinites = timingData?.endTime == 0 ? 0 : timingData?.endTime?.getMinutes()?.toString().padStart(2, '0');

    const operatingTime = retailerInfo?.operatingTime?.map(time => {
      return timingData?.day?.includes(time.day)
        ? {
          ...time,
          startTime: parseInt(`${startHours}${startMinites}`),
          endTime: parseInt(`${endHours}${endMinites}`),
        }
        : time
    }) ?? [];

    timingData?.day?.map((days: string) => {
      if (operatingTime?.find(operatTime => operatTime.day == days)) {
        return days;
      } else {

        operatingTime?.push({
          day: days,
          startTime: parseInt(`${startHours}${startMinites}`),
          endTime: parseInt(`${endHours}${endMinites}`),
        });
      }
    });

    const updatedRetailerInfo = {
      operatingTime
    }

    setRetailersShopInfoData({
      ...retailerInfo,
      ...updatedRetailerInfo,
    } as Retailer);
    navigation.navigate(RootScreenEnum.TIMINGS);
  };

  return (
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
            style={{
              color: colors.text,
              fontSize: 16,
              fontWeight: '600',
            }}>
            {t('editTime.title')}
          </Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles(colors).container}>
          <Text
            style={{
              color: colors.text,
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 12,
            }}>
            {t('editTime.title_1')}
          </Text>
          <ScrollView
            style={{ marginBottom: 22 }}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {dayList.map((day, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => {
                  setShopTiming({
                    ...shopTiming,
                    day: shopTiming.day.find(
                      (days: string) => days === day.fullDayName,
                    )
                      ? shopTiming.day?.filter(
                        (days: string) => days !== day.fullDayName,
                      )
                      : [...shopTiming.day, ...[day.fullDayName]],
                  });
                }}>
                <View
                  style={[
                    styles(colors).dayTitle,
                    shopTiming.day.find(
                      (days: string) => day.fullDayName === days,
                    ) && styles(colors).selectedDay,
                  ]}>
                  <Text
                    style={{
                      color:
                        shopTiming.day === day.fullDayName
                          ? 'white'
                          : colors.card,
                      lineHeight: 52,
                      textAlign: 'center',
                      fontSize: 16,
                    }}>
                    {day.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>

          <View style={styles(colors).holidayRow}>
            <Text style={{ color: colors.card, fontSize: 16 }}>
              {t('editTime.title_3')}
            </Text>
            <TouchableWithoutFeedback onPress={() => setIsHoliday(!isHoliDay)}>
              <View
                style={[
                  styles(colors).checkbox,
                  isHoliDay && styles(colors).checked,
                ]}>
                {isHoliDay && (
                  <AntDesign name="check" color={colors.background} size={14} />
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>

          <Text
            style={{
              color: colors.text,
              fontWeight: '600',
              fontSize: 16,
              marginBottom: 12,
            }}>
            {t('editTime.title_2')}
          </Text>

          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 16,
            }}>
            <Pressable
              style={{
                width: '44.1%',
                backgroundColor: '#F3F3F3',
                borderRadius: 8,
                paddingVertical: 12,
              }}
              onPress={() => handlePickerVisibleChange("startTime")}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: colors.card,
                  textAlign: 'center',
                }}>
                {shopTiming.startTime
                  ? shopTiming.startTime?.toLocaleTimeString()
                  : 'No date selected'}
              </Text>
              <DateTimePickerModal
                date={shopTiming.startTime}
                isVisible={visibleTimePicker.startTime}
                mode="time"
                onConfirm={time => handleTimeChange('startTime', time)}
                onCancel={() => handlePickerVisibleChange('startTime')}
              />
            </Pressable>
            <Text style={{ fontSize: 14, color: colors.card + '70' }}>to</Text>
            <Pressable
              style={{
                width: '44.1%',
                backgroundColor: '#F3F3F3',
                borderRadius: 8,
                paddingVertical: 12,
              }}
              onPress={() => handlePickerVisibleChange('endTime')}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: colors.card,
                  textAlign: 'center',
                }}>
                {shopTiming.endTime
                  ? shopTiming.endTime.toLocaleTimeString()
                  : 'No date selected'}
              </Text>
              <DateTimePickerModal
                date={shopTiming.endTime}
                isVisible={visibleTimePicker.endTime}
                mode="time"
                onConfirm={(time) => handleTimeChange("endTime", time)}
                onCancel={() => handlePickerVisibleChange("endTime")}
              />
            </Pressable>
          </View>
        </View>
      </ScrollView >
      <View style={styles(colors).menumain}>
        <ButtonComp
          title={t('editTime.button')}
          disabled={false}
          onPress={handleSubmit}
        />
      </View>
    </View >
  );
}

export default EditTime;

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
    },
    dayTitle: {
      height: 52,
      width: 52,
      backgroundColor: colors.primary + '20',
      borderRadius: 30,
      lineHeight: 52,
      marginRight: 8,
    },
    selectedDay: {
      backgroundColor: colors.primary,
    },
    holidayRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 34,
    },

    checkbox: {
      width: 18,
      height: 18,
      borderWidth: 1,
      borderColor: colors.text + '60',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 2,
    },
    checked: {
      backgroundColor: colors.primary,
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
