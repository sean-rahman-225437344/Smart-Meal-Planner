export default function errorHandler(err, req, res, next) {
  console.error("Error:", err);
  const status =
    err.code && err.code.startsWith("AUTH") ? 401 : err.status || 500;
  res.status(status).json({
    code: err.code || "SERVER_ERROR",
    message: err.message || "Something went wrong",
    details: err.details || null,
  });
}
