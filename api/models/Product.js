module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    category: {
      type: 'string',
      required: true
    },
    currentPrice: {
      type: 'integer',
      required: true
    },
    priceList: {
      collection: 'price',
      via: 'product'
    }
  }
};
