import { run } from '../../src/utils'

describe('run', () => {
  it('should run a command on the command-line and return a string', async () => {
    expect(await run('echo "hello world"')).toEqual('hello world')
  })
})
