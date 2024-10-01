import MobileSidebar from "@/components/MobileSidebar"
import DesktopSidebar from "@/components/DesktopSidebar"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import { useAppContext } from "./context/UseContextCustom"
import { Sidebar } from "lucide-react"
import Chat from "./pages/chat"
function App() {
  const { setOpenSidebar } = useAppContext()
  return (
    <>
      <div className="h-screen w-full flex items-start bg-slate-100 relative">
        <Sidebar size={24} className={`cursor-pointer absolute right-4 top-4 hidden md:block transition-all duration-500 transform z-10`} onClick={() => setOpenSidebar(prev => !prev)} />
        <div className={`h-full w-full flex`}>
          <DesktopSidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
          </Routes>
        </div>
      </div>
      <MobileSidebar />

    </>
  )
}

export default App