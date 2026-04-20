import React, { useState } from 'react';
import FilterModal from './FilterModal';

const Filter = ({ onApplyFilters }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenFilter = () => {
        console.log("🎯 Filter icon clicked!");
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        console.log("❌ Filter modal closed");
        setIsModalOpen(false);
    };

    const handleApplyFilters = (filters) => {
        console.log("📤 Filters applied in Filter.jsx:", filters);
        
        if (onApplyFilters) {
            onApplyFilters(filters);
        }
        
        setIsModalOpen(false);
    };

    return (
        <>
            <span 
                className='material-symbols-outlined filter'
                onClick={handleOpenFilter}
            >
                tune
            </span>
            {isModalOpen && (
                <FilterModal 
                    onClose={handleCloseModal}
                    onApply={handleApplyFilters}
                />
            )}
        </>
    );
};

export default Filter;