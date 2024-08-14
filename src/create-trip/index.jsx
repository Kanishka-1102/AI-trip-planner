import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import trip from '../assets/trip.png';
import tripAnimation from '../assets/trip.json';
import Lottie from 'lottie-react';
import '../App.css';
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const CreateTrip = () => {
  const [places, setPlaces] = useState([]);
  const [formData, setFormData] = useState({});
  const[open,SetOpen]=useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => setScriptLoaded(false);
      document.head.appendChild(script);
    };

    loadScript();
  }, []);

  const InputChange = (name, value) => {
    if (name === 'noOfDays') {
      value = parseInt(value, 10);
      if (isNaN(value)) value = ''; 
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const OnGenerateTrip = async () => {

    const user =localStorage.getItem('user');
    if(!user){
      SetOpen(true);
      return ;
    }
    if (formData?.noOfDays > 15 && !formData?.location || !formData?.budget || !formData?.traveller) {
      toast("Please Fill all Details");
      return;
    }
    toast("Form Generated");
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveller}', formData?.traveller)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays);
    try {
      console.log(FINAL_PROMPT);
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result?.response?.text());
    } catch (error) {
      console.error('Error sending message:', error);
      toast("An error occurred while generating the trip.");
    }
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
          {scriptLoaded ? (
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
              selectProps={{
                places,
                onChange: (v) => {
                  setPlaces(v);
                  InputChange('location', v.label);
                }
              }}
            />
          ) : (
            <p>Loading Google Places Autocomplete...</p>
          )}
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
              className={`p-6 border rounded-lg hover:shadow-lg cursor-pointer transition-shadow duration-300 transform hover:scale-105 ${formData?.budget === item.title && 'shadow-lg border-black'}`}
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
              className={`p-6 border rounded-lg hover:shadow-lg cursor-pointer transition-shadow duration-300 transform hover:scale-105 ${formData?.traveller === item.people && 'shadow-lg border-black'}`}
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
      <Dialog open={open}>
      <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogDescription>
        <img src='/logo.svg'/>
        <h2 > Sign in with Google</h2>
        <h2>Sign in into the app with google authentication</h2>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
