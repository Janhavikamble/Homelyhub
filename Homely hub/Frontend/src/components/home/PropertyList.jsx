import React, { useEffect, useState, useRef } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { propertyAction } from '../../store/Property/property-slice';
import { getAllProperties } from '../../store/Property/property-action';
import gsap from 'gsap';
import "../../css/Home.css";

const Card = ({ image, name, address, price, id }) => {
    return (
        <>
            <figure className='property'>
                <Link to={`/propertylist/${id}`}>
                    <img src={image} alt='Propertyimg' />
                </Link>
                <h4>{name}</h4>
                <figcaption>
                    <main className='propertydetails'>
                        <h5>{name}</h5>
                        <h6>
                            <span className='material-symbols-outlined houseicon'> home_pin</span>
                            {address}
                        </h6>
                        <p>
                            <span className='price'>
                                ₹{price}
                            </span>
                            per night
                        </p>
                    </main>
                </figcaption>
            </figure>
        </>
    );
};

const PropertyList = () => {
    const [currentPage, setCurrentPage] = useState({ page: 1 });
    const [filteredProperties, setFilteredProperties] = useState([]);
    
    // Get filter state from parent via Outlet context
    const { appliedFilters, handleClearFilters } = useOutletContext();
    
    const dispatch = useDispatch();
    const { properties, totalProperties } = useSelector((state) => state.properties);
    const lastPage = Math.ceil(totalProperties / 12);
    const propertyListRef = useRef(null);

    // Fetch properties from API
    useEffect(() => {
        const fetchProperties = async (page) => {
            dispatch(propertyAction.updateSearchParams(page));
            dispatch(getAllProperties());
        };
        fetchProperties(currentPage);
    }, [currentPage, dispatch]);

    // Apply filters to properties
    useEffect(() => {
        if (appliedFilters) {
            console.log("🔍 Applying filters:", appliedFilters);
            console.log("📦 Total properties before filter:", properties.length);
            
            const filtered = properties.filter((property) => {
                // Filter by price range
                const priceMatch = 
                    property.price >= appliedFilters.priceRange.min && 
                    property.price <= appliedFilters.priceRange.max;

                // Filter by property type
                const propertyTypeMatch = 
                    !appliedFilters.propertyType || 
                    property.propertyType?.toLowerCase() === appliedFilters.propertyType.toLowerCase();

                // Filter by room type
                const roomTypeMatch = 
                    !appliedFilters.roomType || 
                    appliedFilters.roomType === "Anytype" ||
                    property.roomType === appliedFilters.roomType;

                // Filter by amenities
                const amenitiesMatch = 
                    appliedFilters.amenities.length === 0 ||
                    appliedFilters.amenities.every((amenity) =>
                        property.amenities?.includes(amenity)
                    );

                const matches = priceMatch && propertyTypeMatch && roomTypeMatch && amenitiesMatch;
                
                if (!matches) {
                    console.log(`❌ ${property.propertyName} filtered out:`, {
                        price: property.price,
                        priceMatch,
                        propertyType: property.propertyType,
                        propertyTypeMatch,
                        roomType: property.roomType,
                        roomTypeMatch,
                        amenities: property.amenities,
                        amenitiesMatch
                    });
                }

                return matches;
            });

            console.log("✅ Properties after filter:", filtered.length);
            setFilteredProperties(filtered);
        } else {
            console.log("📋 No filters applied, showing all properties");
            setFilteredProperties(properties);
        }
    }, [properties, appliedFilters]);

    // GSAP animation for property cards
    useEffect(() => {
        if (propertyListRef.current && propertyListRef.current.children.length > 0) {
            gsap.fromTo(
                propertyListRef.current.children,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out"
                }
            );
        }
    }, [filteredProperties]);

    const displayProperties = filteredProperties;

    return (
        <>
            {/* Active Filters Display */}
            {appliedFilters && (
                <div className="active-filters">
                    <span>Active Filters:</span>
                    
                    <span className="filter-tag">
                        Price: ₹{appliedFilters.priceRange.min} - ₹{appliedFilters.priceRange.max}
                    </span>
                    
                    {appliedFilters.propertyType && (
                        <span className="filter-tag">
                            Type: {appliedFilters.propertyType}
                        </span>
                    )}
                    
                    {appliedFilters.roomType && (
                        <span className="filter-tag">
                            Room: {appliedFilters.roomType}
                        </span>
                    )}
                    
                    {appliedFilters.amenities.length > 0 && (
                        <span className="filter-tag">
                            Amenities: {appliedFilters.amenities.join(', ')}
                        </span>
                    )}

                    <button 
                        onClick={handleClearFilters}
                        style={{
                            marginLeft: '10px',
                            padding: '6px 12px',
                            background: '#ff385c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        Clear Filters
                    </button>
                </div>
            )}

            {/* Results Count */}
            {appliedFilters && (
                <div className="results-count">
                    Showing {displayProperties.length} of {properties.length} properties
                </div>
            )}

            {/* Property List */}
            {displayProperties.length === 0 ? (
                <p className='not_found'>
                    {appliedFilters 
                        ? 'No properties match your filters. Try adjusting your search criteria.' 
                        : 'Property Not found'}
                </p>
            ) : (
                <div className='propertylist' ref={propertyListRef}>
                    {displayProperties.map((property) => (
                        <Card
                            key={property._id}
                            id={property._id}
                            image={property.images[0].url}
                            name={property.propertyName}
                            address={`${property.address.city}, ${property.address.state}, ${property.address.pincode}`}
                            price={property.price}
                        />
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className='pagination'>
                <button 
                    className='previous_btn' 
                    onClick={() => setCurrentPage((prev) => ({ page: prev.page - 1 }))}
                    disabled={currentPage.page === 1}
                >
                    <span className='material-symbols-outlined'>arrow_back_ios_new</span>
                </button>

                <span>
                    Page {currentPage.page} of {lastPage}
                </span>

                <button 
                    className='next_btn' 
                    onClick={() => setCurrentPage((prev) => ({ page: prev.page + 1 }))}
                    disabled={displayProperties.length < 12 || currentPage.page === lastPage}
                >
                    <span className='material-symbols-outlined'>arrow_forward_ios</span>
                </button>
            </div>
        </>
    );
};

export default PropertyList;