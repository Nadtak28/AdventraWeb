import React, { useState, useEffect } from "react";
import {
  Star,
  MapPin,
  Users,
  Bed,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  Waves,
  Utensils,
} from "lucide-react";

// Mock hotel data
const hotelsData = [
  {
    id: 1,
    name: "Grand Palace Hotel",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    rating: 5,
    city: "New York",
    description:
      "Experience luxury at its finest in the heart of Manhattan. Our Grand Palace Hotel offers unparalleled service, world-class amenities, and breathtaking views of the city skyline. Each room is meticulously designed to provide the ultimate comfort and sophistication.",
    amenities: [
      "Free WiFi",
      "Parking",
      "Restaurant",
      "Gym",
      "Pool",
      "Room Service",
    ],
  },
  {
    id: 2,
    name: "Ocean Breeze Resort",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
    rating: 4,
    city: "Miami",
    description:
      "Wake up to the sound of waves at our stunning beachfront resort. Ocean Breeze Resort combines tropical paradise with modern luxury, featuring private beach access, world-class spa services, and gourmet dining experiences.",
    amenities: [
      "Beach Access",
      "Spa",
      "Free WiFi",
      "Pool",
      "Restaurant",
      "Bar",
    ],
  },
  {
    id: 3,
    name: "Mountain View Lodge",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
    rating: 4,
    city: "Denver",
    description:
      "Nestled in the Rocky Mountains, our lodge offers a perfect retreat for nature lovers. Enjoy panoramic mountain views, hiking trails, and cozy fireplaces that create the perfect ambiance for relaxation.",
    amenities: [
      "Mountain Views",
      "Hiking",
      "Fireplace",
      "Free WiFi",
      "Restaurant",
      "Parking",
    ],
  },
  {
    id: 4,
    name: "City Central Hotel",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
    rating: 3,
    city: "Chicago",
    description:
      "Located in downtown Chicago, our hotel puts you at the center of everything. Modern accommodations, business facilities, and easy access to the city's best attractions make us the perfect choice for both business and leisure travelers.",
    amenities: [
      "City Center",
      "Business Center",
      "Free WiFi",
      "Restaurant",
      "Parking",
      "Gym",
    ],
  },
  {
    id: 5,
    name: "Sunset Paradise Hotel",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
    rating: 5,
    city: "Los Angeles",
    description:
      "Experience the glamour of Los Angeles at our iconic hotel. With stunning sunset views, luxury suites, and proximity to Hollywood attractions, we offer an unforgettable stay in the City of Angels.",
    amenities: [
      "City Views",
      "Luxury Suites",
      "Pool",
      "Spa",
      "Restaurant",
      "Valet Parking",
    ],
  },
  {
    id: 6,
    name: "Historic Charm Inn",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    rating: 4,
    city: "Boston",
    description:
      "Step back in time at our beautifully preserved historic inn. Rich in character and charm, we offer modern comfort within walls that tell stories of America's past.",
    amenities: [
      "Historic Building",
      "Free WiFi",
      "Restaurant",
      "Library",
      "Garden",
      "Parking",
    ],
  },
];

