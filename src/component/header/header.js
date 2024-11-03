import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { setFilteredSearchNote } from "../feature/slice";
import "./header.css";

const Header = () => {
  const [search, setSearch] = useState();
  const state = useSelector((state) => state.noteReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    handleSearchNote();
  }, [search]);

  const handleSearchNote = () => {
    const newNote = state.notes.filter((note) =>
      note.title.toLowerCase().includes(search.toLowerCase())
    );

    if (!search == "") {
      dispatch(setFilteredSearchNote(newNote));
    } else {
      dispatch(setFilteredSearchNote(state.notes));
    }
  };

  return (
    <header className="header ">
      <div className="search-note">
        
      </div>
    </header>
  );
};

export default Header;
