function Stats(props) {
  return (
    <div className="stats">
      <h1>{props.name}:</h1>
      <h1>{props.value}</h1>
    </div>
  );
}

function StatsPart(props) {
  const StatsData = props.stats;
  const localActive = props.localActive;
  return (
    <div className="pb-4 md:pt-4">
      <div className="flex text-lg flex-col pt-2 gap-1  w-full h-fit">
        <div className="w-full m-[0px,auto]  justify-start">
          <div className="itemspec">
            <h1 className="p-2 pl-3 pb-1">{props.specs}</h1>
            <div className="flex gap-1 flex-col w-full h-fit p-3 pt-0">
              {StatsData ? (
                StatsData.map((stat, index) => (
                  <Stats
                    name={stat.name[localActive] || ""}
                    value={stat.value}
                    key={index}
                  />
                ))
              ) : (
                <>
                  <div className="Card-name  relative pt-[25px] w-[100%] mt-2 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
                  <div className="Card-name  relative pt-[25px] w-[100%] mt-2 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
                  <div className="Card-name  relative pt-[25px] w-[100%] mt-2 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
                  <div className="Card-name  relative pt-[25px] w-[100%] mt-2 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
                  <div className="Card-name  relative pt-[25px] w-[100%] mt-2 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
                  <div className="Card-name  relative pt-[25px] w-[100%] mt-2 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
                  <div className="Card-name  relative pt-[25px] w-[100%] mt-2 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
                  <div className="Card-name  relative pt-[25px] w-[100%] mt-2 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StatsPart;
