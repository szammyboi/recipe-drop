import SignInForm from "@/components/sign-in";
import withAuthAsyncReverse from "@/utils/reverseguard";
import "@/app/globals.css";

const SignIn = () => {

    return (
        <div className="bg-recipe-tan h-screen w-screen">
            <SignInForm />
        </div>
    )
};

export default withAuthAsyncReverse(SignIn);