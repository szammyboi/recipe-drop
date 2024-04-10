// based on code from https://github.com/nhost/nhost

import { RECIPE_PAGE_URL } from '@/routes'
import { getAuthClient } from '@/utils/nhost'
import { redirect } from 'next/navigation'

const withAuthAsyncReverse = (Component) =>
  async (props) => {
    const nhost = await getAuthClient()
    const session = nhost.auth.getSession()

    if (session) {
      redirect(RECIPE_PAGE_URL)
    }

    return <Component {...props} />
  }

export default withAuthAsyncReverse;