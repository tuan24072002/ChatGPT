import CardHome from "../components/CardHome"
import FormChat from "../components/FormChat"

const Home = () => {
    return (
        <>
            <div className="h-full w-full flex-1 flex flex-col gap-8 items-center justify-center relative">
                <img src="/ChatGPT_logo.svg" alt="Logo" className="size-12" />
                <div className="grid xl:grid-cols-4 grid-cols-2 gap-4 justify-around items-center">
                    <CardHome img={"/CardHome1.svg"} content={"Tạo một bức tranh theo phong cách Phục hưng"} />
                    <CardHome img={"/CardHome2.svg"} content={"Tạo biểu đồ dựa trên dữ liệu của tôi"} />
                    <CardHome img={"/CardHome3.svg"} content={"Tóm tắt một tài liệu dài"} />
                    <CardHome img={"/CardHome4.svg"} content={"Lên kế hoạch ngày xả hơi"} />
                </div>
                <FormChat />
            </div>
        </>
    )
}

export default Home