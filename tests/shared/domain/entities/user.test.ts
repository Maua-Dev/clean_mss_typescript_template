import { User } from '../../../../src/shared/domain/entities/user'
import { STATE } from '../../../../src/shared/domain/enums/state_enum'
import { EntityError } from '../../../../src/shared/helpers/errors/domain_errors'

describe('[User Entity Tests]', () => {
  it('Assert User Entity is correct at all', () => {
    const user = new User({
      id: 0,
      name: 'Rodrigo Siqueira',
      email: 'rodrigo.dsiqueira1@gmail.com',
      state: STATE.PENDING
    })

    expect(user).toBeInstanceOf(User)
  })

  it('Assert User Entity has an error when name is invalid', () => {
    expect(() => {
      new User({
        id: 0,
        name: '',
        email: 'rodrigo.dsiqueira1@gmail.com',
        state: STATE.PENDING
      })
    }).toThrowError(EntityError)
    expect(() => {
      new User({
        id: 0,
        name: '',
        email: 'rodrigo.dsiqueira1@gmail.com',
        state: STATE.PENDING
      })
    }).toThrowError('Field props.name is not valid')
  })
  it('Assert User Entity has an error when email is invalid', () => {
    expect(() => {
      new User({
        id: 0,
        name: 'Rodrigo Diana Siqueira',
        email: 'rodrigo.dsiqueira1',
        state: STATE.PENDING
      })
    }).toThrowError(EntityError)
    expect(() => {
      new User({
        id: 0,
        name: 'Rodrigo Diana Siqueira',
        email: 'rodrigo.dsiqueira1',
        state: STATE.PENDING
      })
    }).toThrowError('Field props.email is not valid')
  })
  it('Assert User Entity does not has errors with state not passed', () => {
    const user = new User({
      id: 0,
      name: 'Rodrigo Diana Siqueira',
      email: 'rodrigo.dsiqueira1@gmail.com'
    })

    expect(user.state).toBe(STATE.PENDING)
  })
})