// Room categories data
const roomCategories = {
  "Single Room": {
    total: 15,
    rooms: [
      {
        id: 1,
        name: "Cozy Single",
        image:
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&h=200&fit=crop",
        reserved: false,
      },
      {
        id: 2,
        name: "Business Single",
        image:
          "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=300&h=200&fit=crop",
        reserved: true,
      },
      {
        id: 3,
        name: "Deluxe Single",
        image:
          "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=300&h=200&fit=crop",
        reserved: false,
      },
      {
        id: 4,
        name: "Premium Single",
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
        reserved: false,
      },
      {
        id: 5,
        name: "Garden View Single",
        image:
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=300&h=200&fit=crop",
        reserved: true,
      },
    ],
  },
  "Double Room": {
    total: 22,
    rooms: [
      {
        id: 6,
        name: "Standard Double",
        image:
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=300&h=200&fit=crop",
        reserved: false,
      },
      {
        id: 7,
        name: "Superior Double",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
        reserved: false,
      },
      {
        id: 8,
        name: "Deluxe Double",
        image:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
        reserved: true,
      },
      {
        id: 9,
        name: "Premium Double",
        image:
          "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=300&h=200&fit=crop",
        reserved: false,
      },
      {
        id: 10,
        name: "Sea View Double",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop",
        reserved: false,
      },
    ],
  },
  "Triple Room": {
    total: 12,
    rooms: [
      {
        id: 11,
        name: "Family Triple",
        image:
          "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=300&h=200&fit=crop",
        reserved: false,
      },
      {
        id: 12,
        name: "Spacious Triple",
        image:
          "https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=300&h=200&fit=crop",
        reserved: true,
      },
      {
        id: 13,
        name: "Modern Triple",
        image:
          "https://images.unsplash.com/photo-1540518614846-7eded24775ab?w=300&h=200&fit=crop",
        reserved: false,
      },
      {
        id: 14,
        name: "Deluxe Triple",
        image:
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=300&h=200&fit=crop",
        reserved: false,
      },
    ],
  },
  Suite: {
    total: 8,
    rooms: [
      {
        id: 15,
        name: "Presidential Suite",
        image:
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=300&h=200&fit=crop",
        reserved: true,
      },
      {
        id: 16,
        name: "Executive Suite",
        image:
          "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=300&h=200&fit=crop",
        reserved: false,
      },
      {
        id: 17,
        name: "Honeymoon Suite",
        image:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
        reserved: false,
      },
      {
        id: 18,
        name: "Penthouse Suite",
        image:
          "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=300&h=200&fit=crop",
        reserved: true,
      },
    ],
  },
  "Family Room": {
    total: 18,
    rooms: [
      {
        id: 19,
        name: "Standard Family",
        image:
          "https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=300&h=200&fit=crop",
        reserved: false,
      },
      {
        id: 20,
        name: "Large Family",
        image:
          "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=300&h=200&fit=crop",
        reserved: false,
      },
      {
        id: 21,
        name: "Deluxe Family",
        image:
          "https://images.unsplash.com/photo-1540518614846-7eded24775ab?w=300&h=200&fit=crop",
        reserved: true,
      },
      {
        id: 22,
        name: "Premium Family",
        image:
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=300&h=200&fit=crop",
        reserved: false,
      },
    ],
  },
  Studio: {
    total: 10,
    rooms: [
      {
        id: 23,
        name: "Modern Studio",
        image:
          "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=300&h=200&fit=crop",
        reserved: false,
      },
      {
        id: 24,
        name: "Luxury Studio",
        image:
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=300&h=200&fit=crop",
        reserved: true,
      },
      {
        id: 25,
        name: "Designer Studio",
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
        reserved: false,
      },
    ],
  },
};

