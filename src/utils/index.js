const withError = (code, defaultMessage) => (msg = defaultMessage) => {
  throw Object.assign(new Error(), {
    code,
    message: msg,
  });
};

export const withErrorHandling = fn => async (req, res) => {
  try {
    await fn(req, res);
  } catch (e) {
    const { code, message } = e;

    res.status(code).json({
      code,
      message,
    });
  }
};

export const throwHttpNotFound = withError(404, 'Resource not found');
export const throwHttpBadRequest = withError(500, 'Bad Request');
