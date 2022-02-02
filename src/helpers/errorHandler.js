export const errorMiddleware = (err, _req, res, _next) => {
  console.log(err);
  const status = err.status || 500;
  const message = err.message || 'Server Error';
  const error = err.error || message;

  return res.status(status).json({ success: false, message, error });
};

export class ErrorHandler extends Error {
  constructor(status, message, error = message) {
    super();
    this.status = status;
    this.message = message;
    this.error =
      error instanceof TypeError
        ? {
            columnNumber: error.columnNumber,
            fileName: error.fileName,
            lineNumber: error.lineNumber,
            message: error.message,
            name: error.name,
            stack: error.stack,
          }
        : error;
  }
}
