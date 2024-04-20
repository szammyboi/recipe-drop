import { getAllUUIDs } from '@/app/actions/fetch-uuids';
import { getRecipeDetails } from '@/app/actions/fetch-recipe';

const RecipeDetailsPage = ({ recipe }) => {
  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
    </div>
  );
};

export async function getStaticPaths() {
  // Fetch all UUIDs
  const uuids = await getAllUUIDs();

  // Convert UUIDs to paths
  const paths = uuids.map((uuid) => ({
    params: { uuid },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { uuid } = params;

  // Fetch recipe details based on the UUID
  const recipe = await getRecipeDetails(uuid);

  return {
    props: {
      recipe,
    },
  };
}

export default RecipeDetailsPage;