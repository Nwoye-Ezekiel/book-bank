import axios, { AxiosRequestConfig } from 'axios';

const baseURL = process.env.REACT_APP_API_BASEURL;

// This class extends the built-in Error class to handle both server and client errors.
// It allows you to throw a custom error message with an optional status code.
class ExtendedError extends Error {
  status: number | null;

  constructor({ message, status }: { message: string; status: number | null }) {
    super(message);
    this.status = status;
  }
}

export default async function makeApiCall<T = any>(
  url: string,
  method: AxiosRequestConfig['method'] = 'get',
  payload?: AxiosRequestConfig['data'],
  axiosRequestConfig?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>
): Promise<T> {
  try {
    if (!baseURL || typeof baseURL !== 'string') {
      throw new Error('REACT_APP_API_BASEURL is not defined');
    }

    const { data } = await axios({
      url,
      method,
      data: payload,
      baseURL,
      ...axiosRequestConfig,
    });

    return data;
  } catch (error: any) {
    if (error.response) {
      const serverErrorMessage: string = error.response?.data?.message;
      const serverErrorStatus: number = error.response?.status;

      // throw server error if it is available
      throw new ExtendedError({
        message: serverErrorMessage,
        status: serverErrorStatus,
      });
    }

    // throw client error if server error is not available
    throw new ExtendedError({
      message: error.message,
      status: null,
    });
  }
}
