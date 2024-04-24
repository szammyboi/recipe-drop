
import withAuthAsyncReverse from "@/utils/reverseguard";
import getAuthAsync from "@/utils/session";
import SignInRedirectButton from '@/components/sign-in-redirect';

// Import global styles
import "@/app/globals.css";

// Define a more structured and visually appealing login screen
const Home = () => {
  return (
    <div className="bg-recipe-tan h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-recipe-orange">RECIPE DROP</h1>
        <h2 className="text-2xl font-bold text-recipe-orange mt-4">The Next Up Recipe Book</h2>
        <p className="mt-2 text-recipe-orange text-lg">Discover new flavors and share your creations!</p>
      </div>
      <SignInRedirectButton className="mt-10" />
    </div>
  );
}

// Wrap the component with authentication reverse guard
export default withAuthAsyncReverse(Home);