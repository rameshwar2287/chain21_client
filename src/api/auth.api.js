import { Axios } from "../constants/mainContent";

const userApi = "/user";
const adminApi = "/admin";
export async function createUserApi(payload) {
  try {
    const response = await Axios.post(`${userApi}/register`, payload);
    return response?.data;
  } catch (error) {
    return error;
  }
}

export async function loginUserApi(payload) {
  try {
    const response = await Axios.post(`${userApi}/login`, payload);
    return response?.data;
  } catch (error) {
    return error;
  }
}

export async function getIncomeTotal() {
  try {
    const response = await Axios.get(`${userApi}/get-income-summary`);
    console.log("dashboared Data",response.data)
    console.log("direct referal generate nhi ho rha user invest krne pr bhi", response.data);
    return response?.data;
  } catch (error) {
    return error;
  }
}

export async function getTransactionHistory() {
  try {
    const response = await Axios.get(`${userApi}/get-transaction-history`);
    return response?.data;
  } catch (error) {
    return error;
  }
}

export async function getIncomeHistory() {
  try {
    const response = await Axios.get(`${userApi}/get-income-history`);
    return response?.data;
  } catch (error) {
    return error;
  }
}

export async function getUserProfile() {
  try {
    const response = await Axios.get(`${userApi}/get-user`);
    console.log("User Profile Data:", response.data);
    return response?.data;
  } catch (error) {
    return error;
  }
}
