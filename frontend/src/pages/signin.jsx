import { SignIn } from "@clerk/clerk-react"

const SignInPage = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <SignIn path="/sign-in" signUpUrl="/sign-up" forceRedirectUrl={"/"} />
        </div>
    )
}

export default SignInPage