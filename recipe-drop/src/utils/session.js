import { getAuthClient } from '@/utils/nhost'

const getAuthAsync = async () => {
    const nhost = await getAuthClient()
    const session = nhost.auth.getSession()

    return session;
  }

export default getAuthAsync;