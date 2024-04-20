import { getAuthClient } from "@/utils/nhost";

export const getAllUUIDs = async () => {
    // Make a server-side request to fetch all UUIDs.
    const auth = await getAuthClient();
    const response = await auth.graphql.request(`
    {
        recipes{ 
            id
        }   
    }
    `); 
    const data = await response.json();
    
    // Extract UUIDs from the recipes
    const uuids = data.recipes.map(recipe => recipe.id);

    console.log("uuids: ", uuids);

    return uuids;
};