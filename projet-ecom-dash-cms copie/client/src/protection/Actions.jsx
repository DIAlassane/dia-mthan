export const updateAccessToken = (newAccessToken) => {
    return {
      type: 'UPDATE_ACCESS_TOKEN',
      payload: newAccessToken,
    };
  };