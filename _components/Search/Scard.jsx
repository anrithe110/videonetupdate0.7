"use client"
function Scard(props) {
  return (
    <a href={props.link}>
      <div className="search_results_body">
      {props.img ? (
          <img
            className="search_results_img"
            src={`/images/${props.img}`}
            alt="imgs/noimage.jpg"
          />
        ) : (
          <div className="px-1 relative pt-[13%] w-[14%] rounded-xl bg-zinc-400 animate-pulse" />
        )}
        <div className="search_results_content">
          <h1>{props.name}</h1>
          <h2>{props.price} ₾</h2>
        </div>
      </div>
    </a>
  )
}
export default Scard;