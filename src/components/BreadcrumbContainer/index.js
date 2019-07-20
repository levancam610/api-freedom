import React, { Fragment } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import IntlMessages from "../../util/IntlMessages";

const BreadcrumbContainer = ({ heading, match }) => {
  return (
    <Fragment>
      {heading && <h1>{heading}</h1>}
      <BreadcrumbItems match={match} />
    </Fragment>
  );
};

export const BreadcrumbItems = ({ match }) => {
  /*{
    url:
    active
    title
  }*/
  let data = match;
  return (
    <Fragment>
      <Breadcrumb className="pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block">
        {data.map((elem, index) => {
          return (
            <BreadcrumbItem key={elem.title} active={elem.active}>
              {!elem.active ? (
                <NavLink to={elem.url}>
                  {elem.title}
                </NavLink>
              ) : (
                  elem.title
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </Fragment>
  );
};

export default BreadcrumbContainer;
