import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ThemColors} from '../../App';

const brandList = [
  {
    image: require('../../assets/img/bodyBath/image22.png'),
    title: 'Dove',
    subtitle: 'Dove Beauty Cream Bar Soap',
  },
  {
    image: require('../../assets/img/bodyBath/image23.png'),
    title: 'Lux',
    subtitle: 'Lux Rose & Vitamin E Soap',
  },
  {
    image: require('../../assets/img/bodyBath/image24.png'),
    title: 'Lifebuoy',
    subtitle: 'Lifebuoy Lemon Fresh Soap',
  },
];
function AddImage(): JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View style={styles(colors).container}>
          <Text
            style={{
              color: colors.text,
              fontSize: 16,
              fontWeight: '600',
              paddingBottom: 8,
              paddingTop: 14,
            }}>
             {t('bodyBath.heading_5')}
          </Text>
          <View style={[styles(colors).addView, styles(colors).flex]}>
            {brandList.map((list, index) => (
              <Pressable
                key={index}
                style={styles(colors).brandCard}
                onPress={() => setSelected(index)}>
                <View
                  style={[
                    styles(colors).brandImg,
                    selected === index && styles(colors).selectedCard,
                  ]}>
                  <Image source={list.image} />
                  {selected === index && (
                    <Ionicons
                      name="checkmark-circle"
                      style={styles(colors).checkIcon}
                      color={colors.primary + '80'}
                      size={26}
                    />
                  )}
                </View>
                <View>
                  <Text style={styles(colors).brandTitle}>{list.title}</Text>
                  <Text style={styles(colors).brandsubTitle}>
                    {list.subtitle}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
export default AddImage;

const styles = (colors: ThemColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    brandImg: {
      width: '100%',
      borderRadius: 8,
      backgroundColor: '#FAFAFA',
      borderWidth: 1,
      borderColor: colors.border,
      height: 117,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    addView: {
      columnGap: 14,
    },
    brandCard: {
      width: '30.87%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    brandTitle: {
      fontSize: 12,
      color: colors.card + 90,
      lineHeight: 16,
      paddingTop: 4,
      fontWeight: '500',
    },
    brandsubTitle: {
      fontSize: 12,
      color: colors.card + 70,
      lineHeight: 16,
      paddingTop: 4,
      fontWeight: '400',
    },
    selectedCard: {
      backgroundColor: colors.primary + '20',
      borderColor: colors.primary,
      borderWidth: 2,
    },
    checkIcon: {
      position: 'absolute',
      top: 2,
      right: 2,
    },
  });
