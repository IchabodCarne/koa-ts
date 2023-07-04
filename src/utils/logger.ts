import log4js from 'log4js'

log4js.configure({
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'colored'
      }
    },
    app: {
      type: 'dateFile',
      filename: 'logs/log.log',
      pattern: 'yyyy-MM-dd',
      compress: true,
      numBackups: 5
    }
  },
  categories: {
    default: {
      appenders: ['out', 'app'],
      level: 'debug'
    },
    log: {
      appenders: ['app', 'out'],
      level: 'info'
    }
  }
})

export default log4js
