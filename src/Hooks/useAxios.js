import axios from "axios";
import { useEffect } from "react";
import { api } from "../api"; // আপনার কাস্টম axios instance
import { useAuth } from "./useAuth";

const useAxios = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    // ১. Request Interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // ২. Response Interceptor
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = auth?.refreshToken;

            // টোকেন রিফ্রেশ কল
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken },
            );

            const { token } = response.data;

            // ৩. স্টেট আপডেট করা জরুরি যাতে পরবর্তী রিকোয়েস্টগুলো সঠিক টোকেন পায়
            setAuth({ ...auth, authToken: token });

            // নতুন টোকেন দিয়ে অরিজিনাল রিকোয়েস্ট পুনরায় পাঠানো
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          } catch (err) {
            // রিফ্রেশ টোকেন ফেইল করলে ইউজারকে লগআউট করানো উচিত
            // setAuth({});
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      },
    );

    // ৪. Cleanup Function: ইন্টারসেপ্টর রিমুভ করা
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth.authToken]); // Dependency list এ এগুলো থাকা প্রয়োজন

  return { api };
};

export default useAxios;