const MainContent = () => {
  const [currentPage, setCurrentPage] = useState("hotels");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Single Room");
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleHotelClick = (hotel) => {
    setSelectedHotel(hotel);
    setFadeIn(false);
    setTimeout(() => {
      setCurrentPage("hotel-detail");
      setFadeIn(true);
    }, 300);
  };

  const handleBackToHotels = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentPage("hotels");
      setSelectedHotel(null);
      setFadeIn(true);
    }, 300);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case "free wifi":
        return <Wifi size={16} />;
      case "parking":
        return <Car size={16} />;
      case "restaurant":
        return <Utensils size={16} />;
      case "gym":
        return <Dumbbell size={16} />;
      case "pool":
        return <Waves size={16} />;
      case "room service":
        return <Coffee size={16} />;
      default:
        return <Coffee size={16} />;
    }
  };

  if (currentPage === "hotels") {
    return (
      <div
        className={`min-h-screen bg-white transition-all duration-500 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#519489] to-[#6ba89e] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4 animate-pulse">
              Discover Amazing Hotels
            </h1>
            <p className="text-xl opacity-90">
              Find your perfect stay with unbeatable comfort and service
            </p>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotelsData.map((hotel, index) => (
              <div
                key={hotel.id}
                onClick={() => handleHotelClick(hotel)}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden group animate-fade-in-up`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "both",
                }}
              >
                {/* Hotel Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 bg-[#519489] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                </div>

                {/* Hotel Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#519489] transition-colors duration-300">
                    {hotel.name}
                  </h3>

                  <div className="flex items-center mb-3">
                    <div className="flex mr-2">{renderStars(hotel.rating)}</div>
                    <span className="text-sm text-gray-600">
                      ({hotel.rating}.0)
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-2 text-[#519489]" />
                    <span>{hotel.city}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-[#519489] font-semibold">
                      From $129/night
                    </div>
                    <div className="bg-[#519489] text-white px-4 py-2 rounded-lg group-hover:bg-[#4a8680] transition-colors duration-300">
                      View Details
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-white transition-all duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Back Button */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-40">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={handleBackToHotels}
            className="flex items-center text-[#519489] hover:text-[#4a8680] transition-colors duration-300"
          >
            <span className="mr-2">←</span>
            Back to Hotels
          </button>
        </div>
      </div>

      {/* Hotel Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={selectedHotel?.image}
          alt={selectedHotel?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold mb-2">{selectedHotel?.name}</h1>
            <div className="flex items-center mb-2">
              <div className="flex mr-3">
                {renderStars(selectedHotel?.rating)}
              </div>
              <span className="text-lg">({selectedHotel?.rating}.0 stars)</span>
            </div>
            <div className="flex items-center text-lg">
              <MapPin size={20} className="mr-2" />
              <span>{selectedHotel?.city}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Description */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              About This Hotel
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {selectedHotel?.description}
            </p>

            {/* Amenities */}
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {selectedHotel?.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div className="text-[#519489] mr-3">
                    {getAmenityIcon(amenity)}
                  </div>
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Room Categories */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Available Rooms
            </h2>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
              {Object.keys(roomCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 font-semibold rounded-t-lg transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-[#519489] text-white border-b-2 border-[#519489]"
                      : "text-gray-600 hover:text-[#519489] hover:bg-gray-50"
                  }`}
                >
                  {category}
                  <span className="ml-2 text-sm opacity-75">
                    ({roomCategories[category].total} total)
                  </span>
                </button>
              ))}
            </div>

            {/* Room Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roomCategories[selectedCategory].rooms.map((room, index) => (
                <div
                  key={room.id}
                  className={`bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden animate-fade-in-up`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: "both",
                  }}
                >
                  <div className="relative">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-48 object-cover"
                    />
                    <div
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold ${
                        room.reserved
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {room.reserved ? "Reserved" : "Available"}
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      {room.name}
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="text-[#519489] font-semibold">
                        $89/night
                      </div>
                      <button
                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                          room.reserved
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-[#519489] text-white hover:bg-[#4a8680]"
                        }`}
                        disabled={room.reserved}
                      >
                        {room.reserved ? "Reserved" : "Book Now"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Category Summary */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    {selectedCategory} Summary
                  </h4>
                  <p className="text-gray-600">
                    Total rooms: {roomCategories[selectedCategory].total} |
                    Available:{" "}
                    {
                      roomCategories[selectedCategory].rooms.filter(
                        (room) => !room.reserved
                      ).length
                    }{" "}
                    | Reserved:{" "}
                    {
                      roomCategories[selectedCategory].rooms.filter(
                        (room) => room.reserved
                      ).length
                    }
                  </p>
                </div>
                <div className="text-2xl font-bold text-[#519489]">
                  {Math.round(
                    (roomCategories[selectedCategory].rooms.filter(
                      (room) => !room.reserved
                    ).length /
                      roomCategories[selectedCategory].total) *
                      100
                  )}
                  % Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MainContent;
