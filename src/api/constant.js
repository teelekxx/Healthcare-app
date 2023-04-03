export const HTTP_METHODS = {
    delete: "DELETE",
    get: "GET",
    patch: "PATCH",
    post: "POST",
    put: "PUT",
  };
  
  export const STATUS_CODES = {
    ok: 200,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    tooManyRequest: 429,
    internalError: 500,
    badGateway: 502,
    unavailable: 503,
    timeout: 504,
  };
  
  export const ERROR_CODES = {
    timeout: "ECONNABORTED",
  };
  
  export const ENDPOINTS = {
    storeCredit: {
      cache: 10000,
      link: "v6/store-credits",
    },
    creditConditions: {
      cache: 60000,
      link: "v6/conditions?type=credit",
    },
    cashbackConditions: {
      cache: 60000,
      link: "v6/conditions?type=cashback",
    },
    storeCreditConditions: {
      cache: 60000,
      link: "v6/conditions?type=store_credit",
    },
    pomeloCares: {
      cache: 0,
      link: "v6/pomelo-cares",
    },
    lookbooks: {
      cache: 30000,
      link: "v6/lookbooks",
    },
    productsSearch: {
      cache: 15000,
      link: "v6/products/search",
    },
    whyPomelo: {
      cache: 60000,
      link: "v6/info/why-pomelo",
    },
    bestsellers: {
      cache: 600000,
      link: (id) => `v6/categories/${id}/bestsellers-products`,
    },
    cartRecommendation: "v6/recommendations/cart",
    creditsHistory: "v6/credits/history",
  };