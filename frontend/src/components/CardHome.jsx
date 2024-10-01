const CardHome = ({ img, content }) => {
    return (
        <div className="w-[160px] h-[123.5px] border border-slate-300 shadow-lg cursor-pointer rounded-lg flex flex-col items-start">
            <img src={img} alt="CardHome" className="size-6 mt-2 ml-2" />
            <p className="text-slate-600 mt-2 ml-2">{content}</p>
        </div>
    )
}

export default CardHome