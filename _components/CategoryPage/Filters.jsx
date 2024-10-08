"use client";
import Slider from "@mui/material/Slider";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

function CheckBox({ value, name, handleCheckboxChange, isChecked }) {
  const handleChange = (e) => {
    const newCheckedValue = e.target.checked;
    handleCheckboxChange(name, value, newCheckedValue);
  };

  return (
    <div className="flex justify-between pt-2">
      <label className="checkbox-container">
        <input
          className="custom-checkbox"
          onChange={handleChange}
          type="checkbox"
          checked={isChecked || false}
        />
        <span className="checkmark"></span>
      </label>
      <h1>{value}</h1>
    </div>
  );
}

function CheckBoxes({
  name,
  options,
  statID,
  handleCheckboxChange,
  selectedFilters,
}) {
  return (
    <div className="p-5 pt-0 ">
      <h1>{name}</h1>
      {options.map((item, index) => (
        <CheckBox
          key={index}
          value={item.option}
          name={statID}
          handleCheckboxChange={handleCheckboxChange}
          isChecked={selectedFilters[statID]?.includes(item.option)}
        />
      ))}
    </div>
  );
}

const Filters = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const brandh1 = { ge: "ბრენდი", en: "Brands" };
  const category = { ge: "ქვე კატეგორიები:", en: "Sub categories:" };
  const [priceRange, setPriceRange] = useState([
    props.MinMax[0],
    props.MinMax[1],
  ]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const {
    stats,
    localActive: locale,
    className,
    Buttons,
    filters,
    brands,
    subCategories,
    products,
  } = props;

  useEffect(() => {
    const query = {};
    searchParams.forEach((value, key) => {
      query[key] = value.split(",");
    });

    if (query.min && query.max) {
      setPriceRange([Number(query.min), Number(query.max)]);
    }

    const filters = {};
    Object.keys(query).forEach((key) => {
      if (key !== "min" && key !== "max") {
        filters[key] = query[key];
      }
    });
    setSelectedFilters(filters);
  }, []);

  useEffect(() => {
    const query = { ...router.query };
    query.min = priceRange[0];
    query.max = priceRange[1];
    Object.keys(selectedFilters).forEach((filterKey) => {
      if (selectedFilters[filterKey].length > 0) {
        query[filterKey] = selectedFilters[filterKey].join(",");
      } else {
        delete query[filterKey];
      }
    });
    const params = new URLSearchParams(query);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [priceRange, selectedFilters]);

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  const handleCheckboxChange = (statID, value, isChecked) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (!newFilters[statID]) {
        newFilters[statID] = [];
      }
      if (isChecked) {
        if (!newFilters[statID].includes(value)) {
          newFilters[statID].push(value);
        }
      } else {
        newFilters[statID] = newFilters[statID].filter((v) => v !== value);
      }
      return newFilters;
    });
  };
  const handleResetFilters = () => {
    setPriceRange([props.MinMax[0], props.MinMax[1]]);
    setSelectedFilters({});
  };
  const availableBrands = brands?.filter((brand) =>
    products?.some((product) => product?.brand === brand?.name)
  );

  const availableFilters = stats?.stats
    ?.map((s) => {
      const matchedStatOptions = s?.statOptions.filter((option) =>
        products?.some((product) =>
          product?.stats?.some((i) => i.value === option.option)
        )
      );
      return {
        ...s,
        statOptions: matchedStatOptions,
      };
    })
    .filter((s) => s?.statOptions?.length > 0);

  return (
    <>
      {className === "filters_mobile" && (
        <style jsx global>{`
          body {
            overflow: hidden;
          }
        `}</style>
      )}
      <div style={props.style} className={className}>
        <div>
          <div className=" p-2 z-40 flex items-center justify-between gap-2 buttons">
            {window.innerWidth <= 970 ? (
              Buttons
            ) : (
              <h1 className="text-lg p-2">{filters}</h1>
            )}

            <button className="m-1" onClick={handleResetFilters}>
              <svg
                className="w-8 dark:stroke-[red] stroke-[red]"
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
          <div className="overflow-hidden">
            <div className="flex justify-between pt-0 p-3">
              <div className="priceinp">
                <h4>{props.minh1}</h4>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([e.target.value, priceRange[1]])
                  }
                />
                <div>₾</div>
              </div>
              <div className="priceinp">
                <h4>{props.maxh1}</h4>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], e.target.value])
                  }
                />
                <div>₾</div>
              </div>
            </div>
            <div className="p-5 pt-0">
              <Slider
                value={priceRange}
                onChange={handleSliderChange}
                aria-labelledby="pricing-slider"
                valueLabelDisplay="off"
                min={props.MinMax[0]}
                max={props.MinMax[1]}
              />
            </div>
            {subCategories && (
              <div className="p-4 pt-0 ">
                <h1>{category[locale]}</h1>
                <div className=" bg2 mt-2 mb-4 flex flex-col gap-3 !p-2">
                  {subCategories &&
                    subCategories.map((i, index) => (
                      <a key={index} href={`${pathname}/${i.url}`}>
                        <div className="bg p-1">{i.name[locale]}</div>
                      </a>
                    ))}
                </div>
              </div>
            )}
            {brands && (
              <div className="p-5 pt-0 ">
                <h1>{brandh1[locale]}</h1>
                {availableBrands.map((brand, index) => (
                  <CheckBox
                    key={index}
                    value={brand.name}
                    name={"brand"}
                    handleCheckboxChange={handleCheckboxChange}
                    isChecked={selectedFilters["brand"]?.includes(brand.name)}
                  />
                ))}
              </div>
            )}
            {availableFilters &&
              availableFilters.map((i, index) =>
                i.statOptions.length > 0 ? (
                  <CheckBoxes
                    key={index}
                    name={i.name[locale]}
                    options={i.statOptions}
                    statID={i.id}
                    handleCheckboxChange={handleCheckboxChange}
                    selectedFilters={selectedFilters}
                  />
                ) : null
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
