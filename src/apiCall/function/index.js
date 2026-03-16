import { axios } from "../../shared/axios";
import { getDataFromStore } from "../../store/getStore";

export const getToken = (section = 'auth') => {
  const auth =
    getDataFromStore(section) ||
    getDataFromStore(String(section).toLowerCase()) ||
    getDataFromStore(String(section).toUpperCase());
  const token = auth?.session?.token || auth?.auth?.token || auth?.token?.token || auth?.token;

  if (token) {
    return token;
  }
};

function removeNonISO88591Characters(input) {
  const iso88591Regex = /^[\\x00-\\xFF]*$/;
  return Array.from(input).filter((char) => iso88591Regex.test(char)).join('');
}

export const apiFunction = async (
  url,
  method,
  postData,
  token,
  extraConfig,
  section = 'auth',
  extraHeader,
  callback,
) => {
  let config = {
    method,
    url,
    data: postData || {},
  };

  if (token) {
    const authToken = getToken(section);
    config = {
      ...config,
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : undefined,
        token: authToken ? `${authToken}` : undefined,
      },
    };
  }

  if (extraConfig === 'blob') {
    config = {
      ...config,
      responseType: 'blob',
    };
  }

  if (extraConfig === 'formData') {
    config = {
      ...config,
      headers: { ...config.headers, 'content-type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        callback?.(Math.round((progressEvent.loaded / progressEvent.total) * 100));
      },
    };
  }

  if (extraHeader?.log) {
    config = {
      ...config,
      headers: {
        ...config.headers,
        log: extraHeader.log,
        additionalData: removeNonISO88591Characters(
          JSON.stringify(extraHeader.additionalData),
        ),
      },
    };
  } else if (extraHeader) {
    config = {
      ...config,
      headers: {
        ...config.headers,
        ...extraHeader,
      },
    };
  }

  try {
    const response = await axios(config);

    if (extraConfig === 'blob') {
      return response.data;
    }

    return {
      data:
        typeof response.data.data === 'boolean'
          ? response.data.data
          : response.data.data || {},
      status: response.data.status === 'success',
      message: response.data.status,
    };
  } catch (error) {
    if (error.response?.data) {
      return {
        ...error.response.data,
        status: false,
      };
    }

    return {
      message: 'Something went wrong. Please try again',
      status: false,
    };
  }
};



