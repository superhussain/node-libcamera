import { cmd } from '../../src/utils'

describe('cmd', () => {
  it('should return a single command string', () => {
    expect(cmd('my-command', ['--flag', 'value'])).toEqual(
      'my-command --flag value'
    )
  })
})
