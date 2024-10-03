import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {ThemColors} from '../../App';
import {NavigationProps} from '../../interfaceTypes';
import Menubar from '../../components/Menubar';
import ButtonComp from '../../components/Button';
import {RootScreenEnum} from '../../constants';

const dayList = [
  {title: 'M'},
  {title: 'T'},
  {title: 'W'},
  {title: 'T'},
  {title: 'F'},
  {title: 'S'},
];

const performersList = [
  {
    no: '1',
    img: require('../../assets/img/leaderboard/performers_profile1.png'),
    name: 'Naresh Aggarwal',
    coin: '5k',
    performersRowBg: {backgroundColor: '#FBAF0080'},
    rewardBg: {backgroundColor: '#FBAF00'},
  },
  {
    no: '2',
    img: require('../../assets/img/leaderboard/performers_profile2.png'),
    name: 'Suman Gupta',
    coin: '2k',
    performersRowBg: {backgroundColor: '#D5702833'},
    rewardBg: {backgroundColor: '#FA5247CC'},
  },
  {
    no: '3',
    img: require('../../assets/img/leaderboard/performers_profile2.png'),
    name: 'Suman Gupta',
    coin: '2k',
    performersRowBg: {backgroundColor: '#D5702833'},
    rewardBg: {backgroundColor: '#FA5247CC'},
  },
];

const prizedata = [
  {
    img: require('../../assets/img/leaderboard/watch.png'),
    win: 'leaderboard.title_2',
    name: 'Redmi watch 5',
  },
  {
    img: require('../../assets/img/leaderboard/JBL.png'),
    win: 'leaderboard.title_3',
    name: 'JBL Bluetooth speaker',
  },
  {
    img: require('../../assets/img/leaderboard/watch.png'),
    win: 'leaderboard.title_2',
    name: 'Redmi watch 5',
  },
];

