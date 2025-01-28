function sendSuccess(res, statusCode, data = {}, message) {
  res.status(statusCode).json({
    status: true,
    message: message,
    data: data,
  });
}

function sendError(res, statusCode, message) {
  res.status(statusCode).json({
    status: false,
    message: message,
  });
}

function sendServerError(res, error) {
  res.status(500).json({
    status: false,
    message: error.message,
  });
}

export { sendSuccess, sendError, sendServerError };
