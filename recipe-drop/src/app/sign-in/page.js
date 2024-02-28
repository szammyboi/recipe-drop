import SignInForm from "@/components/sign-in";
import withAuthAsyncReverse from "@/utils/reverseguard";
import "@/app/globals.css";
import Link from "next/link";

const SignIn = () => {

    return (
        <div className="bg-recipe-tan h-screen w-screen">
            <SignInForm />
            <h3 className="text-recipe-orange">don't have an account? <Link href="/sign-up" className="underline">sign up now</Link></h3>
        </div>
    )
};

export default withAuthAsyncReverse(SignIn);