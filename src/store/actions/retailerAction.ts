import { RootDispatch } from '..';
import API from '../../utils/axios';
import {
  GET_BRAND_REQUEST,
  GET_BRAND_SUCCESS,
  GET_LANDMARK_FAILURE,
  GET_LANDMARK_REQUEST,
  GET_LANDMARK_SUCCESS,
  GET_PRODUCT_CATEGORIES_FAILURE,
  GET_PRODUCT_CATEGORIES_REQUEST,
  GET_PRODUCT_CATEGORIES_SUCCESS,
  GET_RETAILERS_FAILURE,
  GET_RETAILERS_REQUEST,
  GET_RETAILERS_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_SUMMARY_FAILURE,
  GET_USER_SUMMARY_REQUEST,
  GET_USER_SUMMARY_SUCCESS,
  SET_RETAILERS_SHOP_INFO,
  SET_RETAILERS_SHOP_INFO_REQUEST,
  UPDATE_RETAILERS_SHOPINFO_FAILURE,
  UPDATE_RETAILERS_SHOPINFO_REQUEST,
  UPDATE_RETAILERS_SHOPINFO_SUCCESS,
  UPDATE_RETAILER_STOREIMAGES_FAILURE,
  UPDATE_RETAILER_STOREIMAGES_REQUEST,
  UPDATE_RETAILER_STOREIMAGES_SUCCESS,
} from '../types/actionTypes';
import {
  IupdateRetailer,
  Retailer,
  userSummaryData,
} from '../types/stateTypes';

export const getUserSummary = () => async (dispatch: RootDispatch) => {
  try {
    dispatch({ type: GET_USER_SUMMARY_REQUEST });
    const response = await API.get('/user/summary');
    const summaryData = await response?.data;
    const userSumaryList: userSummaryData[] = [
      { title: 'home.title', value: summaryData?.total_points },
      { title: 'home.title_1', value: summaryData?.shops_visited },
      { title: 'home.title_2', value: summaryData?.image_data },
    ];
    dispatch({
      type: GET_USER_SUMMARY_SUCCESS,
      payload: { userSummaryData: userSumaryList ?? [] },
    });
  } catch (error) {
    dispatch({ type: GET_USER_SUMMARY_FAILURE });
  }
};

export const getUserProfileDetails = () => async (dispatch: RootDispatch) => {
  try {
    dispatch({ type: GET_USER_PROFILE_REQUEST });
    const response = await API.get(`/user/${1}`);
    console.log();

    const profileData = await response.data;
    dispatch({
      type: GET_USER_PROFILE_SUCCESS,
      payload: { userProfileData: profileData ?? {} },
    });
  } catch (error) {
    dispatch({ type: GET_USER_PROFILE_FAILURE });
  }
};

export const getRetailers =
  (latitude: number, longitude: number) => async (dispatch: RootDispatch) => {
    try {
      dispatch({ type: GET_RETAILERS_REQUEST });
      const response = await API.get(
        `/retailer?latitude=${latitude}&longitude=${longitude}`,
      );
      const retailerData = await response.data;

      if (response.status === 200 && retailerData) {
        dispatch({
          type: GET_RETAILERS_SUCCESS,
          payload: { retailers: retailerData ?? [] },
        });
      }
    } catch (error) {
      dispatch({ type: GET_RETAILERS_FAILURE });
    }
  };

export const setRetailersShopInfo =
  (retailerInfo: Retailer) => async (dispatch: RootDispatch) => {
    try {
      dispatch({ type: SET_RETAILERS_SHOP_INFO_REQUEST });
      await dispatch({
        type: SET_RETAILERS_SHOP_INFO,
        payload: retailerInfo,
      });
    } catch (error) {
      dispatch({ type: GET_RETAILERS_FAILURE });
    }
  };


export const getLandMarkTypes = () => async (dispatch: RootDispatch) => {
  try {
    dispatch({ type: GET_LANDMARK_REQUEST });
    const response = await API.get('/landmarkType');
    const landmarkTypes = await response.data;

    if (response.status === 200) {
      dispatch({ type: GET_LANDMARK_SUCCESS, payload: landmarkTypes });
    }
  } catch (error) {
    dispatch({ type: GET_LANDMARK_FAILURE });
  }
};

export const getBrandInfo = () => async (dispatch: RootDispatch) => {
  try {
    dispatch({ type: GET_BRAND_REQUEST });
    const response = await API.get('/brand');
    const brandsInfo = await response.data;

    if (response.status === 200) {
      dispatch({ type: GET_BRAND_SUCCESS, payload: brandsInfo ?? [] });
    }
  } catch (error) {
    dispatch({ type: GET_LANDMARK_FAILURE });
  }
};

export const setRetailersUpdatedShopInfo =
  (retailerInfo: IupdateRetailer) => async (dispatch: RootDispatch) => {
    try {
      dispatch({ type: SET_RETAILERS_SHOP_INFO_REQUEST });
      await dispatch({
        type: SET_RETAILERS_SHOP_INFO,
        payload: retailerInfo,
      });
    } catch (error) {
      dispatch({ type: GET_RETAILERS_FAILURE });
    }
  };

export const updateRetailerInfo =
  (retailerInfo: IupdateRetailer, id: number) =>
    async (dispatch: RootDispatch) => {
      try {
        dispatch({ type: UPDATE_RETAILERS_SHOPINFO_REQUEST });

        const updatedRetailerInfo = await API.patch(`/retailer/${id}`, {
          ...retailerInfo,
        });

        await dispatch({
          type: UPDATE_RETAILERS_SHOPINFO_SUCCESS,
          payload: retailerInfo,
        });
        return true;
      } catch (error) {
        dispatch({ type: UPDATE_RETAILERS_SHOPINFO_FAILURE });
        return false;
      }
    };

export const getProductCategory = () => async (dispatch: RootDispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_CATEGORIES_REQUEST });

    const getProductCategory = await API.get('/productCategory');

    dispatch({
      type: GET_PRODUCT_CATEGORIES_SUCCESS,
      payload: getProductCategory.data,
    });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_CATEGORIES_FAILURE });
  }
}

export const UpdateRetailerStoreImages = (id: number, images: any) => async (dispatch: RootDispatch) => {
  try {
    dispatch({ type: UPDATE_RETAILER_STOREIMAGES_REQUEST });

    const formData = new FormData();

    for (const path of images) {
      const response = await fetch(path);
      const blob = await response.blob();
      const fileName = path.substring(path.lastIndexOf('/') + 1);
      const file = new File([blob], fileName);
      formData.append('images', file);
    }
    console.log("formData---->", formData);

    const response = await API.patch(`/retailer/updateStoreImages/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const data = await response.data
    console.log("data====>", data);

    if (response.status === 200) {
      console.log("updated successfully ");
      return true
    }

    dispatch({ type: UPDATE_RETAILER_STOREIMAGES_SUCCESS });
  } catch (error) {
    console.log("error----->", error);
    dispatch({ type: UPDATE_RETAILER_STOREIMAGES_FAILURE });
    return false;
  }
};