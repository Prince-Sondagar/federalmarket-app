import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {ThemColors} from '../../App';
import {NavigationProps} from '../../interfaceTypes';
import FilterModal from '../filterModal';

const pointItems = [{title: 'history.title_1'}, {title: 'history.title_4'}, {title: 'history.title_5'}];
const earnPoints = [
  {
    id: 1,
    title: 'Body & bath',
    subtitle: 'Wed, 14th Nov',
    menutitle: '21 images',
    point: '+115',
  },
  {
    id: 2,
    title: 'Body & bath',
    subtitle: 'Wed, 14th Nov',
    menutitle: '21 images',
    point: '+115',
  },
];

function PointHistory({navigation}: NavigationProps): JSX.Element {
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const {colors} = useTheme();
  const {t} = useTranslation();

  const showFilterModal = () => {
    setFilterModalVisible(true);
  };

  const hideFilterModal = () => {
    setFilterModalVisible(false);
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            padding: 12,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 16,
            }}>
            <Feather
              onPress={() => {
                navigation.goBack();
              }}
              name="arrow-left"
              color={colors.card}
              size={20}
            />
            <Text style={styles(colors).title}>{t('history.heading')}</Text>
          </View>
          <TouchableOpacity
            onPress={showFilterModal}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}>
            <Text style={styles(colors).pointtitle}>{t('history.title')}</Text>
            <Feather name="filter" color={colors.primary} size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles(colors).pointBox}>
          <Text style={{color: '#FAFAFA', fontSize: 14, paddingBottom: 4}}>
          {t('history.heading_1')}
          </Text>
          <Text style={{color: '#FAFAFA', fontSize: 26, fontWeight: '600'}}>
          {t('history.heading_2')}
          </Text>
          <Image
            style={{position: 'absolute', right: 38, top: 12}}
            source={require('../../assets/img/home/coinbox.png')}
          />
          <Image
            style={{position: 'absolute', right: 0, bottom: 0, zIndex: -1}}
            source={require('../../assets/img/home/ring.png')}
          />
          <Image
            style={{position: 'absolute', right: 0, top: 0, zIndex: -1}}
            source={require('../../assets/img/home/fram.png')}
          />
        </View>
        <View style={styles(colors).container}>
          <View
            style={{flexDirection: 'row', marginVertical: 16, columnGap: 12}}>
            <View
              style={{
                backgroundColor: colors.primary,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 8,
              }}>
              <Text style={{color: '#FAFAFA', fontSize: 16}}>{t('history.title_6')}</Text>
            </View>
            {pointItems.map((list, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: colors.primary + 20,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 8,
                }}>
                <Text style={{color: colors.text, fontSize: 16}}>
                  {t(list.title)}
                </Text>
              </View>
            ))}
          </View>
          <View>
            <Text style={{color: colors.text, fontSize: 16, paddingBottom: 2}}>
            {t('history.title_1')}
            </Text>
            {earnPoints.map((list, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: '##FFFFFF',
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  padding: 12,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/img/home/yellow.png')}
                    />
                    <View style={{paddingLeft: 12}}>
                      <Text
                        style={{
                          color: colors.text,
                          fontSize: 14,
                          paddingBottom: 4,
                        }}>
                        {list.title}
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            color: colors.text + 70,
                            fontSize: 12,
                          }}>
                          {list.subtitle}
                        </Text>
                        <Entypo
                          name="dot-single"
                          color={colors.text + 15}
                          size={20}
                          style={{paddingLeft: 2}}
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 4,
                          }}>
                          <Feather
                            name="image"
                            color={colors.text + 70}
                            size={16}
                          />
                          <Text
                            style={{
                              color: colors.text + 70,
                              fontSize: 12,
                              paddingLeft: 2,
                            }}>
                            {list.menutitle}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: colors.text + 70,
                        fontSize: 12,
                        paddingBottom: 4,
                      }}>
                      Earn
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          color: '#67C265',
                          fontSize: 16,
                          paddingBottom: 4,
                          fontWeight: '600',
                          paddingRight: 2,
                        }}>
                        {list.point}
                      </Text>
                      <Image
                        source={require('../../assets/img/home/yellowcoin.png')}
                      />
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View>
            <Text style={{color: colors.text, fontSize: 16, paddingTop: 12}}>
            {t('history.title_2')}
            </Text>
            {earnPoints.map((list, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: '##FFFFFF',
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  padding: 12,
                  marginTop: 8,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/img/home/yellow.png')}
                    />
                    <View style={{paddingLeft: 12}}>
                      <Text
                        style={{
                          color: colors.text,
                          fontSize: 14,
                          paddingBottom: 4,
                        }}>
                        {list.title}
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            color: colors.text + 70,
                            fontSize: 12,
                          }}>
                          {list.subtitle}
                        </Text>
                        <Entypo
                          name="dot-single"
                          color={colors.text + 15}
                          size={20}
                          style={{paddingLeft: 2}}
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 4,
                          }}>
                          <Feather
                            name="image"
                            color={colors.text + 70}
                            size={16}
                          />
                          <Text
                            style={{
                              color: colors.text + 70,
                              fontSize: 12,
                              paddingLeft: 2,
                            }}>
                            {list.menutitle}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: colors.text + 70,
                        fontSize: 12,
                        paddingBottom: 4,
                      }}>
                      Earn
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          color: '#67C265',
                          fontSize: 16,
                          paddingBottom: 4,
                          fontWeight: '600',
                          paddingRight: 2,
                        }}>
                        {list.point}
                      </Text>
                      <Image
                        source={require('../../assets/img/home/yellowcoin.png')}
                      />
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View>
            <Text style={{color: colors.text, fontSize: 16, paddingTop: 12}}>
            {t('history.title_3')}
            </Text>
            {earnPoints.map((list, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: '##FFFFFF',
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  padding: 12,
                  marginTop: 8,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/img/home/yellow.png')}
                    />
                    <View style={{paddingLeft: 12}}>
                      <Text
                        style={{
                          color: colors.text,
                          fontSize: 14,
                          paddingBottom: 4,
                        }}>
                        {list.title}
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            color: colors.text + 70,
                            fontSize: 12,
                          }}>
                          {list.subtitle}
                        </Text>
                        <Entypo
                          name="dot-single"
                          color={colors.text + 15}
                          size={20}
                          style={{paddingLeft: 2}}
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 4,
                          }}>
                          <Feather
                            name="image"
                            color={colors.text + 70}
                            size={16}
                          />
                          <Text
                            style={{
                              color: colors.text + 70,
                              fontSize: 12,
                              paddingLeft: 2,
                            }}>
                            {list.menutitle}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: colors.text + 70,
                        fontSize: 12,
                        paddingBottom: 4,
                      }}>
                      Earn
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          color: '#67C265',
                          fontSize: 16,
                          paddingBottom: 4,
                          fontWeight: '600',
                          paddingRight: 2,
                        }}>
                        {list.point}
                      </Text>
                      <Image
                        source={require('../../assets/img/home/yellowcoin.png')}
                      />
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <FilterModal
        title1={t('history.title_7')}
        title2={t('history.title_8')}
        isVisible={isFilterModalVisible}
        hideModal={hideFilterModal}
        icon={true}
      />
    </View>
  );
}

export default PointHistory;

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
    pointtitle: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: '500',
    },
    pointBox: {
      backgroundColor: colors.primary,
      paddingVertical: 23,
      paddingLeft: 28,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
    filtertitle: {
      color: colors.card + '90',
      fontSize: 16,
      fontWeight: '500',
    },
  });
