import { IFilters } from "@/types";
import { api } from "@/lib/api-client";
import { getErrorMessage } from "@/lib/utils";
import { User } from "@/types/user";

export const listUsers = async (filters: IFilters) => {
  try {
    const response = await api.get<User[]>(
      `/users?${new URLSearchParams(filters as Record<string, string>)}`,
    );
    if (response.success) {
      return {
        data: response?.data,
        success: true,
        totalCount: response?.totalCount,
      };
    } else {
      return {
        data: [],
        success: false,
        message:
          response?.message ?? "An error occurred while retrieving users",
      };
    }
  } catch (error) {
    return {
      data: [],
      success: false,
      message: getErrorMessage(error, {
        message: "An error occurred while retrieving users",
      }),
    };
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await api.delete(
      `/users/${id}`,
      {},
      "An error occurred while deleting the user",
    );
    if (response.success) {
      return {
        data: response?.data,
        success: true,
      };
    } else {
      return {
        data: null,
        success: false,
        message:
          response?.message ?? "An error occurred while deleting the user",
      };
    }
  } catch (error) {
    return {
      data: null,
      success: false,
      message: getErrorMessage(error, {
        message: "An error occurred while deleting the user",
      }),
    };
  }
};

export const createUser = async (user: Partial<User>) => {
  try {
    const response = await api.post(
      "/users",
      user,
      {},
      "An error occurred while creating the user",
    );
    if (response.success) {
      return {
        data: response?.data,
        success: true,
      };
    } else {
      return {
        data: null,
        success: false,
        message:
          response?.message ?? "An error occurred while creating the user",
      };
    }
  } catch (error) {
    return {
      data: null,
      success: false,
      message: getErrorMessage(error, {
        message: "An error occurred while creating the user",
      }),
    };
  }
};

export const updateUser = async (user: Partial<User>) => {
  try {
    const response = await api.put(
      `/users/${user.id}`,
      user,
      {},
      "An error occurred while updating the user",
    );
    if (response.success) {
      return {
        data: response?.data,
        success: true,
      };
    } else {
      return {
        data: null,
        success: false,
        message:
          response?.message ?? "An error occurred while updating the user",
      };
    }
  } catch (error) {
    return {
      data: null,
      success: false,
      message: getErrorMessage(error, {
        message: "An error occurred while updating the user",
      }),
    };
  }
};
