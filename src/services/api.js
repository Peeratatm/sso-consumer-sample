import { http } from "./http";

export const api = {
  uploadImage: (params, options) => {
    const data = new FormData();
    data.append("image", params.file, params.file.name);
    return http.post({
      path: `/file-aws/image/upload`,
      params: data,
      isMultipart: true,
      ...options,
    });
  },
  loginWithSSOToken: (params, options) => {
    return http.post({
      path: `/api/sso-login`,
      params,
      ...options,
    });
  },
  getAccountDetail:(params, options) => {
    return http.post({
      path: `/api/account`,
      params,
      ...options,
    });
  },
};
