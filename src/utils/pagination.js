/**
 * Parse page and limit from query. Defaults: page=1, limit=20.
 * Returns { page, limit, skip } for MongoDB.
 */
function getPagination(query) {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 20));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

function paginatedResponse(data, total, page, limit) {
  const totalPages = Math.ceil(total / limit) || 1;
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}

module.exports = { getPagination, paginatedResponse };
