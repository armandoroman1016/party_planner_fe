import React, { useState } from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";

const PlacesAutofill = (prop) => {
    const { setEventLocation } = prop;

    const [address, setAddress] = useState("");

    const handleChange = (loc) => {
        setAddress(loc);
    };

    const handleSelect = async (loc) => {
        setAddress(loc);

        let latLng;

        await geocodeByAddress(loc)
            .then((results) => {
                getLatLng(results[0]);
            })
            .then((coordinates) => (latLng = coordinates))
            .catch((error) => console.error("Error", error));

        setEventLocation(loc, latLng);
    };

    return (
        <div>
            <PlacesAutocomplete
                value={address}
                onChange={(e) => handleChange(e)}
                onSelect={(e) => handleSelect(e)}
            >
                {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                }) => (
                    <div>
                        <input
                            {...getInputProps({
                                className: "location-search-input",
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => {
                                const className = suggestion.active
                                    ? "suggestion-item--active"
                                    : "suggestion-item";
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? {
                                          backgroundColor: "#fafafa",
                                          cursor: "pointer",
                                      }
                                    : {
                                          backgroundColor: "#ffffff",
                                          cursor: "pointer",
                                      };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                        className="suggestion-item"
                                        key={suggestion.id}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </div>
    );
};

export default PlacesAutofill;