function Leaderboard({navigation}: NavigationProps): JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [selected, setSelected] = useState<number | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={{flex: 1, position: 'relative'}}>
      <Image
        style={{width: '100%', height: '100%', position: 'absolute'}}
        source={require('../../assets/img/login/bg.png')}
      />
      <View style={styles(colors).header}>
        <Text
          style={{
            color: colors.text,
            fontSize: 16,
            fontWeight: '600',
          }}>
          {t('leaderboard.heading')}
        </Text>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={styles(colors).shopCard}>
          <Text
            style={{
              color: '#FAFAFA',
              fontSize: 14,
              fontWeight: '500',
              paddingBottom: 12,
            }}>
            {t('leaderboard.heading_1')}
          </Text>
          <View
            style={{
              display: 'flex',
              gap: 27,
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginBottom: 16,
            }}>
            {dayList.map((day, index) => (
              <Pressable
                key={index}
                style={styles(colors).shopCardCol}
                onPress={() => setSelected(index)}>
                <Text
                  style={{
                    color: '#FAFAFA',
                    fontSize: 14,
                  }}>
                  {day.title}
                </Text>
                <Text
                  style={[
                    styles(colors).shopCircle,
                    selected === index && styles(colors).selectedShopCircle,
                  ]}>
                  {selected === index && (
                    <AntDesign
                      name="check"
                      style={styles(colors).selectedShop}
                      color={colors.background}
                      size={20}
                    />
                  )}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles(colors).pointCardMain}>
          <View style={styles(colors).pointCard}>
            <Image
              style={styles(colors).pointBgVector2}
              source={require('../../assets/img/leaderboard/pointBgVector2.png')}
            />
            <Image
              style={styles(colors).pointBgVector3}
              source={require('../../assets/img/leaderboard/pointBgVector3.png')}
            />
            <Image
              style={styles(colors).points}
              source={require('../../assets/img/leaderboard/points.png')}
            />
            <Text style={{color: colors.text, fontSize: 12, marginBottom: 12}}>
              {t('leaderboard.heading_2')}
              <Text style={{color: colors.text + '80'}}>
                {t('leaderboard.heading_3')}
              </Text>{' '}
            </Text>
            <Text
              style={{
                color: colors.text,
                fontSize: 14,
                marginBottom: 4,
                lineHeight: 20,
              }}>
              {t('leaderboard.heading_4')}
            </Text>
            <Text
              style={{
                color: '#D57028',
                fontSize: 26,
                fontWeight: '600',
                lineHeight: 36,
              }}>
              {t('leaderboard.heading_5')}
            </Text>
          </View>
          <View style={styles(colors).viewReward}>
            <Text style={{color: '#FAFAFA', fontSize: 12}}>
            {t('leaderboard.heading_8')}
            </Text>
            <Feather name="arrow-right" color={'#FAFAFA'} size={16} />
          </View>
        </View>
        <View style={{marginBottom: 58}}>
          <View style={styles(colors).container}>
            <View style={styles(colors).leaderboardCard}>
              <View style={styles(colors).leaderboardHeader}>
                <Text
                  style={{color: colors.card, fontSize: 14, fontWeight: '500'}}>
                  {t('leaderboard.heading')}
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                  <Text
                    style={[
                      styles(colors).switchText,
                      isEnabled && styles(colors).enabledSwitchText,
                    ]}>
                    W
                  </Text>
                  <Switch
                    trackColor={{false: '#ddd', true: '#288CD5'}}
                    thumbColor={'#fff'}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                  <Text
                    style={[
                      styles(colors).enabledSwitchText,
                      isEnabled && styles(colors).switchText,
                    ]}>
                    M
                  </Text>
                </View>
              </View>
              <View style={{padding: 12}}>
                <View
                  style={{
                    display: 'flex',
                    gap: 5,
                    flexDirection: 'row',
                    marginBottom: 12,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: colors.card,
                    }}>
                    {t('leaderboard.heading_6')}
                  </Text>
                  <Image
                    source={require('../../assets/img/leaderboard/trophy.png')}
                  />
                </View>
                <View>
                  {performersList.map((performer, index) => (
                    <View
                      key={index}
                      style={{
                        ...styles(colors).performersRow,
                        ...performer.performersRowBg,
                      }}>
                      <View
                        style={{
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 4,
                        }}>
                        <Image
                          source={require('../../assets/img/leaderboard/roundVector.png')}
                        />
                        <Text style={styles(colors).performersNo}>
                          {performer.no}
                        </Text>
                      </View>
                      <Image source={performer.img} />
                      <Text
                        style={{
                          color: colors.text,
                          fontSize: 14,
                          marginLeft: 8,
                        }}>
                        {performer.name}
                      </Text>
                      <View
                        style={{
                          ...styles(colors).reward,
                          ...performer.rewardBg,
                        }}>
                        <View
                          style={{
                            display: 'flex',
                            gap: 4,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '500',
                              color: colors.background,
                            }}>
                            {performer.coin}
                          </Text>
                          <Image
                            source={require('../../assets/img/bodyBath/coin1.png')}
                          />
                        </View>
                      </View>
                    </View>
                  ))}
                  <View
                    style={[
                      styles(colors).performersRow,
                      styles(colors).performersRowBg,
                    ]}>
                    <View
                      style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 4,
                      }}>
                      <Text
                        style={{
                          color: colors.card,
                          fontSize: 14,
                          fontWeight: '500',
                          marginRight: 10,
                        }}>
                        20
                      </Text>
                    </View>
                    <Image
                      source={require('../../assets/img/leaderboard/performers_profile1.png')}
                    />
                    <Text
                      style={{
                        color: colors.text, 
                        fontSize: 14,
                        marginLeft: 8,
                      }}>
                      Manish Kumar (You)
                    </Text>
                    <View
                      style={[styles(colors).reward, styles(colors).rewardBg]}>
                      <View
                        style={{
                          display: 'flex',
                          gap: 4,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '500',
                            color: colors.background,
                          }}>
                          3.5k
                        </Text>
                        <Image
                          source={require('../../assets/img/bodyBath/coin1.png')}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                  fontWeight: '600',
                  marginBottom: 14,
                }}>
                {t('leaderboard.heading_7')}
              </Text>
              <View>
                {prizedata.map((prize, index) => (
                  <View
                    key={index}
                    style={{
                      padding: 12,
                      borderWidth: 1,
                      borderColor: colors.border,
                      backgroundColor: '#fff',
                      borderRadius: 8,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 12,
                      marginBottom: 14,
                    }}>
                    <View>
                      <Image source={prize.img} />
                    </View>
                    <View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            color: colors.text,
                            fontSize: 16,
                            paddingRight: 4,
                          }}>
                          {t(prize.win)}
                        </Text>
                        <Image
                          source={require('../../assets/img/bodyBath/coin1.png')}
                        />
                        <Text
                          style={{
                            color: colors.text,
                            fontSize: 16,
                          }}>
                          {t('leaderboard.title_1')}
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: colors.text,
                          fontSize: 16,
                          fontWeight: '600',
                          marginBottom: 12,
                        }}>
                        {prize.name}
                      </Text>
                      <ButtonComp
                        title={t('leaderboard.button')}
                        onPress={() =>
                          navigation.navigate(RootScreenEnum.SUCCESS_MOBILE)
                        }
                      />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Menubar navigation={navigation} />
    </View>
  );
}

