module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'todo-test',
      args: []
    },
    binary: {
      version: '4.0.3',
      skipMD5: true
    },
    autoStart: false
  }
};
