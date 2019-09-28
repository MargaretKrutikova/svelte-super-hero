export const buildObserverThresholdList = steps => {
  const list = Array.from(new Array(steps).keys()).map(val => val / steps)

  return [...list, 1]
}
