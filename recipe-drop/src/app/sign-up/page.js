import SignUpForm from "@/components/sign-up";
import withAuthAsyncReverse from "@/utils/reverseguard";
import "@/app/globals.css";

const SignUp = () => {

    return (
        <div className="bg-recipe-tan h-screen w-screen">
            <SignUpForm />
        </div>
    )
};

export default withAuthAsyncReverse(SignUp);