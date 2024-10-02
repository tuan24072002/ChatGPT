import { SignUp } from "@clerk/clerk-react"

const SignUpPage = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <SignUp path="/sign-up" signInUrl="/sign-in" forceRedirectUrl={"/"} />
        </div>
    )
}

export default SignUpPage