module.exports = {
  attributes: {
    username: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      unique: true
    },
    isAdmin: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    }
  }
};
