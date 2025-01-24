export const getConfig = (token, contentType) => {
  const config = {
    headers: {
      "Content-type": contentType || "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
};
