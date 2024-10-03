import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import SvgUri from 'react-native-svg-uri';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ThemColors} from '../../App';
import {INVALID_MOBILENO, RootScreenEnum} from '../../constants';
import {NavigationProps} from '../../interfaceTypes';
import ButtonComp from '../../components/Button';
import {RootDispatch, RootState} from '../../store';
import {sendOTP} from '../../store/actions/authAction';
import {useDispatch, useSelector} from 'react-redux';

function LoginPage({navigation}: NavigationProps): JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [mobileNo, setMobileNo] = React.useState('');
  const [ErrorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();
  const {isLoading, message, error} = useSelector(
    (state: RootState) => state.auth,
  );

  // useEffect(() => {
  //   if (error) {
  //     setErrorMsg(message);
  //   }
  // }, [message]);

  const handleSetMobileNo = (mobileNo: string) => {
    if (mobileNo.length !== 10) {
      setErrorMsg(INVALID_MOBILENO);
    } else {
      setErrorMsg('');
    }
    setMobileNo(mobileNo);
  };

  const handleOtpSend = async () => {
    const status = await dispatch(sendOTP(mobileNo) as RootDispatch);
    if (status === true) {
      navigation.navigate(RootScreenEnum.OTP_LOGIN);
    }
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={100}
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles(colors).scrollContainer}>
      <View style={styles(colors).container}>
        <View style={styles(colors).loginmain}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 10,
              marginBottom: 24,
            }}>
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                backgroundColor: colors.text,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SvgUri source={require('../../assets/img/login/logo.svg')} />
              {/* <Image source={require('../../assets/img/login/logo.png')} /> */}
            </View>
            <Text style={{color: colors.text, fontSize: 16, fontWeight: '700'}}>
              FAIRSIGHT.MARKET
            </Text>
          </View>
          <View style={styles(colors).centered}>
            {/* <Image
              style={{position: 'relative', zIndex: 10}}
              source={require('../../assets/img/login/loginBg.png')}
            /> */}
            <View style={{position: 'relative', zIndex: 10}}>
              <SvgUri source={require('../../assets/img/login/loginBg.svg')} />
            </View>
            {/* <Image
              style={{marginTop: -48}}
              source={require('../../assets/img/login/login-bg-divider.png')}
            /> */}
            <View style={{marginTop: -48}}>
              <SvgUri
                source={require('../../assets/img/login/login-bg-divider.svg')}
              />
            </View>
          </View>
          <Text style={styles(colors).loginHeader}>
            Enter your mobile number
          </Text>
          <Text style={styles(colors).loginDesc}>
            We will send you a confirmation code
          </Text>
          <View
            style={[
              styles(colors).inputBox,
              {borderColor: ErrorMsg ? colors.notification : colors.border},
            ]}>
            <Text style={styles(colors).countryCode}>+91</Text>
            <View style={styles(colors).line} />
            <TextInput
              style={styles(colors).input}
              onChangeText={handleSetMobileNo}
              value={mobileNo}
              keyboardType="numeric"
              placeholder={t('signup.heading_2')}
            />
          </View>
          {ErrorMsg && (<Text
            style={{
              color: colors.notification,
              fontSize: 14,
              paddingTop: 8,
            }}>
            {ErrorMsg}
          </Text>)}
          <View style={styles(colors).button}>
            <ButtonComp title={'OTP Verification'} onPress={handleOtpSend} loading={isLoading} disabled={!mobileNo || ErrorMsg !== ""} />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default LoginPage;

const styles = (colors: ThemColors) =>
  StyleSheet.create({
    scrollContainer: {
      flexGrow: 1 
    },
    container: {
      paddingHorizontal: 16,
    },
    loginmain: {
      paddingTop: 24,
      height: '100%',
      position: 'relative',
    },
    centered: {
      alignItems: 'center',
    },
    loginHeader: {
      color: colors.text,
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 6,
      marginTop: 40,
    },
    loginDesc: {
      color: colors.card + '90',
      fontSize: 14,
      fontWeight: '400',
      marginBottom: 20,
    },
    inputBox: {
      borderWidth: 1,
      padding: 12,
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',
    },
    countryCode: {
      fontSize: 16,
      color: colors.card + '80',
    },
    line: {
      width: 1,
      height: 24,
      backgroundColor: colors.border,
      marginHorizontal: 10,
    },
    input: {
      padding: 0,
      color: colors.card,
      fontSize: 16,
    },
    button: {
      marginTop: 250,
      marginBottom: 32,
      flex: 1,
      justifyContent: 'flex-end',
    },
  });
