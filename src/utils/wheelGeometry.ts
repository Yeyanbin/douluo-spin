export function normalizeDegrees(value: number) {
  return ((value % 360) + 360) % 360
}

export function targetRotationForSegment(
  weights: readonly number[],
  selectedIndex: number,
  segmentPosition: number,
  pointerAngle = 90,
) {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
  if (selectedIndex < 0 || selectedIndex >= weights.length || totalWeight <= 0) return 0

  const previousWeight = weights.slice(0, selectedIndex).reduce((sum, weight) => sum + weight, 0)
  const selectedWeight = weights[selectedIndex] ?? 0
  const position = Math.min(1, Math.max(0, segmentPosition))
  const contentAngle = -90 + ((previousWeight + selectedWeight * position) / totalWeight) * 360
  return normalizeDegrees(pointerAngle - contentAngle)
}

export function advanceWheelRotation(currentRotation: number, targetRotation: number, fullTurns: number) {
  const normalized = normalizeDegrees(currentRotation)
  const turns = Math.max(1, Math.floor(fullTurns))
  return currentRotation + turns * 360 + normalizeDegrees(targetRotation - normalized)
}
