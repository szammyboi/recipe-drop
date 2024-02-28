// based on code from https://github.com/nhost/nhost

import { SIGN_IN_URL } from '@/routes'
import { getAuthClient } from '@/utils/nhost'
import { redirect } from 'next/navigation'

const withAuthAsync = (Component) =>
  async (props) => {
    const nhost = await getAuthClient()
    const session = nhost.auth.getSession()

    if (!session) {
      redirect(SIGN_IN_URL)
    }

    return <Component {...props} />
  }

export default withAuthAsync;