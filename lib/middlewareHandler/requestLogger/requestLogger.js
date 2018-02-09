const requestLogger = (drawer, req, res, next) => {
  const { logger } = drawer
  logger.info(`${req.method} ${req.get('host')}${req.originalUrl}`)
  if (req.body) {
    logger.info(`${JSON.stringify(req.body)}`)
  }
  next()
}

module.exports = requestLogger
