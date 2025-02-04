import axios from "axios";

// Set base URL for API requests
const API_BASE_URL = "http://localhost:8090/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle API errors globally
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// --------------------------------LogIn  API ----------------------------------------------------------
export const logInAPICall = async (data) => {
  try {
    console.log(`this is login api`);
    console.log(`jsonbody is `, data);
    const jsonBody = JSON.stringify(data);
    const response = await api.post("login", jsonBody);
    return response.data;
  } catch (error) {
    console.error("Error logging in API:", error);
    throw error;
  }
};

// --------------------------------Manage Country API ----------------------------------------------------------

export const createCountry = async (data) => {
  try {
    const jsonBody = JSON.stringify(data);
    const response = await api.post("/country", jsonBody);
    return response.data;
  } catch (error) {
    console.error("Error creating country API:", error);
    throw error;
  }
};
export const getCountryListActive = async (search, page, limit, status) => {
  try {
    const queryParams = { search, page, limit, status };
    const response = await api.get("/countries", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching countries API:", error);
    throw error;
  }
};

export const getCountryList = async (body = {}) => {
  try {
    const queryString =
      body && Object.keys(body).length > 0
        ? `?${new URLSearchParams(body).toString()}`
        : "";
    const response = await api.get(`/countries${queryString}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries API:", error);
    throw error;
  }
};

export const updateCountry = async (data) => {
  try {
    const jsonBody = JSON.stringify(data);
    const response = await api.put("/country", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error updating country ${error}`);
    throw error;
  }
};

export const updateCountryStatus = async (body) => {
  try {
    // const jsonBody = JSON.stringify(hsnCode, status);

    const response = await api.post("/country/toggle", body);
    return response.data;
  } catch (error) {
    console.log(`Error updating country status ${error}`);
    throw error;
  }
};

export const getRegionList = async () => {
  try {
    const response = await api.get("/regions");
    return response.data;
  } catch (error) {
    console.error("Error fetching regions API:", error);
    throw error;
  }
};
// ------------------------------Manage Zone --------------------------

export const createZone = async (data) => {
  try {
    const jsonBody = JSON.stringify(data);
    const response = await api.post("/zone", jsonBody);
    return response.data;
  } catch (error) {
    console.error("Error creating country API:", error);
    throw error;
  }
};

export const getZoneList = async (body = {}) => {
  try {
    const queryString =
      body && Object.keys(body).length > 0
        ? `?${new URLSearchParams(body).toString()}`
        : "";

    const response = await api.get(`/zones${queryString}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching zones API:", error);
    throw error;
  }
};

export const getfilteredZoneList = async (page, limit, countryId, status) => {
  try {
    const queryParams = { page, limit, countryId, status };
    const response = await api.get("/zones", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching zones API:", error);
    throw error;
  }
};

export const updateZoneStatus = async (body) => {
  try {
    // const jsonBody = JSON.stringify(hsnCode, status);

    const response = await api.post("/zone/toggle", body);
    return response.data;
  } catch (error) {
    console.log(`Error updating zone status ${error}`);
    throw error;
  }
};

export const updateZone = async (data) => {
  try {
    const jsonBody = JSON.stringify(data);
    const response = await api.put("/zone", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error updating zone ${error}`);
    throw error;
  }
};

// --------------------------------Manage State API ----------------------------------------------------------

export const getStateList = async (
  stateName,
  page,
  limit,
  countryId,
  zoneId,
  status
) => {
  try {
    const queryParams = { stateName, page, limit, countryId, zoneId, status };
    const response = await api.get("/states", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching states API:", error);
    throw error;
  }
};
export const getStateList2 = async (
  stateName,
  page,
  limit,
  countryId,
  zoneId
) => {
  try {
    const queryParams = { stateName, page, limit, countryId, zoneId };
    const response = await api.get("/states", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching states API:", error);
    throw error;
  }
};
export const getStateListsearch = async (countryId, zoneId) => {
  try {
    const queryParams = { countryId, zoneId };
    const response = await api.get("/states", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching states API:", error);
    throw error;
  }
};

export const createState = async (data) => {
  try {
    const jsonBody = JSON.stringify(data);
    const response = await api.post("/state", jsonBody);
    return response.data;
  } catch (error) {
    console.error("Error creating state API:", error);
    throw error;
  }
};
export const updateState = async (data) => {
  try {
    const jsonBody = JSON.stringify(data);
    const response = await api.put("/state", jsonBody);
    return response.data;
  } catch (error) {
    console.error("Error creating state API:", error);
    throw error;
  }
};

export const deleteState = async (id) => {
  try {
    const jsonBody = JSON.stringify({
      id: id,
    });
    const response = await api.post("/state/delete", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error in deleting state ${error}`);
    throw error;
  }
};

export const updateStateStatus = async (state) => {
  try {
    const jsonBody = JSON.stringify(state);
    const response = await api.post("/state/toggle", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error updating state status ${error}`);
    throw error;
  }
};
// --------------------------------Manage District API ----------------------------------------------------------
export const getDistrictList = async () => {
  try {
    const response = await api.get("/districts");
    return response.data;
  } catch (error) {
    console.error("Error fetching districts API:", error);
    throw error;
  }
};

export const deleteDistrictList = async (Id) => {
  try {
    const jsonBody = JSON.stringify({
      id: Id,
    });
    console.log(jsonBody);
    const response = await api.post(`/district/delete`, jsonBody);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting district API:", error);
    throw error;
  }
};

export const createDistrict = async (data) => {
  try {
    const jsonBody = JSON.stringify(data);
    const response = await api.post("/district", jsonBody);
    return response.data;
  } catch (error) {
    console.error("Error creating district API:", error);
    throw error;
  }
};

// --------------------------------Manage City API ----------------------------------------------------------

export const getCityList = async (
  countryId,
  zoneId,
  stateId,
  page,
  limit,
  cityName
) => {
  try {
    const queryParams = { countryId, zoneId, stateId, page, limit, cityName };
    const response = await api.get("/cities", { params: queryParams });
    return response.data;
  } catch (error) {
    console.error("Error fetching cities API:", error);
    throw error;
  }
};

export const deleteCityList = async (Id) => {
  try {
    const jsonBody = JSON.stringify({
      id: Id,
    });
    console.log(jsonBody);
    const response = await api.post(`/city/delete`, jsonBody);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting city API:", error);
    throw error;
  }
};

export const createCity = async (data) => {
  try {
    const jsonBody = JSON.stringify(data);
    const response = await api.post("/city", jsonBody);
    return response.data;
  } catch (error) {
    console.error("Error creating city API:", error);
    throw error;
  }
};

export const updateCity = async (data) => {
  try {
    const jsonBody = JSON.stringify(data);
    const response = await api.put("/city", jsonBody);
    return response.data;
  } catch (error) {
    console.error("Error updating city API:", error);
    throw error;
  }
};

export const updateCityStatus = async (city) => {
  try {
    const jsonBody = JSON.stringify(city);
    const response = await api.post("/city/toggle", jsonBody);
    return response.data;
  } catch (error) {
    console.error("Error updating city status API:", error);
    throw error;
  }
};

// --------------------------------Manage Brand API ----------------------------------------------------------
export const fetchBrandList = async (page, limit, search) => {
  try {
    const queryParams = { page, limit, search };
    console.log(queryParams);
    const response = await api.get("/brands", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.log(`Error fetching brand list ${error}`);
    throw error;
  }
};

export const fetchAllBrandList = async () => {
  try {
    const queryParams = {};
    const response = await api.get("/brands", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching brand list: ${error}`);
    throw error;
  }
};

export const createBrand = async (data) => {
  try {
    const jsonBody = JSON.stringify(data);
    const response = await api.post("/brand", jsonBody);
    return response.data;
  } catch (error) {
    console.log("Error creating brand error", error);
    throw error;
  }
};
export const updateBrand = async (data) => {
  try {
    const jsonBody = JSON.stringify(data);
    console.log(`jsonBody is ${jsonBody}`);
    const response = await api.put("/brand", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error updating brand ${error}`);
    throw error;
  }
};
export const updateBrandStatus = async (brand) => {
  try {
    const jsonBody = JSON.stringify(brand);

    const response = await api.post("/brand/toggle", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error updating brand status ${error}`);
    throw error;
  }
};

export const deleteBrand = async (brandId) => {
  try {
    const jsonBody = JSON.stringify({ brandId: brandId });
    console.log(jsonBody);
    const response = await api.post("/brand/delete", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error deleting brand ${error}`);
    throw error;
  }
};

//---------------------------------Manage Category API ----------------------------------------------------------

export const fetchCategoryList = async (
  brandId,
  categoryName,
  page,
  limit,
  status
) => {
  try {
    const queryParams = { brandId, categoryName, page, limit, status };
    const response = await api.get("/categories", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching category list:", error);
    throw error;
  }
};
export const fetchCategoryList2 = async (
  brandId,
  categoryName,
  page,
  limit
) => {
  try {
    const queryParams = { brandId, categoryName, page, limit };
    const response = await api.get("/categories", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching category list:", error);
    throw error;
  }
};
export const fetchAllCategoryList = async (page, limit) => {
  try {
    const queryParams = { page, limit };
    const response = await api.get("/categories", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching category list:", error);
    throw error;
  }
};

export const createCategory = async (category) => {
  try {
    const jsonBody = JSON.stringify(category);
    const response = await api.post("/category", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error creating category ${error}`);
    throw error;
  }
};

export const updateCategory = async (data) => {
  try {
    const jsonBody = JSON.stringify(data);
    const response = await api.put("/category", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error updating category ${error}`);
    throw error;
  }
};

export const updateCategoryStatus = async (category) => {
  try {
    const jsonBody = JSON.stringify(category);
    const response = await api.post("/category/toggle", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error updating category status ${error}`);
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const jsonBody = JSON.stringify({ categoryId: categoryId });
    const response = await api.post("/category/delete", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error deleting category ${error}`);
    throw error;
  }
};

// --------------------------------Manage SubCategory API ----------------------------------------------------------

export const fetchSubCategoryList = async (
  subcategoryName,
  page,
  limit,
  brandId,
  categoryId
) => {
  try {
    const queryParams = { subcategoryName, page, limit, brandId, categoryId };
    const response = await api.get("/subcategories", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching subcategory list:", error);
    throw error;
  }
};
export const fetchSubCategoryListActive = async (
  subcategoryName,
  page,
  limit,
  brandId,
  categoryId,
  status
) => {
  try {
    const queryParams = {
      subcategoryName,
      page,
      limit,
      brandId,
      categoryId,
      status,
    };
    const response = await api.get("/subcategories", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching subcategory list:", error);
    throw error;
  }
};
export const createSubCategory = async (subCategory) => {
  try {
    const jsonBody = JSON.stringify(subCategory);
    const response = await api.post("/subcategory", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error creating subcategory ${error}`);
    throw error;
  }
};

export const updateSubCategory = async (data) => {
  try {
    const jsonBody = JSON.stringify(data);
    const response = await api.put("/subcategory", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error updating subcategory ${error}`);
    throw error;
  }
};

export const updateSubCategoryStatus = async (subcategoryId) => {
  try {
    const jsonBody = JSON.stringify(subcategoryId);
    const response = await api.post("/subcategory/toggle", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error updating subcategory status ${error}`);
    throw error;
  }
};

// --------------------------------Manage Model API ----------------------------------------------------------

export const fetchModelList = async (
  modelName,
  page,
  limit,
  brandId,
  categoryId,
  subcategoryId
) => {
  try {
    const queryParams = {
      modelName,
      page,
      limit,
      brandId,
      categoryId,
      subcategoryId,
    };
    const response = await api.get("/models", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching model list:", error);
    throw error;
  }
};

export const createModel = async (model) => {
  try {
    const jsonBody = JSON.stringify(model);
    const response = await api.post("/model", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error creating model ${error}`);
    throw error;
  }
};

export const updateModel = async (data) => {
  try {
    const jsonBody = JSON.stringify(data);
    const response = await api.put("/model", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error updating model ${error}`);
    throw error;
  }
};

export const updateModelStatus = async (model) => {
  try {
    const jsonBody = JSON.stringify(model);
    const response = await api.post("/model/toggle", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error updating model status ${error}`);
    throw error;
  }
};

// --------------------------------TAX API ----------------------------------------------------------

export const createTax = async (data) => {
  try {
    const jsonBody = JSON.stringify(data);
    const response = await api.post("/tax", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error creating brand ${error}`);
    throw error;
  }
};

export const updateTax = async (data) => {
  try {
    const jsonBody = JSON.stringify(data);
    const response = await api.put("/tax", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error updaing tax ${error}`);
    throw error;
  }
};

export const getTaxes = async (search = "", page = 1, limit = 10) => {
  try {
    const response = await api.get("/taxes", {
      params: { search, page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching taxes:", error);
    throw error;
  }
};

export const filterHsnCode = async (hsnCode = "", page = 1, limit = 10) => {
  try {
    const response = await api.get("/taxes/hsnCode", {
      params: { hsnCode, page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching taxes:", error);
    throw error;
  }
};

export const updateTaxStatus = async (body) => {
  try {
    // const jsonBody = JSON.stringify(hsnCode, status);

    const response = await api.post("/tax-status", body);
    return response.data;
  } catch (error) {
    console.log(`Error updating tax status ${error}`);
    throw error;
  }
};

export const deleteTax = async (taxId) => {
  try {
    const response = await api.post(`/taxes/delete/${taxId}`);
    return response.data;
  } catch (error) {
    console.log(`Error deleting tax ${error}`);
    throw error;
  }
};

//----------------------------------Manage Spare Part -------------------------------------------------------//

export const fetchSparePartList = async (
  sparePartName,
  sparePartCode,
  page,
  limit
) => {
  try {
    const queryParams = {
      sparePartName,
      sparePartCode,
      page,
      limit,
    };

    const response = await api.get("/spare-parts/", {
      params: queryParams,
    });

    return response.data;
  } catch (error) {
    console.log(`Error fetching spare part list: ${error}`);
    throw error;
  }
};

export const fetchSparePartList2 = async () => {
  try {
    const response = await api.get("/spare-parts");
    return response.data;
  } catch (error) {
    console.log(`Error fetching spare part list: ${error}`);
    throw error;
  }
};

export const createSparePart = async (data) => {
  try {
    const jsonBody = JSON.stringify(data);
    const response = await api.post("/spare-part", jsonBody);
    return response.data;
  } catch (error) {
    console.log("Error creating spare part error", error);
    throw error;
  }
};

export const updateSparePart = async (data) => {
  try {
    const jsonBody = JSON.stringify(data);
    console.log(`jsonBody is ${jsonBody}`);
    const response = await api.put("/spare-part", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error updating spare part ${error}`);
    throw error;
  }
};

export const updateSparePartStatus = async (sparePartId) => {
  try {
    const jsonBody = JSON.stringify(sparePartId);

    const response = await api.post("/spare-part-status", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error updating spare part status ${error}`);
    throw error;
  }
};

// ----------------------------------------------------Manage Spare Part mapping --------------------------------------------//

export const mapSparePartToModel = async (data) => {
  try {
    const jsonBody = JSON.stringify(data);
    const response = await api.post("/spare-part/model", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error mapping spare part to model ${error}`);
    throw error;
  }
};

export const getSparePartByModel = async (params) => {
  try {
    const response = await api.get("/model/spare-parts", { params });
    return response.data;
  } catch (error) {
    console.log(`Error in getting spare part by model: ${error}`);
    throw error;
  }
};

export const getSparePartByModelToggle = async (id) => {
  try {
    const response = await api.put(`/spare-part/model/toggle-status/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Error in getting status update spare part by model: ${error}`);
    throw error;
  }

};

//---------------------------------------------------------user master--------------------------------------------------//

export const createUser = async (data) => {
  try {
    // const jsonBody = JSON.stringify(data);
    const response = await api.post("/user/create", data);
    return response.data;
  } catch (error) {
    console.log(`Error creating user ${error}`);
    throw error;
  }
};

//---------------------------------------------------AMC Master -------------------------------------------------------//

export const fetchAmcMaster = async (filters) => {
  try {
    const response = await api.get("/amcs", { params: filters });
    return response.data;
  } catch (error) {
    console.log(`Error in fetching AMC master: ${error}`);
    throw error;
  }
};

export const createAmcMaster = async (data) => {
  try {
    const jsonBody = JSON.stringify(data);
    const response = await api.post("/amc", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error in creating amc master ${error}`);
    throw error;
  }
};
export const amcStatusUpdate = async (data) => {
  try {
    const jsonBody = JSON.stringify(data);
    const response = await api.post("/amc-status", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error in creating amc master ${error}`);
    throw error;
  }
};

export const addAmc = async (data) => {
  try {
    const jsonBody = JSON.stringify(data);
    const response = await api.post("/amc", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error in creating amc master ${error}`);
    throw error;
  }
};

export const updateAmc = async (data) => {
  try {
    const jsonBody = JSON.stringify(data);
    const response = await api.put("/amc", jsonBody);
    return response.data;
  } catch (error) {
    console.log(`Error in creating amc master ${error}`);
    throw error;
  }
};

//--------------------------------------------Customers-------------------------------------------------------------------//

export const createCustomers = async (data) => {
  try {
    const response = await api.post("/customer", data);
    return response.data;
  } catch (error) {
    console.log(`Error creating customer ${error}`);
  }
};

//-----------------------spare part  mapping ---------------------------------------------------------------------------------------
export const getServiceCenterList = async () => {
  try {
    const response = await api.get("/organization/service-centers");
    return response.data;
  } catch (error) {
    console.error(`Error in creating getServiceCenterList: ${error}`);
    throw error;
  }
};

export default api;
