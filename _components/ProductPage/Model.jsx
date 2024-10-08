import React from "react";

function Model(props) {
  return (
    <div className={`${props.className}  mt-4 itemspec  w-full h-fit items-center`}>
      <div className="main w-full m-[0px,auto] max-w-3xl">
        <div className="flex  justify-between">
        {props.modelvalue ? (
            <>
         <h1>{props.model}</h1>
          <h1>{props.modelvalue}</h1>
            </>
          ) : (
            <div className="Card-name  relative pt-[25px] w-[100%] mt-2 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
          )}
      
        </div>
        <div className="flex justify-between">
          {props.brandvalue ? (
            <>
              <h1>{props.brand}</h1>
              <h1>{props.brandvalue}</h1>
            </>
          ) : (
            <div className="Card-name  relative pt-[25px] w-[100%] mt-2 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
}
export default Model;
