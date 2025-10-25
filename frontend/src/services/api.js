import axios from "axios";
import toast from "react-hot-toast";

class ApiClient {
  constructor() {
    this.baseURL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
    this.isRefreshing = false;
    this.failedQueue = [];

    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        config.headers = config.headers || {};
        config.headers["X-Request-ID"] = this.generateRequestId();
        config.headers["X-Timestamp"] = new Date().toISOString();

        if (!config.metadata) {
          config.metadata = { retryCount: 0 };
        }

        console.log(`🚀 Making request to: ${config.baseURL}${config.url}`);
        return config;
      },
      (error) => {
        console.error("❌ Request interceptor error:", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(
          `✅ Response received: ${response.status} ${response.config.url}`
        );
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        console.log(
          `❌ Response error: ${error.response?.status} ${originalRequest?.url}`
        );

        if (error.response?.status === 401 && !originalRequest._retry) {
          return this.handleTokenRefresh(originalRequest);
        }

        this.handleApiError(error);
        return Promise.reject(error);
      }
    );
  }

  async handleTokenRefresh(originalRequest) {
    if (!originalRequest.metadata) {
      originalRequest.metadata = { retryCount: 0 };
    }

    if (originalRequest.metadata.retryCount >= 2) {
      console.error("🚫 Max retry attempts exceeded for token refresh");
      this.handleAuthError();
      return Promise.reject(new Error("Max retry attempts exceeded"));
    }

    originalRequest._retry = true;
    originalRequest.metadata.retryCount += 1;

    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.failedQueue.push({
          resolve: () => {
            resolve(this.client(originalRequest));
          },
          reject,
        });
      });
    }

    this.isRefreshing = true;
    console.log(
      `🔄 Refreshing token... (Attempt ${originalRequest.metadata.retryCount}/2)`
    );

    try {
      const refreshResponse = await this.client.post("/all/refresh");

      console.log("✅ Token refreshed successfully");
      this.processQueue(null);

      return this.client(originalRequest);
    } catch (refreshError) {
      console.error("❌ Token refresh failed:", refreshError);
      this.processQueue(refreshError);

      if (originalRequest.metadata.retryCount >= 2) {
        this.handleAuthError();
        return Promise.reject(refreshError);
      }

      return Promise.reject(refreshError);
    } finally {
      this.isRefreshing = false;
    }
  }

  processQueue(error) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(null);
      }
    });

    this.failedQueue = [];
  }

  generateRequestId() {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  handleAuthError() {
    console.log("🚪 Redirecting to login due to authentication failure");

    this.failedQueue.forEach(({ reject }) => {
      reject(new Error("Authentication failed"));
    });
    this.failedQueue = [];
    this.isRefreshing = false;

    toast.error("Session expired. Please login again.");

    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }

  handleApiError(error) {
    if (error.response?.status === 401) {
      return;
    }

    console.error("🔥 API Error:", {
      status: error.response?.status,
      message: error.response?.data?.message,
      url: error.config?.url,
    });

    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          toast.error(data?.message || "Bad Request");
          break;
        case 403:
          toast.error("Access forbidden");
          break;
        case 404:
          toast.error("Resource not found");
          break;
        case 422:
          if (data?.errors) {
            Object.values(data.errors)
              .flat()
              .forEach((err) => {
                toast.error(err);
              });
          } else {
            toast.error(data?.message || "Validation error");
          }
          break;
        case 429:
          toast.error("Too many requests. Please try again later.");
          break;
        case 500:
          toast.error("Internal server error");
          break;
        default:
          toast.error(data?.message || "An error occurred");
      }
    } else if (error.request) {
      console.error("Network error details:", error.request);
      toast.error("Network error. Please check your connection.");
    } else {
      console.error("Request setup error:", error.message);
      toast.error("An unexpected error occurred");
    }
  }

  // HTTP Methods with better error logging
  async get(url, config) {
    try {
      return await this.client.get(url, config);
    } catch (error) {
      console.error(`GET ${url} failed:`, error);
      throw error;
    }
  }

  async post(url, data, config) {
    try {
      return await this.client.post(url, data, config);
    } catch (error) {
      console.error(`POST ${url} failed:`, error);
      throw error;
    }
  }

  async put(url, data, config) {
    try {
      return await this.client.put(url, data, config);
    } catch (error) {
      console.error(`PUT ${url} failed:`, error);
      throw error;
    }
  }

  async patch(url, data, config) {
    try {
      return await this.client.patch(url, data, config);
    } catch (error) {
      console.error(`PATCH ${url} failed:`, error);
      throw error;
    }
  }

  async delete(url, config) {
    try {
      return await this.client.delete(url, config);
    } catch (error) {
      console.error(`DELETE ${url} failed:`, error);
      throw error;
    }
  }

  // File upload
  async upload(url, file, expenseGroupdId = "", onProgress) {
    const formData = new FormData();
    formData.append("file", file);
    if (expenseGroupdId.length > 0) {
      formData.append("groupId", expenseGroupdId);
    }
    return this.client.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    });
  }

  // Download file
  async download(url, filename) {
    const response = await this.client.get(url, {
      responseType: "blob",
    });

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filename || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  }

  // Cancel request
  createCancelToken() {
    return axios.CancelToken.source();
  }

  // Set base URL
  setBaseURL(baseURL) {
    this.client.defaults.baseURL = baseURL;
  }

  // Get instance for custom usage
  getInstance() {
    return this.client;
  }

  // Test connection method
  async testConnection() {
    try {
      console.log(`🔍 Testing connection to: ${this.baseURL}`);
      const response = await this.client.get("/health", { timeout: 5000 });
      console.log("✅ Connection test successful");
      return true;
    } catch (error) {
      console.error("❌ Connection test failed:", error);
      return false;
    }
  }
}

export const apiClient = new ApiClient();
