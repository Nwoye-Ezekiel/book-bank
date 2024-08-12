import axios, { AxiosRequestConfig } from 'axios';

const baseURL = process.env.REACT_APP_API_BASEURL;

class ExtendedError extends Error {
  status: number | null;

  constructor({ message, status }: { message: string; status: number | null }) {
    super(message);
    this.status = status;
  }
}

async function makeApiCall<T = any>(
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

    // throw browser error if server error is not available
    throw new ExtendedError({
      message: error.message,
      status: null,
    });
  }
}

export default makeApiCall;
