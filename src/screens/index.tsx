import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './Login';
import HomeScreen from './Home';
import ShopScreen from './Shop';
import SkuScreen from './Sku';
import ProfileScreen from './Profile';
import {RootParamList, RootScreenEnum} from '../constants';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FindLocation from '../components/FindLocation';
import ShopDetail from '../components/ShopDetail';
import OtpLogin from '../components/OtpLogin';
import LoginSuccess from '../components/LoginSuccess';
import ShopInfo from '../components/ShopInfo';
import Timings from '../components/ShopTimings';
import ShopPayment from '../components/ShopPayment';
import AreaInfo from '../components/AreaInfo';
import ShopLoyalty from '../components/ShopLoyalty';
import EditTime from '../components/EditTime';
import AddAreaInfo from '../components/AddAreaInfo';
import EditAddress from '../components/EditAddress';
import CameraScreen from '../components/CameraScreen';
import Leaderboard from './Leaderboard';
import SuccessMobile from '../components/SuccessMobile';
import SearchScreen from '../components/SerchItems';
import BathScreen from '../components/BathItems';
import EarnScreen from '../components/EarnReward';
import DataScreen from '../components/DataCollection';
import HistoryScreen from '../components/PointHistory';
import {useDispatch, useSelector} from 'react-redux';
import {RootDispatch, RootState} from '../store';
import {checkAuth} from '../store/actions/authAction';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {Text} from 'react-native';

const Stack = createNativeStackNavigator();

function AppScreens() {
  const {isLoggedIn} = useSelector((state: RootState) => state.auth);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigation: NavigationProp<RootParamList> = useNavigation();

  useEffect(() => {
    const fetchAuth = async () => {
      const token = await dispatch<RootDispatch>(checkAuth());
      setToken(token);
      setIsLoading(false);
      if (token) {
        navigation.navigate(RootScreenEnum.HOME_SCREEN);
      } else {
        navigation.navigate(RootScreenEnum.LOGIN_SCREEN);
      }
    };
    fetchAuth();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {isLoading ? (
        <Text>Loading ...</Text>
      ) : isLoggedIn ? (
        <Stack.Navigator
          initialRouteName={RootScreenEnum.HOME_SCREEN}
          screenOptions={{
            headerShown: false,
          }}>
          <>
            <Stack.Screen
              name={RootScreenEnum.HOME_SCREEN}
              component={HomeScreen}
            />
            <Stack.Screen
              name={RootScreenEnum.CAMERA_SCREEN}
              component={CameraScreen}
            />
            <Stack.Screen
              name={RootScreenEnum.FIND_LOCATION}
              component={FindLocation}
            />
            <Stack.Screen
              name={RootScreenEnum.SHOP_DETAIL}
              component={ShopDetail}
            />
            <Stack.Screen
              name={RootScreenEnum.SHOP_SCREEN}
              component={ShopScreen}
            />
            <Stack.Screen
              name={RootScreenEnum.SKU_SCREEN}
              component={SkuScreen}
            />
            <Stack.Screen
              name={RootScreenEnum.SHOP_INFO}
              component={ShopInfo}
            />
            <Stack.Screen name={RootScreenEnum.TIMINGS} component={Timings} />
            <Stack.Screen
              name={RootScreenEnum.EDIT_TIME}
              component={EditTime}
            />
            <Stack.Screen
              name={RootScreenEnum.SHOP_PAYMENT}
              component={ShopPayment}
            />
            <Stack.Screen
              name={RootScreenEnum.AREA_INFO}
              component={AreaInfo}
            />
            <Stack.Screen
              name={RootScreenEnum.ADD_AREA_INFO}
              component={AddAreaInfo}
            />
            <Stack.Screen
              name={RootScreenEnum.SHOP_LOYALTY}
              component={ShopLoyalty}
            />
            <Stack.Screen
              name={RootScreenEnum.PROFILE_SCREEN}
              component={ProfileScreen}
            />
            <Stack.Screen
              name={RootScreenEnum.EDIT_ADDRESS}
              component={EditAddress}
            />
            <Stack.Screen
              name={RootScreenEnum.LEADER_BOARD}
              component={Leaderboard}
            />
            <Stack.Screen
              name={RootScreenEnum.SUCCESS_MOBILE}
              component={SuccessMobile}
            />
            <Stack.Screen
              name={RootScreenEnum.SEARCH_SCREEN}
              component={SearchScreen}
            />
            <Stack.Screen
              name={RootScreenEnum.BATH_SCREEN}
              component={BathScreen}
            />
            <Stack.Screen
              name={RootScreenEnum.EARN_SCREEN}
              component={EarnScreen}
            />
            <Stack.Screen
              name={RootScreenEnum.DATA_SCREEN}
              component={DataScreen}
            />
            <Stack.Screen
              name={RootScreenEnum.HISTORY_SCREEN}
              component={HistoryScreen}
            />
          </>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName={RootScreenEnum.LOGIN_SCREEN}
          screenOptions={{
            headerShown: false,
          }}>
          <>
            <Stack.Screen
              name={RootScreenEnum.LOGIN_SCREEN}
              component={LoginScreen}
            />
            <Stack.Screen
              name={RootScreenEnum.OTP_LOGIN}
              component={OtpLogin}
            />
            <Stack.Screen
              name={RootScreenEnum.SUCCESS_LOGIN}
              component={LoginSuccess}
            />
          </>
        </Stack.Navigator>
      )}
    </GestureHandlerRootView>
  );
}

export default AppScreens;
