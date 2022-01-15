import { run } from '../../src/utils'

describe('run', () => {
  it('should run the pwd command and return the current working directory', async () => {
    expect((await run('pwd')).trim()).toEqual(process.cwd())
  })
})
