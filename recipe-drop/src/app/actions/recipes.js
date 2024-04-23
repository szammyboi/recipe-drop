'use server';

import { getAuthClient } from "@/utils/nhost";

// GraphQL command structure for creating new recipes. 
const createRecipeQuery = `
    mutation($title: String!, $details:jsonb!, $image: uuid!) {
        insert_recipes_one(object: {title: $title, details: $details, image: $image}) {
            id
        }
    }
`;

// GraphQL command structure for deleting a recipe. 
const deleteRecipe = `
    mutation($id: uuid!) {
        delete_recipes_by_pk(id: $id) {
            id
        }
    }
`
// GraphQL command structure for getting recipes. 
const getRecipes = `
  query {
    recipes {
      id,
      title,
      details,
      image
    }
  }
`;

// GraphQL command structure for getting a specific recipe. 
const getRecipe = `
  query($id: uuid!) {
    recipes(where: {id: {_eq: $id}}) {
        id,
        title,
        details,
        image
    }
  }
`;

// GraphQL command for modifying a recipe. 
const updateRecipe = `
    mutation($id: uuid!, $title: String!, $details:jsonb!, $image: uuid!) {
        update_recipes_by_pk(pk_columns: {id: $id}, _set: {title: $title, details: $details, image: $image}) {
            id
        }
    }
`;

// GraphQL command for updating a recipe title. 
const updateRecipeTitle = `
    mutation($id: uuid!, $title: String!) {
        update_recipes_by_pk(pk_columns: {id: $id}, _set: {title: $title}) {
            id
        }
    }
`;

// GraphQL command for updating recipe details. 
const updateRecipeDetails = `
    mutation($id: uuid!, $details:jsonb!) {
        update_recipes_by_pk(pk_columns: {id: $id}, _set: {details: $details}) {
            id
        }
    }
`;

// GraphQL command for updating a recipe image. 
const updateRecipeImage = `
    mutation($id: uuid!, $image: uuid!) {
        update_recipes_by_pk(pk_columns: {id: $id}, _set: {image: $image}) {
            id
        }
    }
`;

// Function that retrieves information for a specific recipe. 
export const GetRecipe = async (id) => {
    const nhost = await getAuthClient();

    // Retreive information for the recipe corresponding to the specified id. 
    const payload = {id: id};
    const { data, error } = await nhost.graphql.request(getRecipe, payload);

    if (error) {
        return {
            recipe: null,
            error: error.message
        }
    }

    return {
        recipe: data.recipes[0],
        error: null
    }
};

// Function that retreives information for multiple recipes.  
export const GetRecipes = async () => {
    const nhost = await getAuthClient();

    // Retreive recipe data from server. 
    const { data, error } = await nhost.graphql.request(getRecipes);

    if (error) {
        return {
            recipe: null,
            error: error.message
        }
    }

    return {
        recipes: data.recipes,
        error: null
    }
};

// Function that creates a new recipe and adds it to the database. 
export const NewRecipe = async (title, details, image) => {
    const nhost = await getAuthClient();

    // Send the new recipe request. 
    let payload = {title: title, details: details, image: image};
    const {data, error} = await nhost.graphql.request(createRecipeQuery, payload);

    if (error) {
        return {
            id: null,
            error: error.message
        }
    }

    return {
        id: data.insert_recipes_one.id,
        error: null
    }
};

// Function that deletes a specific recipe from the database. 
export const DeleteRecipe = async (id) => {
    const nhost = await getAuthClient();
    
    // Send the update request. 
    let payload = {id: id};
    const {data, error} = await nhost.graphql.request(deleteRecipe, payload);

    if (error) {
        return {
            id: null,
            error: error.message
        }
    }

    return {
        id: data.delete_recipes_by_pk.id,
        error: null
    }
};

// Function that updates a recipe's title, details and image in the server. 
export const EditRecipe = async (id, title, details, image) => {
    const nhost = await getAuthClient();

    const { recipe } = await GetRecipe(id);

    
    // Send the update request. 
    let payload = {id: id, title: title, details: details, image: image};
    const {data, error} = await nhost.graphql.request(updateRecipe, payload);

    if (error) {
        return {
            id: null,
            error: error.message
        }
    }

    if (recipe.image && recipe.image != image) {
        const { deleteError } = await nhost.storage.delete({fileId: recipe.image});
    }

    return {
        id: data.update_recipes_by_pk.id,
        error: null
    }
};

// Function that updates a recipe's title in the database. 
export const EditRecipeTitle = async (id, title) => {
    const nhost = await getAuthClient();

    // Send the update request. 
    let payload = {id: id, title: title};
    const {data, error} = await nhost.graphql.request(updateRecipeTitle, payload);

    if (error) {
        return {
            id: null,
            error: error.message
        }
    }

    return {
        id: data.update_recipes_by_pk.id,
        error: null
    }
};

// Function that updates a recipe's details in the database. 
export const EditRecipeDetails = async (id, details) => {
    const nhost = await getAuthClient();

    
    // Send the update request. 
    let payload = {id: id, details: details};
    const {data, error} = await nhost.graphql.request(updateRecipeDetails, payload);

    if (error) {
        return {
            id: null,
            error: error.message
        }
    }

    return {
        id: data.update_recipes_by_pk.id,
        error: null
    }
};

// Function that updates a recipe's image in the database. 
export const EditRecipeImage = async (id, image) => {
    const nhost = await getAuthClient();

    // Send the update request. 
    let payload = {id: id, image: image};
    const {data, error} = await nhost.graphql.request(updateRecipeImage, payload);

    if (error) {
        return {
            id: null,
            error: error.message
        }
    }

    // Retreive the updated recipe. 
    const { recipe } = await GetRecipe(id);

    // Ensures that the updated image matches the intended image. 
    if (recipe.image && recipe.image != image) {
        const { deleteError } = await nhost.storage.delete({fileId: recipe.image});

        if (deleteError) {
            return {
                id: null,
                error: deleteError.message
            }
        }
    }

    

    return {
        id: data.update_recipes_by_pk.id,
        error: null
    }
};