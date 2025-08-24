import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateFilter, clearAllFilters } from "../../../hooks/searchSlice";
import { SearchService } from "../../../api/searchService";
import { useLatestTours } from "../context/latestTourContext";
import { useTopRatedGroupTrips } from "../context/topRatedGroupTripsContext";
import { useTopEvents } from "../context/topEventsContext";
import { useLatestEvents } from "../context/latestEventsContext";
import { useFeaturedCities } from "../context/featuredCitiesContext";
import { useTopRatedGuides } from "../context/topRatedGuidesContext";
import { useEventsByCategory } from "../context/eventsByCategoryContext";
import { useEventWithOffer } from "../context/eventWithOfferContext";
import { useGroupTripWithOffer } from "../context/groupTripWithOfferContext";
import { useGuidesByCategory } from "../context/guidesByCategoryContext";
import SearchBar from "./mainContent/searchBar";
import EnhancedOfferSlider from "./mainContent/offerSlider";
import GuideCard from "./mainContent/guideCard";
import EventsGrid from "./mainContent/eventsGrid";
import ToursSection from "./mainContent/tourSection";
import CitiesSection from "./mainContent/citySection";
import LatestEventsSection from "./mainContent/latestEventsSection";
import TopEventsSection from "./mainContent/topEventSection";
import EnhancedTabNavigation from "./mainContent/enhancedNavigation";
import TopRatedGuideTitle from "./mainContent/topRatedGuideTitle";
import TopRatedGuideCard from "./mainContent/topRatedGuideCard";

