import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'Domains/users/models/user'
import Logger from '@ioc:Adonis/Core/Logger'
import Env from '@ioc:Adonis/Core/Env'

export default class SocialAuthentication {
  public async redirect({ ally }: HttpContextContract) {
    return ally
      .use('google')
      .redirect()
  }

  public async callback({ ally, auth, response, request }: HttpContextContract) {
    const driver = ally.use('google')

    if (driver.accessDenied()) {
      return 'Access was denied'
    }

    if (driver.stateMisMatch()) {
      return 'Request expired. Retry again'
    }

    if (driver.hasError()) {
      return driver.getError()
    }

    const driverUser = await driver.user()

    if (!driverUser.email) {
      return response.badRequest('Your account must have a verified email address in order to login')
    }

    const user = await User.firstOrCreate(
      { email: driverUser.email },
      {
        username: driverUser.name,
        accessToken: driverUser.token.token,
        isVerified: driverUser.emailVerificationState === 'verified',
        avatarUrl: driverUser.avatarUrl,
      }
    )

    const opaqueTokenContract = await auth.use('api').login(user, {
      expiresIn: '1day',
    })

    Logger.info("REFERER: ", request.header('referer'))

    response.cookie('token', opaqueTokenContract.token, {
      httpOnly: true,
      secure: true
    })


    response.redirect().toPath(Env.get('FRONTEND_URL'))
  }

}
