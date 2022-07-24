const authTokenStorageKey = 'authToken';

export const getAuthTokenFromStorage = (): string | null =>
  localStorage.getItem(authTokenStorageKey);

export const deleteAuthTokenFromStorage = (): void =>
  localStorage.removeItem(authTokenStorageKey);

export const updateAuthTokenInStorage = (authToken: string): void =>
  localStorage.setItem(authTokenStorageKey, authToken);