export default function MainContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const latestTours = useLatestTours();
  const topRatedTours = useTopRatedGroupTrips();
  const topEvents = useTopEvents();
  const latestevents = useLatestEvents();
  const featuredCities = useFeaturedCities();
  const topRatedGuides = useTopRatedGuides();
  const eventsByCategory = useEventsByCategory();
  const guidesByCategory = useGuidesByCategory();
  const eventWithOffer = useEventWithOffer();
  const tourWithOffer = useGroupTripWithOffer();

  // Set initial categories (remove "All" and use first category as default)
  const eventCategories = eventsByCategory.map((cat) => cat.name);
  const guideCategories = guidesByCategory.map((cat) => cat.name);

  const [selectedCategory, setSelectedCategory] = useState(
    eventCategories[0] || ""
  );
  const [selectedGuideCategory, setSelectedGuideCategory] = useState(
    guideCategories[0] || ""
  );

  // Update selected categories when data loads
  useEffect(() => {
    if (eventCategories.length > 0 && !selectedCategory) {
      setSelectedCategory(eventCategories[0]);
    }
  }, [eventCategories]);

  useEffect(() => {
    if (guideCategories.length > 0 && !selectedGuideCategory) {
      setSelectedGuideCategory(guideCategories[0]);
    }
  }, [guideCategories]);

  const transformedLatestTours = latestTours.map((tour) => ({
    ...tour,
    title: tour.name,
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
  }));

  const transformedTopRatedTours = topRatedTours.map((tour) => ({
    ...tour,
    title: tour.name,
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
  }));

  const transformedFeaturedCities = featuredCities.map((city) => ({
    ...city,
    title: city.name,
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
  }));

  const transformedLatestEvents = latestevents.map((event) => ({
    ...event,
    title: event.name,
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
  }));

  const transformedTopEvents = topEvents.map((event) => ({
    ...event,
    title: event.name,
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
  }));

  // Compute filtered events for the CardList under tabs
  const getFilteredEvents = () => {
    if (!selectedCategory || eventCategories.length === 0) return [];

    const categoryObj = eventsByCategory.find(
      (cat) => cat.name === selectedCategory
    );

    return categoryObj
      ? categoryObj.events.map((event) => ({
          id: event.id,
          title: event.name,
          description: event.description,
          image:
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
        }))
      : [];
  };

  const filteredEvents = getFilteredEvents();

  // Process guides
  const allGuides = guidesByCategory.flatMap((cat) => cat.guides);
  const uniqueGuidesMap = new Map();
  for (const guide of allGuides) {
    if (!uniqueGuidesMap.has(guide.id)) {
      uniqueGuidesMap.set(guide.id, guide);
    }
  }
  const uniqueGuides = Array.from(uniqueGuidesMap.values());

  const getFilteredGuides = () => {
    if (!selectedGuideCategory || guideCategories.length === 0) {
      return uniqueGuides.map((guide) => ({
        id: guide.id,
        title: guide.name,
        description: guide.description,
        image:
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      }));
    }

    return uniqueGuides
      .filter((guide) =>
        guide.categories?.some((cat) => cat.name === selectedGuideCategory)
      )
      .map((guide) => ({
        id: guide.id,
        title: guide.name,
        description: guide.description,
        image:
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      }));
  };

  const filteredGuides = getFilteredGuides();

  // Handle View More for Events
  // Fixed handleEventViewMore function
  // Fixed handleEventViewMore function
  const handleEventViewMore = async () => {
    try {
      dispatch(clearAllFilters());

      dispatch(
        updateFilter({
          filterType: "types",
          value: { id: "event", name: "event", label: "Events" },
        })
      );

      // ✅ define it first
      let categoryId = null;

      if (selectedCategory && eventCategories.includes(selectedCategory)) {
        const categoryObj = eventsByCategory.find(
          (cat) => cat.name === selectedCategory
        );
        if (categoryObj) {
          categoryId = categoryObj.id; // assign here
          dispatch(
            updateFilter({
              filterType: "categories",
              value: { id: categoryObj.id, name: categoryObj.name },
            })
          );
        }
      }

      dispatch(updateFilter({ filterType: "order_type", value: "DESC" }));
      dispatch(updateFilter({ filterType: "orderBy", value: "created_at" }));

      // ✅ Now it’s always in scope
      const searchFilters = {
        types: ["event"],
        categories: categoryId ? [categoryId] : [],
        order_type: "DESC",
        orderBy: "created_at",
      };

      await dispatch(SearchService(searchFilters));
      navigate("/filter-results");
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  // Fixed handleGuideViewMore function
  const handleGuideViewMore = async () => {
    try {
      // Clear previous filters
      dispatch(clearAllFilters());

      // Always set guide type
      dispatch(
        updateFilter({
          filterType: "types",
          value: { id: "guide", name: "guide", label: "Guides" },
        })
      );

      // Resolve category object if valid
      let categoryObj = null;
      if (
        selectedGuideCategory &&
        guideCategories.includes(selectedGuideCategory)
      ) {
        categoryObj = guidesByCategory.find(
          (cat) => cat.name === selectedGuideCategory
        );
        if (categoryObj) {
          dispatch(
            updateFilter({
              filterType: "categories",
              value: { id: categoryObj.id, name: categoryObj.name },
            })
          );
        }
      }

      // Set sorting preferences
      dispatch(updateFilter({ filterType: "order_type", value: "DESC" }));
      dispatch(updateFilter({ filterType: "orderBy", value: "created_at" }));

      // Build search filters for API
      const searchFilters = {
        types: ["guide"],
        categories: categoryObj ? [categoryObj.id] : [],
        order_type: "DESC",
        orderBy: "id", // using "id" here for backend consistency
      };

      // Trigger search and navigate
      await dispatch(SearchService(searchFilters));
      navigate("/filter-results");
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  function handleEventClick(event) {
    navigate(`/events/${event.id}`);
  }

  function handleTourClick(tour) {
    navigate(`/tours/${tour.id}`);
  }

  function handleCityClick(city) {
    navigate(`/cities/${city.id}`);
  }

  function handleGuideClick(guide) {
    navigate(`/guides/${guide.id}`);
  }

  return (
    <main className="bg-white dark:bg-[#1a1f2e] min-h-screen">
      <div className="w-full max-w-7xl mx-auto py-8">
        <SearchBar placeholder="Search for tours, events, and more" />

        <EnhancedOfferSlider
          title="Event Special Deals"
          items={eventWithOffer}
          onItemClick={handleEventClick}
          type="event"
        />

        <ToursSection
          title="Latest Group Tours"
          tours={transformedLatestTours}
          onTourClick={handleTourClick}
          className="animate-fade-in"
          sectionType="latest"
        />

        {/* Events by Category Section */}
        <section className="px-4 sm:px-6 md:px-8 pt-8 pb-8">
          <div className="flex items-center mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-[#519489] to-[#6ba89d] rounded-full mr-4" />
            <h2 className="text-[#101918] dark:text-white dark:bg-gradient-to-r dark:from-white dark:via-[#6ba59b] dark:to-[#519489] dark:bg-clip-text dark:text-transparent text-2xl md:text-3xl font-bold">
              Events by Category
            </h2>
          </div>

          <EnhancedTabNavigation
            categories={eventCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onViewMore={handleEventViewMore}
          />

          <EventsGrid items={filteredEvents} onItemClick={handleEventClick} />
        </section>

        <LatestEventsSection
          title="Latest Events"
          events={transformedLatestEvents}
          onEventClick={handleEventClick}
          className="animate-scale-up"
        />

        <CitiesSection
          title="Featured Cities"
          cities={transformedFeaturedCities}
          onCityClick={handleCityClick}
          className="animate-zoom-in-up"
        />

        <EnhancedOfferSlider
          title="Special Tour Offers"
          items={tourWithOffer}
          onItemClick={handleTourClick}
          type="tour"
        />

        {/* Guides by Category Section */}
        <section className="px-4 sm:px-6 md:px-8 pt-8 pb-8">
          <div className="flex items-center mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-[#519489] to-[#6ba89d] rounded-full mr-4" />
            <h2 className="text-[#101918] dark:text-white dark:bg-gradient-to-r dark:from-white dark:via-[#6ba59b] dark:to-[#519489] dark:bg-clip-text dark:text-transparent text-2xl md:text-3xl font-bold">
              Guides by Category
            </h2>
          </div>

          <EnhancedTabNavigation
            categories={guideCategories}
            selectedCategory={selectedGuideCategory}
            onSelectCategory={setSelectedGuideCategory}
            onViewMore={handleGuideViewMore}
          />

          <div className="overflow-x-auto">
            <div className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide pb-4 px-2">
              {filteredGuides.map((guide, index) => (
                <div
                  key={guide.id}
                  className="min-w-[250px] dark:from-gray-800 dark:to-gray-900 flex-shrink-0"
                >
                  <GuideCard
                    guide={guide}
                    onClick={handleGuideClick}
                    delay={index * 100}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <ToursSection
          title="Top Rated Tours"
          tours={transformedTopRatedTours}
          onTourClick={handleTourClick}
          className="animate-scale-up"
          sectionType="top-rated"
        />

        <TopEventsSection
          title="Top-Rated Events"
          events={transformedTopEvents}
          onEventClick={handleEventClick}
          className="animate-slide-left bg-white"
        />

        <section className="px-4 sm:px-6 md:px-8 pt-8 pb-8">
          <TopRatedGuideTitle />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {topRatedGuides.map((guide, index) => (
              <TopRatedGuideCard
                key={guide.id}
                guide={guide}
                onClick={handleGuideClick}
                delay={index * 150}
              />
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-left {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-right {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scale-up {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes zoom-in-up {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(30px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.7s ease-out forwards;
        }
        .animate-slide-left {
          animation: slide-left 0.7s ease-out forwards;
        }
        .animate-slide-right {
          animation: slide-right 0.7s ease-out forwards;
        }
        .animate-scale-up {
          animation: scale-up 0.7s ease-out forwards;
        }
        .animate-zoom-in-up {
          animation: zoom-in-up 0.7s ease-out forwards;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}
