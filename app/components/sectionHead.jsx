function SectionHead({chip, h2, p}) {
    return (
        <div>
            
            <div className="flex flex-col justify-center items-center mb-4 gap-2.5">
                <span className="text-xs font-semibold rounded-md  border-black border-2  px-3 py-2 ">{chip}</span>
            <h2 className="text-[38px] font-bold font-raleway mb-2">{h2}</h2>
            <p className="text-lg leading-normal text-neutral text-center">{p}</p>
            </div>
        </div>
    )
}

export default SectionHead
