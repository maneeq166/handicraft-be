// utils/apiResponse.js
class ApiResponse {
  constructor(statusCode, data = null, message = "") {
    this.statusCode = Number(statusCode) || 500;
    this.data = data;
    // preserve passed message; if not provided set default based on status
    this.message =
      typeof message === "string" && message.length > 0
        ? message
        : this.statusCode >= 200 && this.statusCode < 300
        ? "success"
        : "error";
    this.success = this.statusCode >= 200 && this.statusCode < 400;
  }
}

module.exports = ApiResponse;
