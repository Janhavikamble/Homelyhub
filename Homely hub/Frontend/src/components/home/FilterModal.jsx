import React, { useState } from "react";
import "../../css/FilterModal.css";
import "react-input-range/lib/css/index.css";
import InputRange from "react-input-range";

const FilterModal = ({ onClose, onApply }) => {
  const [priceRange, setPriceRange] = useState({ min: 600, max: 30000 });
  const [propertyType, setPropertyType] = useState("");
  const [roomType, setRoomType] = useState("");
  const [amenities, setAmenities] = useState([]);

  const handlePriceRangeChange = (value) => {
    if (value.min >= 600 && value.max <= 30000 && value.min <= value.max) {
      setPriceRange(value);
    }
  };

  const handleMinInputChange = (e) => {
    const minValue = parseInt(e.target.value, 10);
    if (!isNaN(minValue) && minValue >= 600 && minValue <= priceRange.max) {
      setPriceRange((prev) => ({ ...prev, min: minValue }));
    }
  };

  const handleMaxInputChange = (e) => {
    const maxValue = parseInt(e.target.value, 10);
    if (!isNaN(maxValue) && maxValue <= 30000 && maxValue >= priceRange.min) {
      setPriceRange((prev) => ({ ...prev, max: maxValue }));
    }
  };

  const handleApplyFilters = () => {
    const filters = {
      priceRange,
      propertyType,
      roomType,
      amenities,
    };
    
    console.log("✨ Applied Filters:", filters);
    
    if (onApply) {
      onApply(filters);
    }
  };

  const propertyTypeOptions = [
    { value: "house", label: "House", icon: "home" },
    { value: "flat", label: "Flat", icon: "apartment" },
    { value: "guest-house", label: "Guest House", icon: "hotel" },
    { value: "hotel", label: "Hotel", icon: "meeting_room" },
  ];

  const roomTypeOptions = [
    { value: "Entire Home", label: "Entire Home", icon: "hotel" },
    { value: "Room", label: "Room", icon: "meeting_room" },
    { value: "Anytype", label: "Any Type", icon: "apartment" },
  ];

  const amenitiesOptions = [
    { value: "Wifi", label: "Wi-Fi", icon: "wifi" },
    { value: "Kitchen", label: "Kitchen", icon: "kitchen" },
    { value: "Ac", label: "AC", icon: "ac_unit" },
    {
      value: "Washing Machine",
      label: "Washing Machine",
      icon: "local_laundry_service",
    },
    { value: "Tv", label: "TV", icon: "tv" },
    { value: "Pool", label: "Pool", icon: "pool" },
    { value: "Free Parking", label: "Free Parking", icon: "local_parking" },
  ];

  const handleClearFilters = () => {
    setPriceRange({ min: 600, max: 30000 });
    setPropertyType("");
    setRoomType("");
    setAmenities([]);
  };

  const handleAmenitiesChange = (selectedAmenity) => {
    setAmenities((prevAmenities) =>
      prevAmenities.includes(selectedAmenity)
        ? prevAmenities.filter((item) => item !== selectedAmenity)
        : [...prevAmenities, selectedAmenity]
    );
  };

  const handlePropertyTypeChange = (selectedType) => {
    setPropertyType((prevType) =>
      prevType === selectedType ? "" : selectedType
    );
  };

  const handleRoomTypeChange = (selectedType) => {
    setRoomType((prevType) => (prevType === selectedType ? "" : selectedType));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxHeight: "80vh", overflow: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h4>
          Filters <hr />
        </h4>
        <button className="close-button" onClick={onClose}>
          <span>&times;</span>
        </button>

        <div className="modal-filters-container">
          <div className="filter-section">
            <label>Price Range:</label>
            <InputRange
              minValue={600}
              maxValue={30000}
              value={priceRange}
              onChange={handlePriceRangeChange}
            />
            <div className="range-inputs">
              <input
                type="number"
                value={priceRange.min}
                onChange={handleMinInputChange}
                min={600}
                max={priceRange.max}
              />
              <span>-</span>
              <input
                type="number"
                value={priceRange.max}
                onChange={handleMaxInputChange}
                min={priceRange.min}
                max={30000}
              />
            </div>
          </div>

          <div className="filter-section">
            <label>Property Type:</label>
            <div className="icon-box">
              {propertyTypeOptions.map((option) => (
                <div
                  key={option.value}
                  className={`selectable-box ${
                    propertyType === option.value ? "selected" : ""
                  }`}
                  onClick={() => handlePropertyTypeChange(option.value)}
                >
                  <span className="material-icons">{option.icon}</span>
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <label>Room Type:</label>
            <div className="icon-box">
              {roomTypeOptions.map((option) => (
                <div
                  key={option.value}
                  className={`selectable-box ${
                    roomType === option.value ? "selected" : ""
                  }`}
                  onClick={() => handleRoomTypeChange(option.value)}
                >
                  <span className="material-icons">{option.icon}</span>
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <label>Amenities:</label>
            <div className="amenities-checkboxes">
              {amenitiesOptions.map((option) => (
                <div key={option.value} className="amenity-checkbox">
                  <input
                    type="checkbox"
                    id={option.value}
                    value={option.value}
                    checked={amenities.includes(option.value)}
                    onChange={() => handleAmenitiesChange(option.value)}
                  />
                  <label htmlFor={option.value}>
                    <span className="material-icons amenitieslabel">
                      {option.icon}
                    </span>
                    <span>{option.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-buttons">
            <button className="clear-button" onClick={handleClearFilters}>
              Clear All
            </button>
            <button className="apply-button" onClick={handleApplyFilters}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;