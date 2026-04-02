import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "__k__";

export const saveToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token, {
      requireAuthentication: false,
    });
  } catch (error) {
    console.error("Error saving token", error);
  }
};

export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY, {
      requireAuthentication: false,
      authenticationPrompt: "Authenticate to log in to your account",
    });
    return token;
  } catch (error) {
    console.error("Error getting token", error);
    return null;
  }
};

export const deleteToken = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};
