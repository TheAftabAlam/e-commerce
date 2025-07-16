import { API_BASE_URL, API_URLS } from "./constant"
import axios from "axios";

export const fetchCategories = async () => {
  const url = API_BASE_URL + API_URLS.GET_CATEGORIES;

  try {
    const result = await axios.get(url);
    return result?.data;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};
