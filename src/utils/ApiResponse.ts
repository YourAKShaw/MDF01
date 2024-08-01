export default class ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: unknown;
  errors: unknown;

  constructor({
    statusCode,
    success,
    message,
    data,
    errors,
  }: {
    statusCode: number;
    success: boolean;
    message: string;
    data: unknown;
    errors: unknown;
  }) {
    this.statusCode = statusCode || 500;
    this.success = success || false;
    this.message = message || "";
    this.data = data || null;
    this.errors = errors || [];
  }
}
