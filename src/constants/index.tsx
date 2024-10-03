import { Dispatch } from "react";
import { ShopInfoData } from "../store/types/stateTypes";
import { SetStateAction } from "react";

export enum RootScreenEnum {
  LOGIN_SCREEN = 'LoginScreen',
  OTP_LOGIN = 'OtpLogin',
  SUCCESS_LOGIN = 'LoginSuccess',
  HOME_SCREEN = 'HomeScreen',
  FIND_LOCATION = 'FindLocationScreen',
  SHOP_DETAIL = 'ShopDetail',
  SHOP_SCREEN = 'ShopScreen',
  SHOP_INFO = 'ShopInfo',
  TIMINGS = 'Timings',
  EDIT_TIME = 'EditTime',
  SHOP_PAYMENT = 'ShopPayment',
  AREA_INFO = 'AreaInfo',
  ADD_AREA_INFO = 'AddAreaInfo',
  SHOP_LOYALTY = 'ShopLoyalty',
  SKU_SCREEN = 'SkuScreen',
  PROFILE_SCREEN = 'ProfileScreen',
  EDIT_ADDRESS = 'EditAddress',
  CAMERA_SCREEN = 'CameraScreen',
  LEADER_BOARD = 'Leaderboard',
  SUCCESS_MOBILE = 'SuccessMobile',
  SEARCH_SCREEN = 'SearchScreen',
  BATH_SCREEN = 'BathScreen',
  EARN_SCREEN = 'EarnScreen',
  DATA_SCREEN = 'DataScreen',
  GALLERY_SCREEN = 'GalleryScreen',
  HISTORY_SCREEN = 'HistoryScreen',
}

export type RootParamList = {
  [RootScreenEnum.LOGIN_SCREEN]?: {};
  [RootScreenEnum.OTP_LOGIN]?: {};
  [RootScreenEnum.SUCCESS_LOGIN]?: {};
  [RootScreenEnum.HOME_SCREEN]?: {};
  [RootScreenEnum.FIND_LOCATION]?: {};
  [RootScreenEnum.SHOP_DETAIL]?: {};
  [RootScreenEnum.SHOP_SCREEN]?: {};
  [RootScreenEnum.SHOP_INFO]?: {};
  [RootScreenEnum.TIMINGS]?: {};
  [RootScreenEnum.EDIT_TIME]?: {};
  [RootScreenEnum.SHOP_PAYMENT]?: {};
  [RootScreenEnum.AREA_INFO]?: {};
  [RootScreenEnum.ADD_AREA_INFO]?: {};
  [RootScreenEnum.SHOP_LOYALTY]?: {};
  [RootScreenEnum.SKU_SCREEN]?: {};
  [RootScreenEnum.PROFILE_SCREEN]?: {};
  [RootScreenEnum.EDIT_ADDRESS]?: {};
  [RootScreenEnum.CAMERA_SCREEN]?: { setShopInfo?: Dispatch<SetStateAction<ShopInfoData>>, prevRoute?: string, setSelectedCategoryImage?: any };
  [RootScreenEnum.LEADER_BOARD]?: {};
  [RootScreenEnum.SUCCESS_MOBILE]?: {};
  [RootScreenEnum.SEARCH_SCREEN]?: {};
  [RootScreenEnum.BATH_SCREEN]?: {};
  [RootScreenEnum.EARN_SCREEN]?: {};
  [RootScreenEnum.DATA_SCREEN]?: {};
  [RootScreenEnum.GALLERY_SCREEN]?: {};
  [RootScreenEnum.HISTORY_SCREEN]?: {};
};


//message
export const INVALID_MOBILENO = 'Invalid mobile number add 10 digit number';

//constant variable
export const TEMP_ACCESS_TOKEN = 'temp_access_token';
export const ACCESS_TOKEN = 'access_token';
