import { getAuthClient } from "@/utils/nhost";

export const getRecipeDetails = async (uuid) => {
    // Make a server-side request to fetch recipe details based on the UUID
    const auth = await getAuthClient();
    const response = await auth.graphql.request(`
    {
        recipes(where: {id: {_eq: "${uuid}"}}){ 
            id,
            title,
            steps,
            ingredients
        }   
    }
    `); 
    const data = await response.json();
    console.log("Data: ", data);
    return data;
  };