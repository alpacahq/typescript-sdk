// Template used to generate the API client,
// see: https://docs.alpaca.markets/reference
export default {
  v2: {
    account: {
      get: () => ({
        method: "GET",
        url: "/v2/account",
      }),
    },
  },
};
