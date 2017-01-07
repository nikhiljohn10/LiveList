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
    link: {
      type: 'string',
      defaultTo: "#"
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
