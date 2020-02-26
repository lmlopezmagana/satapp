export const success = (res, status) => (entity) => {
  if (entity) {
    res.status(status || 200).json(entity)
  }
  return null
}

export const notFound = (res) => (entity) => {
  if (entity) {
    return entity
  }
  res.status(404).end()
  return null
}

export const authorOrAdmin = (res, user, userField) => (entity) => {
  if (entity) {
    const isAdmin = user.role === 'admin'
    const isAuthor = entity[userField] && entity[userField].equals(user.id)
    if (isAuthor || isAdmin) {
      return entity
    }
    res.status(401).end()
  }
  return null
}

// AdminOrTecnico

export const adminOrTecnico = (res, user) => (entity) => {
  if (entity) {
    const isAdmin = user.role === 'admin'
    // const isAuthor = entity[userField] && entity[userField].equals(user.id)
    const isTecnico = user.role === 'tecnico'
    if (isTecnico || isAdmin) {
      return entity
    }
    res.status(401).end()
  }
  return null
}