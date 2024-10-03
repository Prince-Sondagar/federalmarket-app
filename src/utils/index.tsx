import AsyncStorage from '@react-native-async-storage/async-storage';
import { OperatingTime, Retailer } from '../store/types/stateTypes';
import { IpaymentMethodTitleAdjustment } from '../interfaceTypes';

export const setItemAsyncStorage = async (key: string, data: any) => {
  try {
    await AsyncStorage.setItem(key, data);
    console.log('Token stored successfully!');
  } catch (error) {
    console.error('Error while  storing data in AsyncStorage:', error);
  }
};

export const getItemAsyncStorage = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const removeItemAsyncStorage = async (key: string) => {
  try {
    const data = await AsyncStorage.removeItem(key);

    return data;
  } catch (error) {
    console.log('Error while removing data in AsyncStorage:');
  }
};

export const clearAsyncStorage = async () => {
  try {
    const data = await AsyncStorage.clear();
    return data;
  } catch (error) {
    console.log('Error while removing data in AsyncStorage:');
  }
};

export const generateUUId = (): string => {
  const timestamp = Date.now().toString(16);
  const randomPart = Math.random().toString(16).substr(2, 6);
  return `${timestamp}-${randomPart}`;
};


export const formatTime = (time: number) => {
  const hours = Math.floor(time / 100);
  const minutes = time % 100;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours =
    hours % 12 === 1 ? 12 : hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};



export const isShopOpenNow = (operatingTime: OperatingTime[]) => {
  const now = new Date();
  const currentDay = now
    .toLocaleString('en-us', { weekday: 'long' })
    .split(',')[0]
    .trim();

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinute; // Convert current time to minutes

  const todayOperatingHours = operatingTime?.find(
    opt => opt.day.trim().toLowerCase() === currentDay.toLowerCase(),
  );

  if (todayOperatingHours) {
    const { startTime, endTime } = todayOperatingHours;

    const convertTimeToMinutes = (time: number) => {
      const timeString = time.toString().padStart(4, '0'); // Pad with leading zeros
      const hours = parseInt(timeString.substring(0, 2), 10);
      const minutes = parseInt(timeString.substring(2), 10);
      // console.log('minutes===>', hours * 60 + minutes, minutes);
      return hours * 60 + minutes;
    };

    // Convert start and end times to minutes
    const startMinutes = convertTimeToMinutes(startTime);
    const endMinutes = convertTimeToMinutes(endTime); // Adjust the conversion for endTime

    // Check if the current time is within the operating hours
    return currentTime >= startMinutes && currentTime < endMinutes;
  }
  return false;
};

export const paymentMethodsTitleAdjustment: IpaymentMethodTitleAdjustment = {
  Upi: {
    title: 'UPI',
  },
  GooglePay: {
    title: 'Google pay',
  },
  'Credit/Debit': {
    title: 'Credit/Debit',
  },
  PhonePay: {
    title: 'Phone pay',
  },
  Paytm: {
    title: 'Paytm',
  },
  Cod: {
    title: 'COD',
  },
  BharatPe: {
    title: 'BharatPe'
  }
};

export const isStepCompeleted = (stepName: string, retailerData: Retailer | null) => {
  switch (stepName) {
    case 'ShopInfo':
      const { retailerContacts, retailerType, storeImages } = retailerData ?? {}
      const hasContactWithData = retailerContacts?.some(
        (contact) => contact.firstName || contact.mobileNumber
      );
      return hasContactWithData || !!retailerType || (storeImages && storeImages.length > 0);

    case 'Timings':
      const { operatingTime } = retailerData ?? {}
      return operatingTime && operatingTime.length > 0

    case 'ShopPayment':
      const { availablePaymentMethods } = retailerData ?? {}
      return availablePaymentMethods && availablePaymentMethods.length > 0

    case 'AreaInfo':
      const { landmarkTypes } = retailerData ?? {};
      return landmarkTypes && landmarkTypes.length > 0

    case 'ShopLoyalty':
      const { loyalityAffilations } = retailerData ?? {}
      return loyalityAffilations && loyalityAffilations.length > 0

    default:
      false;
  }
}