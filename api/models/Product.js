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
    ff: {
      type: 'boolean',
      defaultTo: "false"
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
