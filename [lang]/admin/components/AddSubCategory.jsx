import { useState, useEffect } from "react";
import PopOut from "./mini/Popout";
import { nanoid } from "nanoid";
const AddSubCategory = () => {
  const [nameEn, setNameEn] = useState("");
  const [nameGe, setNameGe] = useState("");
  const [url, setUrl] = useState("");
  const [display, setDisplay] = useState(false);
  const [newOption, setNewOption] = useState("");
  const [currentStatIndex, setCurrentStatIndex] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [stats, setStats] = useState();


  const handleFeatureChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const clearSelection = () => {
    setSelectedOptions([]);
  };

  const handleStatChange = (index, field, value) => {
    const newStats = [...stats];
    newStats[index][field] = value;
    setStats(newStats);
  };

  const handleAddStat = () => {
    const id = nanoid(6);
    setStats([ ...(stats || []), { nameEn: "", nameGe: "", id: id ,  options: [] }]);
   
  };

  const handleDeleteOption2 = (statIndex, optionIndex) => {
    const newStats = [...stats];
    newStats[statIndex].options.splice(optionIndex, 1);
    setStats(newStats);
  };
  const handleDeleteOption1 = (statIndex) => {
    const newStats = [...stats];
    newStats.splice(statIndex, 1);
    setStats(newStats);
  };
  const handleAddNewOption = () => {
    const newStats = [...stats];
    newStats[currentStatIndex].options.push(newOption);
    setStats(newStats);
    setDisplay(false);
    setNewOption(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCategory = {
      name: { en: nameEn, ge: nameGe },
      brands: selectedOptions.map((s) => ({ name: s.label })),
      url,
      stats: stats.map((stat) => ({
        name: { en: stat.nameEn, ge: stat.nameGe },
        id:stat.id,
        statOptions: stat.options
          .filter((option) => option !== null)
          .map((option) => ({ option })),
      })),
    };
    await fetch(`/api/Category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    });
    setNameEn("");
    setNameGe("");
    setUrl("");
    clearSelection();
    setStats([]);
  };

  return (
    <>
      {display && (
        <PopOut
          text="input option"
          Close={() => {
            setDisplay(false);
          }}
        >
          <div className="flex w-full justify-between">
            <input
              placeholder="Option"
              className="inp w-1/2"
              type="text"
              onChange={(e) => setNewOption(e.target.value)}
              required
            />
            <button onClick={handleAddNewOption} className="btn">
              Add Option
            </button>
          </div>
        </PopOut>
      )}
      <div className="flex EditProductAdmin ">
        <div className="">
          <h1 className="m-5 mb-0">Add Sub Category</h1>
          <div className="!flex !flex-col p-3">
            <input
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              required
              type="text"
              placeholder="Name In English"
              className="inp3 max-h-10 m-1"
            />
            <input
              value={nameGe}
              onChange={(e) => setNameGe(e.target.value)}
              required
              type="text"
              placeholder="Name In Georgian"
              className="inp3 max-h-10 m-1"
            />
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              type="text"
              placeholder="Input URL"
              className="inp3 max-h-10 m-1"
            />
          </div>
        </div>

      </div>
      <div className="EditProductAdmin min-h-[220px] mt-2">
        <div className="w-full relative p-3 flex flex-col gap-3">
          {stats && stats.map((stat, statIndex) => (
            <div key={statIndex} className="bg p-3 grid">
              <div>
                <div className="flex flex-row-reverse">
                  <button
                    className="pb-2"
                    onClick={() => handleDeleteOption1(statIndex)}
                  >
                    <svg
                      className="main-svg  dark:stroke-[red] stroke-[red]"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    placeholder="Stat Name In English"
                    className="inp"
                    type="text"
                    value={stat.nameEn}
                    onChange={(e) =>
                      handleStatChange(statIndex, "nameEn", e.target.value)
                    }
                    required
                  />
                  <input
                    placeholder="Stat Name In Georgian"
                    className="inp"
                    type="text"
                    value={stat.nameGe}
                    onChange={(e) =>
                      handleStatChange(statIndex, "nameGe", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid pt-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {stat.options
                  .filter((option) => option !== null)
                  .map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className="flex  bg2 items-center justify-between"
                    >
                      <h1 className="w-full">{option}</h1>
                      <button
                        onClick={() =>
                          handleDeleteOption2(statIndex, optionIndex)
                        }
                      >
                        <svg
                          className="main-svg !w-5 dark:stroke-[red] stroke-[red]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
              </div>
              <button
                className="btn mt-2"
                type="button"
                onClick={() => {
                  setCurrentStatIndex(statIndex);

                  setDisplay(true);
                }}
              >
                Add Option
              </button>
            </div>
          ))}
        </div> </div>
      {/* */}
      <div className="p-2 flex justify-between">
        <button type="button " className="btn !p-2" onClick={handleAddStat}>
          Add Stat
        </button>
        <button className="btn !p-2" disabled={stats == undefined || nameEn | nameGe | url  ==  ""} onClick={handleSubmit}>
          Add Category
        </button>
      </div> 
    </>
  );
};

export default AddSubCategory;
