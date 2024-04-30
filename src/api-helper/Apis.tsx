import createApiInstance from "./ApiInstance";

export const getAllSubscribers = async (token?: any): Promise<any> => {
  try {
    const api = createApiInstance(token);
    const response = await api.post("api/v1/admin/getAllSubscribers");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
