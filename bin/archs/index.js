const archs = {}

const preBuilds = {
  'psql-api': require('./psql-api'),
}

archs.build = (archId) => {
  if (archId in preBuilds)
    return preBuilds[archId]()
  throw new Error(`Skeleton architecture ${archId} does not exists`)
}

module.exports = archs
