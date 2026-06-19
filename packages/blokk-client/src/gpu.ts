export async function initGPU(canvas: HTMLCanvasElement) {
  const adapter = await navigator.gpu?.requestAdapter()
  if (!adapter) throw new Error('WebGPU not supported')

  const device = await adapter.requestDevice()
  const context = canvas.getContext('webgpu')!
  const format = navigator.gpu.getPreferredCanvasFormat()

  context.configure({ device, format })

  return { device, context, format }
}
