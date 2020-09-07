const winston = require('winston')
const LokiTransport = require('browser-winston-loki')
const logger = winston.createLogger()

logger.add(new winston.transports.Console({
  format: winston.format.json(),
  level: 'debug'
}))

logger.add(new LokiTransport({
  host: 'http://127.0.0.1',
  json: true,
  labels: { job: 'winston-loki-example' }
}))

const wait = (duration) => new Promise(resolve => {
  setTimeout(resolve, duration)
})

const run = async () => {
  while (true) {
    logger.debug('I am a debug log')
    logger.info('This is a test, no need to panic')
    logger.error('Testing for errors')
    await wait(3000)
  }
}

run()
