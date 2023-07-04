export default async (ctx: any, next: any) => {
  const language = ctx.request.header?.language || 'cn'

  ctx.res.$success = (data: any, code = '00000') => {
    const _data = {
      code
    }
    ctx.body = _data
  }

  ctx.res.$error = (err: any, code = 'T00001') => {
    ctx.body = {
      code,
      msg: ''
    }
  }

  await next()
}
