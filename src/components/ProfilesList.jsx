import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getProfilesList } from "../JS/actions";

const List = (props) => {
  const dispatch = useDispatch();
  const profilesList = useSelector((state) => state.userReducer.profilesList);
  const loading = useSelector((state) => state.userReducer.loading);

  useEffect(() => {
    let x = "";
    props.match.params.domain === "Software"
      ? (x = "A")
      : props.match.params.domain === "Marketing"
      ? (x = "B")
      : props.match.params.domain === "Design"
      ? (x = "C")
      : (x = "D");
    dispatch(getProfilesList(x));
  }, []);

  const gotothisProfil = (_id) =>{
      props.history.push(`/Profile/${_id}`)
    //   <Redirect to={`/Profile/${_id}`} />
  }

  return (
    <div>
      {/*props.match.params.domain*/}
      {loading ? (
        <h1>please wait</h1>
      ) : profilesList ? (
        profilesList.map((el) => <div key={el._id}>
            <h1 onClick={()=>gotothisProfil(el._id)}> {el.name} </h1>
        </div> )
      ) : (
        <h1>pas de freelancers</h1>
      )}
    </div>
  );
};

export default List;
