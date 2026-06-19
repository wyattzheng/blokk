// 一个方块 = 6 个面 = 12 个三角形 = 36 个顶点
// 每个顶点: position(3) + color(3) = 6 floats

const T = 0.55 // top face brightness
const S = 0.40 // side face brightness
const B = 0.30 // bottom face brightness

// prettier-ignore
export const CUBE_VERTICES = new Float32Array([
  // Front face (z+)
  0, 0, 1,  S, S, S,
  1, 0, 1,  S, S, S,
  1, 1, 1,  S, S, S,
  0, 0, 1,  S, S, S,
  1, 1, 1,  S, S, S,
  0, 1, 1,  S, S, S,

  // Back face (z-)
  1, 0, 0,  S, S, S,
  0, 0, 0,  S, S, S,
  0, 1, 0,  S, S, S,
  1, 0, 0,  S, S, S,
  0, 1, 0,  S, S, S,
  1, 1, 0,  S, S, S,

  // Top face (y+)
  0, 1, 0,  T, T, T,
  0, 1, 1,  T, T, T,
  1, 1, 1,  T, T, T,
  0, 1, 0,  T, T, T,
  1, 1, 1,  T, T, T,
  1, 1, 0,  T, T, T,

  // Bottom face (y-)
  0, 0, 0,  B, B, B,
  1, 0, 0,  B, B, B,
  1, 0, 1,  B, B, B,
  0, 0, 0,  B, B, B,
  1, 0, 1,  B, B, B,
  0, 0, 1,  B, B, B,

  // Right face (x+)
  1, 0, 1,  S, S, S,
  1, 0, 0,  S, S, S,
  1, 1, 0,  S, S, S,
  1, 0, 1,  S, S, S,
  1, 1, 0,  S, S, S,
  1, 1, 1,  S, S, S,

  // Left face (x-)
  0, 0, 0,  S, S, S,
  0, 0, 1,  S, S, S,
  0, 1, 1,  S, S, S,
  0, 0, 0,  S, S, S,
  0, 1, 1,  S, S, S,
  0, 1, 0,  S, S, S,
])

export const CUBE_VERTEX_COUNT = 36
export const CUBE_STRIDE = 6 * 4 // 6 floats * 4 bytes
