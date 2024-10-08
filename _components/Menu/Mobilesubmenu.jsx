import React from "react";
import Link from "next/link";
import PropTypes from 'prop-types';

const SeeAll = { ge: "ყველას ნახვა", en: "See all" };

const Miniitem = ({ name, link }) => (
  <Link className="miniitem" href={link}>
    <h1>{name}</h1>
  </Link>
);

Miniitem.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const Bigitems = ({ mainname, subCategories, localActive, categoryUrl }) => (
  <>
    {mainname && <h1>{mainname}</h1>}
    <div className="bigitems">
      {subCategories?.map((category, index) => (
        <Miniitem
          name={category.name[localActive]}
          link={`/${categoryUrl}/${category.url}`}
          key={index}
        />
      ))}
      {categoryUrl && (
        <Miniitem
          name={SeeAll[localActive]}
          link={`/${categoryUrl}`}
        />
      )}
    </div>
  </>
);

Bigitems.propTypes = {
  mainname: PropTypes.string,
  subCategories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.object.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
  localActive: PropTypes.string.isRequired,
  categoryUrl: PropTypes.string,
};

const Mobilesubmenu = ({ subCategories, name, localActive, categoryUrl }) => (
  <div className="mobilesubmenu">
    <Bigitems
      mainname={name?.[localActive]}
      subCategories={subCategories}
      localActive={localActive}
      categoryUrl={categoryUrl}
    />
  </div>
);


export default Mobilesubmenu;