const withError = (code, defaultMessage) => (msg = defaultMessage) => {
  throw Object.assign(new Error(), {
    code,
    message: msg,
  });
};

export const throwHttpNotFound = withError(404, 'Resource not found');
export const throwHttpBadRequest = withError(500, 'Bad Request');
