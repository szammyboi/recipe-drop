'use client';
import { useRouter } from "next/navigation";


// Get the details for the selected recipe. 
export const getUUID = async () => {
    const router = useRouter();
    const { uuid } = router.query;

    return uuid;
}