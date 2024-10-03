export interface commonState {
  isLoading: boolean;
  message?: string;
  error: boolean;
  isLoggedIn?: boolean;
}

export interface AuthState extends commonState {
  user: any | null;
  token: string | null;
  mobileNo: string | null;
}

export type userSummaryData = {
  title: string | null;
  value: string | null;
};
interface AddressDetails {
  name: string;
  contactNumber: string;
  country: string;
  pincode: string;
  longitude: number;
  latitude: number;
  buildingNumber: number;
  floorNumber: number;
  buildingName: string;
  streetName: string;
  landmark: string;
  area: string;
  town: string;
  city: string;
  state: string;
  region: string;
  zone: string;
}
export interface User {
  firstName: string;
  lastName: string;
  displayName: string;
  countryCode: string;
  phoneNumber: string;
  email: string;
  identifier: string;
  aliasToAddressMap: Record<string, AddressDetails>;
  badges: string[];
  profilePicS3Url: string;
  token: string;
}
export interface Contact {
  firstName: string;
  lastName: string;
  countryCode: string;
  mobileNumber: string;
  emailId: string;
  alternateId: any;
}
interface FssaiLicense {
  licenseNumber: string;
  validUpto: [number, number, number];
}
interface BillingDetails {
  legalEntityName: string;
  billingAddress: AddressDetails;
  gstNumber: string;
  panNumber: string;
}
interface BankingDetails {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  bankAccountType: string;
}
interface sourceOfContribution {
  additionalProp1: number;
  additionalProp3: number;
  additionalProp2: number;
}
export interface OperatingTime {
  startTime: number;
  endTime: number;
  day: string;
}
export type RetailStoreImage = {
  name: string;
  data: string;
  format: string;
};

export interface ProductCategoryImages {
  productCategoryId: number,
  productCategoryName: string,
  images: string[]
}

export interface commonRetailer {
  // id?: number;
  name: string;
  status: any;
  retailerType: string;
  retailerAddress: AddressDetails;
  billingDetails: BillingDetails;
  bankingDetails: BankingDetails;
  retailerContacts: Contact[];
  productCategoryImages: ProductCategoryImages[];
  availablePaymentMethods: string[];
  // landmarkIds: any;
  sourceOfContributionDistribution: sourceOfContribution;
  // loyalityAffilations: string[];
  retailEquipmentIds: any;
  totalFmcgSalesPerDayInRs: number;
  totalOutletSalesPerDayInRs: number;
  operatingTime: OperatingTime[];
  fssaiLicense: FssaiLicense;
  // storeImages?: any;
}
export interface Retailer extends commonRetailer {
  id: number;
  landmarkTypes: any;
  loyalityAffilations: string[];
  storeImages: string[];
}
export interface IupdateRetailer extends commonRetailer {
  landmarkTypeIds: number[];
  loyalityAffilationIds: string[];
}
export interface ShopInfoData {
  shopName?: string;
  ownerName: string;
  shopContactNum: string;
  storeType: string;
  storeImages: string[];
  isShopOpen?: boolean;
}

// export interface ShopInfoState {
//   shopInfo: ShopInfoData;
//   timings: any;
//   paymentMethods: any;
//   landMarks: any;
//   loyaltyPrograms: any;
// }

export interface ProductCategory {
  name: string;
  id: number;
  image: string | null;
  parentProductCategory: ProductCategory | null;
}

export interface IretailerState extends commonState {
  userSummaryData: userSummaryData[] | null;
  userProfileData: User | null;
  retailers: Retailer[] | null;
  retailerInfo: Retailer | null;
  landMarksTypes: landMarkTypesState[] | null;
  brandsInfo: brandInfoState[] | null;
  updatedRetailerInfo: IupdateRetailer | null;
  productCategory: ProductCategory[] | [];
}
export interface RetailersState extends Retailer {
  skuMixIds: any;
}
export interface apiResponseShopDetails extends Retailer {
  createdAt: Date;
  updatedAt: Date;
  links: {
    self: {
      href: string;
    };
    retailer: {
      href: string;
    };
    skuMix: {
      href: string;
    };
    loyaltyProgrammes: {
      href: string;
    };
    landmarkTypes: {
      href: string;
    };
  };
}

interface commonLinksType {
  href: string;
  hreflang: string;
  title: string;
  type: string;
  deprecation: string;
  profile: string;
  name: string;
  templated: boolean;
}
export interface landMarkTypesState {
  name: string;
  id: 0;
  imageUrl: string

}
interface brandTypes {
  name: string;
  logo: string;
  slogan: string;
  missionStatement: string;
  isRunningLoyaltyProgram: boolean;
  createdAt: string;
  updatedAt: string;
  _links: Record<string, commonLinksType>;
}
export interface brandInfoState {
  id: number;
  name: string;
  logo: string;
}
