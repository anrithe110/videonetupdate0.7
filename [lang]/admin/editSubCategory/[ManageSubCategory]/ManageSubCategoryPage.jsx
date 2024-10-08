"use client";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import url from "@/libs/url.config";
import Navbar from "../../components/mini/Navbar";
import PopOut from "@/src/app/[lang]/admin/components/mini/Popout";
import Select from "react-select";
import Actions from "../../components/mini/Actions";
import { nanoid } from "nanoid";
function StatCard({
  stat,
  statIndex,
  handleStatChange,
  handleDeleteOption,
  handleDeleteStat,
  setCurrentStatIndex,
  setDisplay,
}) {
  return (
    <div key={statIndex} className="bg p-3 grid">
      <div className="flex flex-row-reverse">
        <button className="pb-2" onClick={() => handleDeleteStat(statIndex)}>
          <svg
            className="main-svg dark:stroke-[red] stroke-[red]"
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
          placeholder="Stat name EN"
          className="inp"
          type="text"
          value={stat.nameEn}
          onChange={(e) =>
            handleStatChange(statIndex, "nameEn", e.target.value)
          }
          required
        />
        <input
          placeholder="Stat name GE"
          className="inp"
          type="text"
          value={stat.nameGe}
          onChange={(e) =>
            handleStatChange(statIndex, "nameGe", e.target.value)
          }
          required
        />
      </div>
      <div className="grid pt-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {stat.options.map((option, optionIndex) => (
          <div
            key={optionIndex}
            className="flex bg2 items-center justify-between"
          >
            <h1 className="w-full">{option}</h1>
            <button onClick={() => handleDeleteOption(statIndex, optionIndex)}>
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
  );
}

