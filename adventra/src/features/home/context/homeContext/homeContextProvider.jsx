import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HomeService } from "../../api/homeService";

import { LatestToursProvider } from "../latestTourContext";
import { TopEventsProvider } from "../topEventsContext";
import { FeaturedCitiesProvider } from "../featuredCitiesContext";
import { TopRatedGuidesProvider } from "../topRatedGuidesContext";
import { TopRatedGroupTripsProvider } from "../topRatedGroupTripsContext";
import { LatestEventsProvider } from "../latestEventsContext";
import { EventsByCategoryProvider } from "../eventsByCategoryContext";
import { GuidesByCategoryProvider } from "../guidesByCategoryContext";
import { EventWithOfferProvider } from "../eventWithOfferContext";
import { GroupTripWithOfferProvider } from "../groupTripWithOfferContext";
export default function HomeContextProvider({ children }) {
  const dispatch = useDispatch();

  const {
    latestGroupTrips,
    topRatedEvents,
    citiesWithMostEvents,
    topRatedGuides,
    topRatedGroupTrips,
    latestEvents,
    eventsByCategory,
    guidesByCategory,
    groupTripsWithOffer,
    eventWithOffer,
    status,
    error,
  } = useSelector((state) => state.home);

  useEffect(() => {
    if (status === "idle") {
      dispatch(HomeService());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <p>Loading home data...</p>;
  }

  if (status === "failed") {
    return <p>Error loading data: {error}</p>;
  }

  return (
    <LatestToursProvider value={latestGroupTrips}>
      <TopRatedGroupTripsProvider value={topRatedGroupTrips}>
        <TopEventsProvider value={topRatedEvents}>
          <LatestEventsProvider value={latestEvents}>
            <EventsByCategoryProvider value={eventsByCategory}>
              <FeaturedCitiesProvider value={citiesWithMostEvents}>
                <TopRatedGuidesProvider value={topRatedGuides}>
                  <GuidesByCategoryProvider value={guidesByCategory}>
                    <EventWithOfferProvider value={eventWithOffer}>
                      <GroupTripWithOfferProvider value={groupTripsWithOffer}>
                        {children}
                      </GroupTripWithOfferProvider>
                    </EventWithOfferProvider>
                  </GuidesByCategoryProvider>
                </TopRatedGuidesProvider>
              </FeaturedCitiesProvider>
            </EventsByCategoryProvider>
          </LatestEventsProvider>
        </TopEventsProvider>
      </TopRatedGroupTripsProvider>
    </LatestToursProvider>
  );
}
