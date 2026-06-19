export type Mat4 = Float32Array

export function createMat4(): Mat4 {
  const m = new Float32Array(16)
  m[0] = m[5] = m[10] = m[15] = 1
  return m
}

export function perspective(fov: number, aspect: number, near: number, far: number): Mat4 {
  const m = new Float32Array(16)
  const f = 1 / Math.tan(fov / 2)
  const rangeInv = 1 / (near - far)

  m[0] = f / aspect
  m[5] = f
  m[10] = far * rangeInv
  m[11] = -1
  m[14] = near * far * rangeInv
  return m
}

export function lookAt(eye: number[], target: number[], up: number[]): Mat4 {
  const zx = eye[0] - target[0]
  const zy = eye[1] - target[1]
  const zz = eye[2] - target[2]
  const zLen = Math.sqrt(zx * zx + zy * zy + zz * zz)
  const z0 = zx / zLen, z1 = zy / zLen, z2 = zz / zLen

  const xx = up[1] * z2 - up[2] * z1
  const xy = up[2] * z0 - up[0] * z2
  const xz = up[0] * z1 - up[1] * z0
  const xLen = Math.sqrt(xx * xx + xy * xy + xz * xz)
  const x0 = xx / xLen, x1 = xy / xLen, x2 = xz / xLen

  const y0 = z1 * x2 - z2 * x1
  const y1 = z2 * x0 - z0 * x2
  const y2 = z0 * x1 - z1 * x0

  const m = new Float32Array(16)
  m[0] = x0; m[1] = y0; m[2] = z0;
  m[4] = x1; m[5] = y1; m[6] = z1;
  m[8] = x2; m[9] = y2; m[10] = z2;
  m[12] = -(x0 * eye[0] + x1 * eye[1] + x2 * eye[2])
  m[13] = -(y0 * eye[0] + y1 * eye[1] + y2 * eye[2])
  m[14] = -(z0 * eye[0] + z1 * eye[1] + z2 * eye[2])
  m[15] = 1
  return m
}

export function multiply(a: Mat4, b: Mat4): Mat4 {
  const m = new Float32Array(16)
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      m[j * 4 + i] =
        a[i] * b[j * 4] +
        a[4 + i] * b[j * 4 + 1] +
        a[8 + i] * b[j * 4 + 2] +
        a[12 + i] * b[j * 4 + 3]
    }
  }
  return m
}