function EditStatName({ ID, setDisplay3, category_id, findSubCategories }) {
  const [nameEN, setNameEN] = useState("");
  const [nameGE, setNameGE] = useState("");
  function findStatById(stats, id) {
    return stats.find((stat) => stat._id === id);
  }

  const findSubCategories2 = async () => {
    if (category_id) {
      try {
        const response = await fetch(`${url}/api/findCategory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category_id }),
        });

        if (response.ok) {
          const data = await response.json();
          const options = findStatById(
            data.category.findcategorybyid.stats,
            ID
          );

          setNameGE(`${options.name.ge}`);
          setNameEN(`${options.name.en}`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  useEffect(() => {
    findSubCategories2();
  }, []);

  const editStatnanme = async () => {
    try {
      const response = await fetch(`${url}/api/Category`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: category_id,
          stats_id: ID,
          newStats: { name: { en: nameEN, ge: nameGE } },
          forwhat: "changeStatName",
        }),
      });
      if (response.ok) {
        setDisplay3(false);
        findSubCategories();
      } else {
        alert("Failed to update Parent Category");
        findSubCategories();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <PopOut text={`Edit name`} Close={() => setDisplay3(false)}>
      <div className="flex flex-col  gap-3">
        <input
          type="text"
          placeholder="Name In English"
          value={nameEN}
          className="inp w-full"
          onChange={(e) => {
            setNameEN(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Name In Georgian"
          value={nameGE}
          className="inp w-full"
          onChange={(e) => {
            setNameGE(e.target.value);
          }}
        />
        <button className="btn" onClick={() => editStatnanme()}>
          Save
        </button>
      </div>
    </PopOut>
  );
}

function AllOptions({
  setDisplay2,
  items,
  deleteOption,
  setNewOption,
  newOption,
  addNewOption,
  category_id,
}) {
  const [Data, setData] = useState([]);

  function findStatById(stats, id) {
    return stats.find((stat) => stat._id === id);
  }

  const findSubCategories2 = async () => {
    if (category_id) {
      try {
        const response = await fetch(`${url}/api/findCategory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category_id }),
        });

        if (response.ok) {
          const data = await response.json();
          const options = findStatById(
            data.category.findcategorybyid.stats,
            items._id
          );
          setData(options.statOptions);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  useEffect(() => {
    findSubCategories2();
  }, []);

  return (
    <PopOut
      text={`${items.name.en} - ${items.name.ge}`}
      Close={() => setDisplay2(false)}
    >
      <div className="flex">
        <div className="w-full p-2">
          <table className="table">
            <thead className="w-full">
              <tr>
                <th className="thname" scope="col">
                  Name
                </th>
                <th className="thactions" scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {Data.map((i, index) => (
                <tr key={index}>
                  <td className="thname">{i.option && `${i.option}`}</td>
                  <td className="thactions">
                    <div className="flex justify-center gap-5 items-center">
                      <button
                        onClick={() => {
                          deleteOption(i._id).then(() => {
                            findSubCategories2();
                          });
                        }}
                      >
                        <svg
                          className="main-svg dark:stroke-[red] stroke-[red]"
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <input
            className="inp m-1"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
          />
          <button
            className="btn m-1"
            onClick={() => {
              addNewOption(items._id).then(() => {
                findSubCategories2();
              });
            }}
          >
            add new
          </button>
        </div>
      </div>
    </PopOut>
  );
}

function ManageSubCategoryPage() {
  const router = useParams();
  const { ManageSubCategory: category_id } = router;
  const [Specs, setSpecs] = useState();
  const [name, setName] = useState();
  const [display, setDisplay] = useState(false);
  const [display2, setDisplay2] = useState(false);
  const [display3, setDisplay3] = useState(false);
  const [newOption, setNewOption] = useState("");
  const [currentStatIndex, setCurrentStatIndex] = useState(null);
  const [items, setItems] = useState([]);
  const [Id, setID] = useState();
 
  const [stats, setStats] = useState([
  ]);
  const handleStatChange = (index, field, value) => {
    const newStats = [...stats];
    newStats[index][field] = value;
    setStats(newStats);
  };
  const Editinfo = (item) => {
    setItems(item);
    setDisplay2(true);
  };
  const EditName = (ID) => {
    setID(ID);
    setDisplay(false);
    setDisplay2(false);
    setDisplay3(true);
  };
  const handleAddStat = () => {
    const id = nanoid(6);
    setStats([ ...(stats || []), { nameEn: "", nameGe: "", id: id ,  options: [] }]);
   
  };

  const handleDeleteOption = (statIndex, optionIndex) => {
    const newStats = [...stats];
    newStats[statIndex].options.splice(optionIndex, 1);
    setStats(newStats);
  };

  const handleDeleteStat = (statIndex) => {
    const newStats = [...stats];
    newStats.splice(statIndex, 1);
    setStats(newStats);
  };

  const handleAddNewOption = () => {
    if (newOption.trim()) {
      const newStats = [...stats];
      newStats[currentStatIndex].options.push(newOption);
      setStats(newStats);
      setDisplay(false);
      setNewOption("");
    }
  };
  const findSubCategories = async () => {
    if (category_id) {
      try {
        const response = await fetch(
          `${url}/api/findCategory?id=${category_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setSpecs(data.data.stats);
          setName(data.data.name);
          setBrands(data.data.brands);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const deleteSpec = async (id) => {
    if (confirm("Remove specification?")) {
      try {
        const response = await fetch(`${url}/api/Category`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category_id, id, forwhat: "specification" }),
        });

        if (response.ok) {
          findSubCategories();
        } else {
          console.error("Error updating parent category");
          findSubCategories();
        }
      } catch (error) {
        console.error("Network error or unexpected error:", error);
      }
    }
  };

  const deleteOption = async (id) => {
    if (confirm("Remove Option?")) {
      try {
        const response = await fetch(`${url}/api/Category`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category_id, id, forwhat: "option" }),
        });
        if (response.ok) {
          findSubCategories();
        } else {
          findSubCategories();
          console.error("Error updating parent category");
        }
      } catch (error) {
        console.error("Network error or unexpected error:", error);
      }
    }
  };
  
  const addNewStats = async () => {
    try {
      const response = await fetch(`${url}/api/Category`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: category_id,
          forwhat: "addNewStats",
          newStats: stats.map((stat) => ({
            id:stat.id,
            name: { en: stat.nameEn, ge: stat.nameGe },
            statOptions: stat.options
              .filter((option) => option !== null)
              .map((option) => ({ option })),
          })),
        }),
      });
      if (response.ok) {
        setStats([]);
      } else {
        alert("Failed to update Parent Category");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    findSubCategories();
  };
  const addNewOption = async (statid) => {
    try {
      const response = await fetch(`${url}/api/Category`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: category_id,
          stats_id: statid,
          newStats: newOption,
          forwhat: "addNewOption",
        }),
      });
      if (response.ok) {
      } else {
        alert("Failed to update Parent Category");
      }
      setNewOption("");
      findSubCategories();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    findSubCategories();
  }, [category_id]);

  

  const Item = ({ name, ID, item }) => (
    <tr>
      <td className="thname">{name && `${name.en} - ${name.ge}`}</td>
      <td className="thactions">
        <Actions
          DeleteFunc={() => deleteSpec(ID)}
          OptFunc={() => Editinfo(item)}
          NameFunc={() => EditName(ID)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <Navbar />
      {display && (
        <PopOut text="Input option" Close={() => setDisplay(false)}>
          <div className="flex w-full justify-between">
            <input
              placeholder="Option"
              className="inp w-1/2"
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              required
            />
            <button onClick={handleAddNewOption} className="btn">
              Add Option
            </button>
          </div>
        </PopOut>
      )}
      {display2 && (
        <AllOptions
          setDisplay2={setDisplay2}
          items={items}
          deleteOption={deleteOption}
          setNewOption={setNewOption}
          newOption={newOption}
          addNewOption={addNewOption}
          category_id={category_id}
        />
      )}
      {display3 && (
        <EditStatName
          setDisplay3={setDisplay3}
          category_id={category_id}
          ID={Id}
          findSubCategories={findSubCategories}
        />
      )}
      <div className="min-h-[1000px]">
        <div className="items-center top-auto w-full  h-fit">
          <div className="main w-full m-[0px,auto] max-w-7xl">
            <div className="pt-2">
              <div className="w-full adminContent"> <h1>Category Name: {name && `${name.en} - ${name.ge}`}</h1>
              <hr className="m-3 ml-0 mr-0" />
              <h1>specification</h1>
                <div className="editCategory">
                  <div>
                    <table className="table">
                      <thead className="w-full">
                        <tr>
                          <th className="thname" scope="col">
                            Name
                          </th>
                          <th className="thactions" scope="col">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Specs?.map((i, index) => (
                          <Item key={index} name={i.name} ID={i._id} item={i} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div>
                  <h1>add specification</h1>
                    <div className="w-full relative p-3 flex flex-col gap-3">
                      {stats.map((stat, statIndex) => (
                        <StatCard
                          key={statIndex}
                          stat={stat}
                          statIndex={statIndex}
                          stats={stats}
                          setDisplay={setDisplay}
                          handleDeleteOption={handleDeleteOption}
                          setCurrentStatIndex={setCurrentStatIndex}
                          handleStatChange={handleStatChange}
                          handleDeleteStat={handleDeleteStat}
                        />
                      ))}
                    </div>
                    <div className="flex bg p-3 m-3 justify-between">
                      <button
                        type="button"
                        className="btn"
                        onClick={handleAddStat}
                      >
                        Add Stat
                      </button>
                      <button onClick={addNewStats} className="btn">
                        Add New Features
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageSubCategoryPage;
