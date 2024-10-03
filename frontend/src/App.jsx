import MobileSidebar from "@/components/MobileSidebar"
import DesktopSidebar from "@/components/DesktopSidebar"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import Home from "./pages/home"
import { useAppContext } from "./context/UseContextCustom"
import { Loader, LogIn, Sidebar } from "lucide-react"
import Chat from "./pages/chat"
import { ClerkLoading, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import SignInPage from "./pages/signin"
import SignUpPage from "./pages/signup"
import 'lightbox.js-react/dist/index.css'

function App() {
  const { setOpenSidebar } = useAppContext();
  const navigate = useNavigate();
  return (
    <>
      <div className="h-screen w-full flex items-start bg-slate-100 relative">
        <div className="absolute right-4 top-4 flex items-center gap-4">
          <SignedIn>
            <Sidebar size={24} className={`cursor-pointer hidden md:block z-10`} onClick={() => setOpenSidebar(prev => !prev)} />
          </SignedIn>
          <ClerkLoading>
            <Loader size={'2em'} className='spin' />
          </ClerkLoading>
          <SignedIn>
            <div className="z-10">
              <UserButton appearance={{
                theme: "dark",
                size: "large",
              }} />
            </div>
          </SignedIn>
          <SignedOut>
            <LogIn onClick={() => navigate("/sign-in")} className='cursor-pointer z-10' />
            <Navigate to="/sign-in" replace />
          </SignedOut>
        </div>
        <div className={`h-full w-full flex`}>
          <SignedIn>
            <DesktopSidebar />
          </SignedIn>
          <Routes>
            <Route path="/" element={
              <SignedIn>
                <Home />
              </SignedIn>
            } />
            <Route path="/chat/:chatId" element={
              <SignedIn>
                <Chat />
              </SignedIn>
            } />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Routes>
        </div>
      </div>
      <MobileSidebar />

    </>
  )
}

export default App