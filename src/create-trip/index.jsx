import React, { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash/debounce";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import trip from '../assets/trip.png';
import tripAnimation from '../assets/trip.json';
import Lottie from 'lottie-react';
import '../App.css';
import { Button } from "@/components/ui/button";
import { generatePath } from "react-router-dom";
import { toast } from "sonner";

const CreateTrip = () => {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [location, setLocation] = useState("");
  const [formData, setFormData] = useState({});
  const apiKey = import.meta.env.VITE_HERE_API_KEY;

  const InputChange = (name, value) => {
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);


  const OnGenerateTrip=()=>{
    if(formData?.noOfDays>15 &&!formData?.location||!formData?.budget||!formdata?.traveller){
      toast("Please Fill all Details");
      return ;
    }
    console.log(formData);
  }
  // Debounced API request function
  const fetchPlaces = debounce(async (input) => {
    if (input.length > 2) {
      try {
        const response = await axios.get(
          `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${input}&apiKey=${apiKey}`
        );
        setPlaces(response.data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setPlaces([]);
    }
  }, 300);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchPlaces(value);
  };

  
  const handlePlaceSelect = (place) => {
    setQuery(place.title);
    setLocation(place);
    setPlaces([]);
    InputChange('location', place.title); 
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <div className="hidden md:block">
        <div className="travel-animation">
          <Lottie
            animationData={tripAnimation}
            loop={true}
            style={{ height: '350px' }} 
          />
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="cartoon-girl">
          <img src={trip} alt="Cartoon Girl" />
        </div>
      </div>

      {/* Header Section */}
      <div className="text-center">
        <h2 className="font-bold text-4xl text-blue-600">Tell Us Your Travel Preferences 🏕️🌴</h2>
        <p className="mt-3 text-gray-600 text-xl max-w-3xl mx-auto">
          Provide some basic information and our trip planner will generate a customized itinerary 
          based on your preferences. Start your adventure with us!
        </p>
      </div>

      {/* Main Form Section */}
      <div className="mt-20 flex flex-col gap-9">
        <div>
          <h2 className="text-2xl my-3 font-medium">What is Your Destination of Choice?</h2>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            className="border p-4 w-full rounded-md shadow-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a destination"
          />
          <ul className="border mt-2 rounded-md bg-white shadow-lg">
            {places.map((place) => (
              <li
                key={place.id}
                onClick={() => handlePlaceSelect(place)}
                className="p-3 cursor-pointer hover:bg-blue-200 transition-colors duration-200"
              >
                {place.title}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl my-3 font-medium">How many days are you planning a trip for?</h2>
          <Input 
            placeholder="Ex. 3" 
            type="number" 
            onChange={(e) => InputChange('noOfDays', e.target.value)}
            className="border p-4 w-full rounded-md shadow-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Budget Section */}
      <div className="mt-20">
        <h2 className="text-2xl my-3 font-medium">What is your budget?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div 
              key={index} 
              onClick={() => InputChange('budget', item.title)}
              className={`p-6 border rounded-lg hover:shadow-lg cursor-pointer transition-shadow duration-300 transform hover:scale-105 ${formData?.budget==item.title&&'shadow-lg border-black'}`}
            >
              <h2 className="text-4xl mb-3">{item.icon}</h2>
              <h2 className="font-bold text-xl">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-2xl my-3 font-medium">Whom Do You Plan on traveling with on your next adventure?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          {SelectTravelList.map((item, index) => (
            <div 
              key={index} 
              onClick={() => InputChange('traveller', item.people)}
              className={`p-6 border rounded-lg hover:shadow-lg cursor-pointer transition-shadow duration-300 transform hover:scale-105 ${formData?.traveller==item.people&&'shadow-lg border-black '}`}
            >
              <h2 className="text-4xl mb-3">{item.icon}</h2>
              <h2 className="font-bold text-xl">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button onClick={OnGenerateTrip}>Generate Trip</Button>
      </div>
    </div>
  );
};

export default CreateTrip;
