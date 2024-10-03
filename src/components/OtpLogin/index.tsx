import React, {useEffect, useRef} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from '@react-navigation/native';
import ButtonComp from '../Button';
import {ThemColors} from '../../App';
import {NavigationProps} from '../../interfaceTypes';
import {RootScreenEnum} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {RootDispatch, RootState} from '../../store';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import {sendOTP, verifyOTP} from '../../store/actions/authAction';
import {AuthState} from '../../store/types/stateTypes';

function OtpLogin({navigation}: NavigationProps): JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {mobileNo} = useSelector((state: RootState) => state.auth as AuthState);
  const [value, setValue] = React.useState<string>('');
  const [resendDisabled, setResendDisabled] = React.useState(true);
  const [timeRemaining, setTimeRemaining] = React.useState(48);
  const [ErrorMsg, setErrorMsg] = React.useState('');
  const dispatch = useDispatch();
  const {isLoading} = useSelector((state: RootState) => state.auth);
  const codeFieldRef = useRef<any>(null);

  useEffect(() => {
    codeFieldRef?.current?.focus();
  }, []);

  const handleVerifyOtp = async () => {
    const response = await dispatch(
      verifyOTP(value, mobileNo as string) as RootDispatch,
    );
    if (response == true) {
      navigation.navigate(RootScreenEnum.SUCCESS_LOGIN);
    } else {
      setErrorMsg('Wrong OTP entered');
    }
  };

  const handleResendOTP = async () => {
    const response = await dispatch<RootDispatch>(sendOTP(mobileNo as string));
    if (response === true) {
      setValue('');
      setTimeRemaining(48);
      setResendDisabled(true);
    }
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          setResendDisabled(false);
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [resendDisabled]);

  return (
    <View style={{flex: 1, position: 'relative'}}>
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
          <Text style={{color: colors.text, fontSize: 16, fontWeight: '600'}}>
            {t('OTP.heading_5')}
          </Text>
        </View>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={styles(colors).container}>
          <Text style={styles(colors).loginHeader}>{t('OTP.heading')}</Text>
          <Text style={styles(colors).loginDesc}>{t('OTP.heading_1')}</Text>
          <View
            style={{
              marginBottom: 40,
              marginTop: 14,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}>
            <Feather
              onPress={() => navigation.goBack()}
              name="edit-3"
              style={{color: colors.card}}
              size={20}
            />
            <Text style={styles(colors).mobileNo}>{`+91${mobileNo}`}</Text>
          </View>
          <View style={styles(colors).otp}>
            <CodeField
              ref={codeFieldRef}
              value={value}
              onChangeText={(text: string) => setValue(text)}
              cellCount={6}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => {
                return (
                  <Text key={index} style={[styles(colors, ErrorMsg).otpBox]}>
                    {isFocused ? <Cursor /> : symbol === '' ? '0' : symbol}
                  </Text>
                );
              }}
            />
          </View>
          {ErrorMsg && (
            <Text style={styles(colors).wrongOtp}>{t(ErrorMsg)}</Text>
          )}
          <Text style={styles(colors).resendOtp}>
            {t('OTP.heading_3')} :
            {resendDisabled && (
              <Text style={styles(colors).otptime}>
                {' '}
                {`00:${timeRemaining.toString().padStart(2, '0')}`}
              </Text>
            )}
            {!resendDisabled && (
              <Text onPress={handleResendOTP} style={styles(colors).resend}>
                {' '}
                {t('OTP.heading_4')}
              </Text>
            )}
          </Text>
        </View>
      </ScrollView>
      <View style={styles(colors).button}>
        <ButtonComp
          title={t('OTP.button')}
          onPress={handleVerifyOtp}
          disabled={!value}
          loading={isLoading}
        />
      </View>
    </View>
  );
}

export default OtpLogin;

const styles = (colors: ThemColors, ErrorMsg?: string) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
    },
    header: {
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      marginBottom: 16,
    },
    headerRow: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 16,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    loginHeader: {
      color: colors.text,
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 6,
      marginTop: 13,
      textAlign: 'center',
    },
    loginDesc: {
      color: colors.card + '90',
      fontSize: 14,
      fontWeight: '400',
      marginBottom: 8,
      textAlign: 'center',
    },
    mobileNo: {
      color: colors.card,
      fontSize: 16,
      fontWeight: '500',
      textAlign: 'center',
    },
    otp: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 16,
    },
    otpBox: {
      width: 56,
      height: 48,
      borderWidth: 1,
      borderColor: ErrorMsg ? colors.notification : colors.border,
      fontSize: 16,
      color: colors.card,
      borderRadius: 8,
      textAlign: 'center',
      lineHeight: 48,
      margin: 3,
    },
    wrongOtp: {
      marginTop: 12,
      color: colors.notification,
      textAlign: 'center',
    },
    resendOtp: {
      color: colors.card + '70',
      fontSize: 14,
      fontWeight: '500',
      textAlign: 'center',
      marginTop: 24,
    },
    otptime: {
      color: colors.card,
    },
    resend: {
      color: colors.primary,
    },
    button: {
      position: 'absolute',
      bottom: 32,
      width: '100%',
      left: 0,
      paddingHorizontal: 16,
    },
  });
