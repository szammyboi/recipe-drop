import { NhostClient } from "@nhost/react";

const ClientSideNhost = new NhostClient({
    subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || 'local',
    region: process.env.NEXT_PUBLIC_NHOST_REGION
})

export default ClientSideNhost;