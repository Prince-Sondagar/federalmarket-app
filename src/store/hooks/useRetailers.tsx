import { useDispatch, useSelector } from 'react-redux';
import {
  UpdateRetailerStoreImages,
  getBrandInfo,
  getLandMarkTypes,
  getProductCategory,
  getRetailers,
  getUserProfileDetails,
  getUserSummary,
  setRetailersShopInfo,
  updateRetailerInfo,
} from '../actions/retailerAction';
import { RootDispatch, RootState } from '..';
import { IretailerState, IupdateRetailer, Retailer } from '../types/stateTypes';

const useRetailers = () => {
  const dispatch = useDispatch();
  const {
    userSummaryData,
    isLoading,
    userProfileData,
    retailers,
    retailerInfo,
    landMarksTypes,
    brandsInfo,
    updatedRetailerInfo,
    productCategory
  } = useSelector((state: RootState) => {
    return state.retailer as IretailerState;
  });

  const getUserSummaryData = async () => {
    dispatch<RootDispatch>(getUserSummary());
  };

  const getUserProfileData = () => {
    dispatch<RootDispatch>(getUserProfileDetails());
  };

  const getRetailersData = (latitude: number, longitude: number) => {
    dispatch<RootDispatch>(getRetailers(latitude, longitude));
  };

  //   const setRetailersShopInfoData = <K extends keyof any>(
  //     updatedShopInfo: Pick<any, K>,
  //   ) => {
  //     dispatch<RootDispatch>(
  //       setRetailersShopInfo({...retailerInfo, ...updatedShopInfo}),
  //     );
  //   };

  const setRetailersShopInfoData = <K extends keyof Retailer>(
    updatedShopInfo: Pick<Retailer, K>,
  ) => {
    dispatch<RootDispatch>(
      // console.log("updatedShopInfoHook====>",updatedShopInfo);
      setRetailersShopInfo({ ...retailerInfo, ...updatedShopInfo } as Retailer),
    );
  };

  const setRetailersUpdateShopInfoData = <K extends keyof IupdateRetailer>(
    updatedShopInfo: Pick<IupdateRetailer, K>,
  ) => {
    dispatch<RootDispatch>(
      // console.log("updatedShopInfoHook====>",updatedShopInfo);
      setRetailersUpdateShopInfoData({ ...updatedRetailerInfo, ...updatedShopInfo } as IupdateRetailer),
    );
  };

  const getLandmark = () => {
    dispatch<RootDispatch>(getLandMarkTypes());
  };

  const getBrands = () => {
    dispatch<RootDispatch>(getBrandInfo());
  };


  const updateRetailer = async (updatedShopInfo: any, id: number) => {
    try {

      const status = await dispatch<RootDispatch>(updateRetailerInfo(updatedShopInfo, id));

      return status;
    } catch (error) {
      console.log("error ==> ", error);
    }
  }

  const getSkuproductCategory = () => {
    dispatch<RootDispatch>(getProductCategory())
  }


  const updateRetaiterStoreImg = (retailerId: number, images: any) => {
    const status = dispatch<RootDispatch>(UpdateRetailerStoreImages(retailerId, images))
    return status
  }

  return {
    getUserSummaryData,
    userSummaryData,
    isLoading,
    getUserProfileData,
    userProfileData,
    retailers,
    retailerInfo,
    getRetailersData,
    setRetailersShopInfoData,
    getLandmark,
    landMarksTypes,
    getBrands,
    brandsInfo,
    updateRetailer,
    productCategory,
    getSkuproductCategory,
    updateRetaiterStoreImg
  };
};

export default useRetailers;