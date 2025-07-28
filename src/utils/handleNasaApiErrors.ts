// Handles and throws user-friendly errors for NASA API HTTP responses.
export const handleNasaApiErrors = (res: Response) => {
  if (res.ok) return;

  switch (res.status) {
    case 401:
    case 403:
      throw new Error(
        'Authentication failed, there may be an issue with our credentials. Please contact support.'
      );

    case 429:
      throw new Error(
        "NASA's API is currently rate-limited. Please try again in a few minutes."
      );

    case 500:
    case 502:
    case 503:
    case 504:
      throw new Error(
        "NASA's servers are temporarily unavailable. Please try again later."
      );

    default:
      throw new Error(
        `Unexpected error: ${res.status} ${res.statusText}. Please contact support.`
      );
  }
};
