import { NavigationProp, RouteProp } from '@react-navigation/native';
import { ViewProps } from 'react-native';
import { RootParamList } from '../constants';

export interface NavigationProps extends ViewProps {
  navigation: NavigationProp<RootParamList>;
  route?: any
}

export interface IpaymentMethodTitleAdjustment {
  [key: string]: {
    title: string;
  };
}

export type retailerType = 'ModernTrade' | 'Pharmacy';