export default Leaderboard;

const styles = (colors: ThemColors) =>
  StyleSheet.create({
    switchText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.primary,
    },
    enabledSwitchText: {
      color: colors.card + '90',
    },
    container: {
      paddingHorizontal: 16,
    },
    header: {
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingVertical: 13,
      paddingHorizontal: 16,
    },
    shopCard: {
      backgroundColor: colors.text,
      paddingHorizontal: 16,
      height: 181,
      paddingTop: 16,
    },
    shopCircle: {
      height: 32,
      width: 32,
      borderRadius: 20,
      backgroundColor: '#FAFAFA',
      position: 'relative',
      textAlign: 'center',
    },
    selectedShopCircle: {
      backgroundColor: '#FBAF00',
    },
    selectedShop: {
      position: 'absolute',
      top: 0,
      left: 0,
      textAlign: 'center',
      lineHeight: 32,
    },
    shopCardCol: {
      width: '10.73%',
      display: 'flex',
      gap: 8,
      alignItems: 'center',
    },
    pointCardMain: {
      marginTop: -55,
      marginHorizontal: 16,
      marginBottom: 32,
    },
    pointCard: {
      paddingVertical: 12,
      paddingLeft: 12,
      paddingRight: 26,
      backgroundColor: colors.background,
      position: 'relative',
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      elevation: 20,
    },
    viewReward: {
      backgroundColor: colors.primary,
      paddingVertical: 5,
      paddingHorizontal: 16,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 4,
      borderBottomRightRadius: 8,
      borderBottomLeftRadius: 8,
      shadowColor: 'rgba(0,0,0,0.9)',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      elevation: 20,
    },
    pointBgVector1: {
      position: 'absolute',
      bottom: 0,
      left: 0,
    },
    pointBgVector2: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    pointBgVector3: {
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
    points: {
      position: 'absolute',
      top: 12,
      right: 26,
    },
    leaderboardCard: {
      borderRadius: 8,
      backgroundColor: colors.background,
      marginBottom: 14,
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      elevation: 20,
    },
    leaderboardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      padding: 12,
      backgroundColor: '#FAFAFA',
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    performersRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
      paddingLeft: 12,
      borderRadius: 8,
      position: 'relative',
      marginBottom: 8,
    },
    performersRowBg: {
      borderWidth: 1,
      borderColor: colors.primary,
      paddingVertical: 4,
      backgroundColor: colors.primary + '20',
    },
    performersNo: {
      position: 'absolute',
      height: 18,
      width: 18,
      borderWidth: 3,
      borderColor: '#FF4755',
      backgroundColor: '#C61926',
      fontSize: 12,
      color: colors.background,
      fontWeight: '600',
      textAlign: 'center',
      lineHeight: 18,
      borderRadius: 10,
    },
    reward: {
      position: 'absolute',
      right: 0,
      top: 0,
      height: 40,
      width: 59,
      borderTopRightRadius: 7,
      borderBottomRightRadius: 8,
      backgroundColor: '#FBAF00',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    rewardBg: {
      height: 38,
      backgroundColor: colors.primary,
    },
  });
