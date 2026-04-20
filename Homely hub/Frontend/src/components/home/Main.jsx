import React, { useState } from 'react'
import Header from './Header'
import {Outlet} from "react-router-dom"
import Footer from "./Footer"

const Main = () => {
  const [appliedFilters, setAppliedFilters] = useState(null);

  const handleApplyFilters = (filters) => {
    console.log("🎯 Main.jsx received filters:", filters);
    setAppliedFilters(filters);
  };

  const handleClearFilters = () => {
    console.log("🗑️ Main.jsx clearing filters");
    setAppliedFilters(null);
  };

  return (
    <div>
      <Header onApplyFilters={handleApplyFilters} />
      <Outlet context={{ appliedFilters, handleApplyFilters, handleClearFilters }} />
      <Footer/>
    </div>
  )
}

export default Main