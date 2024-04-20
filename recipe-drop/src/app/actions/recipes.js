'use server';

import { getAuthClient } from "@/utils/nhost";

const createRecipeQuery = `
    mutation($title: String!, $details:jsonb!, $image: uuid!) {
        insert_recipes_one(object: {title: $title, details: $details, image: $image}) {
            id
        }
    }
`;

const deleteRecipe = `
    mutation($id: uuid!) {
        delete_recipes_by_pk(id: $id) {
            id
        }
    }
`

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

const updateRecipe = `
    mutation($id: uuid!, $title: String!, $details:jsonb!, $image: uuid!) {
        update_recipes_by_pk(pk_columns: {id: $id}, _set: {title: $title, details: $details, image: $image}) {
            id
        }
    }
`;

const updateRecipeTitle = `
    mutation($id: uuid!, $title: String!) {
        update_recipes_by_pk(pk_columns: {id: $id}, _set: {title: $title}) {
            id
        }
    }
`;

const updateRecipeDetails = `
    mutation($id: uuid!, $details:jsonb!) {
        update_recipes_by_pk(pk_columns: {id: $id}, _set: {details: $details}) {
            id
        }
    }
`;

const updateRecipeImage = `
    mutation($id: uuid!, $image: uuid!) {
        update_recipes_by_pk(pk_columns: {id: $id}, _set: {image: $image}) {
            id
        }
    }
`;

export const GetRecipe = async (id) => {
    const nhost = await getAuthClient();

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

export const GetRecipes = async () => {
    const nhost = await getAuthClient();

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

export const NewRecipe = async (title, details, image) => {
    const nhost = await getAuthClient();

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

export const DeleteRecipe = async (id) => {
    const nhost = await getAuthClient();

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

export const EditRecipe = async (id, title, details, image) => {
    const nhost = await getAuthClient();

    const { recipe } = await GetRecipe(id);

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

export const EditRecipeTitle = async (id, title) => {
    const nhost = await getAuthClient();

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

export const EditRecipeDetails = async (id, details) => {
    const nhost = await getAuthClient();

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

export const EditRecipeImage = async (id, image) => {
    const nhost = await getAuthClient();

    let payload = {id: id, image: image};
    const {data, error} = await nhost.graphql.request(updateRecipeImage, payload);

    if (error) {
        return {
            id: null,
            error: error.message
        }
    }

    const { recipe } = await GetRecipe(id);

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