import {
  GET_BRAND_FAILURE,
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
  GET_RETAILER_SHOPINFO_FAILURE,
  GET_RETAILER_SHOPINFO_REQUEST,
  GET_RETAILER_SHOPINFO_SUCCESS,
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
import { IretailerState } from '../types/stateTypes';

const retailerIntialState: IretailerState = {
  isLoading: false,
  error: false,
  userSummaryData: null,
  userProfileData: null,
  retailers: [],
  retailerInfo: null,
  updatedRetailerInfo: null,
  landMarksTypes: null,
  brandsInfo: null,
  productCategory: []
};

const retailerReducer = (state = retailerIntialState, action: any) => {
  switch (action.type) {
    case GET_USER_SUMMARY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_SUMMARY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userSummaryData: action.payload.userSummaryData ?? [],
      };
    case GET_USER_SUMMARY_FAILURE:
      return {
        ...state,
        isLoading: false,
        userSummaryData: null,
        error: true,
      };
    case GET_USER_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: false,
      };
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfileData: action.payload.userProfileData,
        isLoading: false,
      };
    case GET_USER_PROFILE_FAILURE:
      return {
        ...state,
        userProfileData: null,
        error: true,
        isLoading: false,
      };

    case GET_RETAILERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_RETAILERS_SUCCESS:
      return {
        ...state,
        retailers: action.payload.retailers ?? [],
        isLoading: false,
        error: false,
      };
    case GET_RETAILERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        retailers: [],
        error: true,
      };
    case SET_RETAILERS_SHOP_INFO_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SET_RETAILERS_SHOP_INFO: {
      return {
        ...state,
        retailerInfo: { ...state.retailerInfo, ...action.payload },
        isLoading: false,
      };
    }
    case GET_RETAILER_SHOPINFO_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_RETAILER_SHOPINFO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        retailerInfo: action.payload,
      };
    }
    case GET_RETAILER_SHOPINFO_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    case GET_LANDMARK_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_LANDMARK_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        landMarksTypes: action.payload,
      };
    }
    case GET_LANDMARK_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    case GET_BRAND_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_BRAND_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        brandsInfo: action.payload,
      };
    }
    case GET_BRAND_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    case UPDATE_RETAILERS_SHOPINFO_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UPDATE_RETAILERS_SHOPINFO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        updatedRetailerInfo: action.payload
      };
    }
    case UPDATE_RETAILERS_SHOPINFO_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    case GET_PRODUCT_CATEGORIES_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case GET_PRODUCT_CATEGORIES_SUCCESS: {
      return {
        ...state,
        productCategory: action.payload
      }
    }
    case GET_PRODUCT_CATEGORIES_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }
    case UPDATE_RETAILER_STOREIMAGES_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case UPDATE_RETAILER_STOREIMAGES_SUCCESS: {
      return {
        ...state,
        isLoading: false
      }
    }
    case UPDATE_RETAILER_STOREIMAGES_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error:true
      }
    }
    default:
      return state;
  }
};

export default retailerReducer;