
import withAuthAsyncReverse from "@/utils/reverseguard";
import getAuthAsync from "@/utils/session";
import SignInRedirectButton from '@/components/sign-in-redirect';

import "@/app/globals.css";

const Home = async () => {
  return (
    <div className="bg-recipe-tan h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-recipe-orange ml-1 pb-5">RECIPE DROP</h1>
      <h2 className="text-2xl font-normal text-recipe-orange ml-2 ">the next up recipe book</h2>
      <SignInRedirectButton/>
    </div>
  );
}

export default withAuthAsyncReverse(Home);