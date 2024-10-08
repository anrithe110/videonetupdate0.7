export default function Container({ children , className }) {
    return (
        <div className={`w-full h-fit items-center ${className}`}>
            <div className='flex gap-5 sm:justify-center justify-between main w-full m-[0px,auto] max-w-5xl '>
                {children}
            </div>
        </div>
    )
}