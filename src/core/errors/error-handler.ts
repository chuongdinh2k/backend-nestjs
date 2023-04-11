export abstract class ErrorHandler {
  public static getErrorMessage(ex: {
    error: { message: string };
    message: string;
  }): string {
    return ex.error ? ex.error.message : ex.message;
  }
}
