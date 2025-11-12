import React from "react";
import heroText from "@/locales/hero";

const Hero = (): React.JSX.Element => {
  return (
    <section className="bg-blue-700 py-20 mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            {heroText.heading_main_hero}
          </h1>
          <p className="my-4 text-xl text-white">{heroText.tagline_hero}</p>
        </div>
        <form className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center">
          <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
            <label htmlFor="location" className="sr-only">
              {heroText.label_location}
            </label>
            <input
              type="text"
              id="location"
              placeholder={heroText.placeholder_enter_location}
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="w-full md:w-2/5 md:pl-2">
            <label htmlFor="property-type" className="sr-only">
              {heroText.label_property_type}
            </label>
            <select
              id="property-type"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="All">{heroText.dropdown_option_all}</option>
              <option value="Apartment">
                {heroText.dropdown_option_apartment}
              </option>
              <option value="Studio">{heroText.dropdown_option_studio}</option>
              <option value="Condo">{heroText.dropdown_option_condo}</option>
              <option value="House">{heroText.dropdown_option_house}</option>
              <option value="Cabin Or Cottage">
                {heroText.dropdown_option_cabin}
              </option>
              <option value="Loft">{heroText.dropdown_option_loft}</option>
              <option value="Room">{heroText.dropdown_option_room}</option>
              <option value="Other">{heroText.dropdown_option_other}</option>
            </select>
          </div>
          <button
            type="submit"
            className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
          >
            {heroText.button_search}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
