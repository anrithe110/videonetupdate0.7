import React from "react";
import Scard from "./Scard";

function SearchButton({ ShowSearchResults, setShowSearchResults }) {
  return (
    <button
      className="btn items-center sinput-min"
      onClick={() => {
        setShowSearchResults(!ShowSearchResults);
      }}
    >
      <svg
        className="main-svg"
        viewBox="3 2 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="svg"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.5 11.1455C5.49956 8.21437 7.56975 5.69108 10.4445 5.11883C13.3193 4.54659 16.198 6.08477 17.32 8.79267C18.4421 11.5006 17.495 14.624 15.058 16.2528C12.621 17.8815 9.37287 17.562 7.3 15.4895C6.14763 14.3376 5.50014 12.775 5.5 11.1455Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="svg"
          d="M15.989 15.4905L19.5 19.0015"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
function SearchInput({
  ShowSearchResults,
  setShowSearchResults,
  className,
  search,
  placeholder,
  handleInputChange,
}) {
  return (
    <input
      onChange={handleInputChange}
      value={search}
      onClick={() => {
        setShowSearchResults(true);
      }}
      className={`inp  h-full w-full ${className}`}
      placeholder={placeholder}
      autoComplete="off"
      
      type="text"
    />
  );
}
function SearchResults({
  ShowSearchResults,
  setShowSearchResults,
  noData,
  placeholder,
  results,
  handleInputChange,
  products,
  noQuery,
}) {
  return ShowSearchResults ? (
    <>
      <div>
        {" "}
        <style jsx global>{`
          body {
            overflow: hidden;
          }
        `}</style>
        <div className="search fixed  xl:right-[35%] xl:left-[35%] md:right-[20%] md:left-[20%] left-[10%] right-[10%] top-28">
          <div className="flex items-center  w-full justify-between gap-2">
            <div className=" p-1 rounded items-center h-auto w-full">
              <h1 className="text-xl sinput">{results}</h1>
              <SearchInput
                className="sinput-min"
                ShowSearchResults={false}
                setShowSearchResults={setShowSearchResults}
                placeholder={placeholder}
                handleInputChange={handleInputChange}
              />
            </div>
            <button className="btn !p-1 m-1"     onClick={() => {
                setShowSearchResults(!ShowSearchResults);
              }}>
          <svg
              className="main-svg  dark:fill-white fill-black"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="svg"
                clip-rule="evenodd"
                d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
              />
            </svg>
          </button>
          </div>

          <div className="search_res">
            {console.log(products)}
            {products && products.length == 0 ? (
              <div className="text-center">
                <h1 className="p-16 text-xl">{noData}</h1>
              </div>
            ) : null}{" "}
            {products && typeof products !== "undefined" ? (
              products.map((item, index) => (
                <Scard
                  key={index}
                  link={`/${item.category.url}/${item.category.url2}/${item._id}`}

                  img={item.images && item.images[0] && item.images[0].img}
                  name={item.name}
                  price={item.price}
                />
              ))
            ) : (
              <div className="text-center">
                <h1 className="p-16 text-xl">{noQuery}</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export { SearchButton, SearchInput, SearchResults };
