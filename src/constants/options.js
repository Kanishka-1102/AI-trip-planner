export const SelectTravelList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveler in exploration',
        icon: '✈️',
        people: '1'
    },
    {
        id: 2,
        title: 'Two People or Couple',
        desc: 'Perfect for couples looking to explore together',
        icon: '❤️',
        people: '2'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'Ideal for families on an adventure',
        icon: '👨‍👩‍👧‍👦',
        people: '3 to 5'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'Great for groups of friends having fun',
        icon: '🥂',
        people: '5 to 10'
    }
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Affordable travel options for budget-conscious explorers',
        icon: '💸',
    },
    {
        id: 2,
        title: 'Mid-Range',
        desc: 'Comfortable and balanced options for most travelers',
        icon: '💵',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Premium experiences for those seeking indulgence',
        icon: '💎',
    }
];

export const AI_PROMPT='Genrate Trvel Plan for location: {location} for {totalDays} days for {traveller} with a {budget} buget . Give me a hotels options list with HostelName,HotelAddress,Price,Hotel image url,geo coordinates,rating,decriptions and suggest itinerary with placename ,Place details,Place image url ,geo coordinates,pricing,rating,time travel each of the loation for {totalDays} days with each day planwith the best time to visit in JSON format.'