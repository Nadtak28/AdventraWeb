import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GuidesService } from "../api/guidesService";
import { resetGuides } from "../hook/GuidesSlice";
import useInfiniteScroll from "./useInfiniteScroll";
import PageLayout from "./PageLayout";
import ContentContainer from "./contentContainer";
import SectionHeader from "./sectionHeader";
import GuideGrid from "./guideGrid";

const MainContent = () => {
  const dispatch = useDispatch();

  const {
    list: guides,
    loadingList,
    loadingMore,
    errorList,
    currentPage,
    lastPage,
    hasNextPage,
    total,
  } = useSelector((state) => state.guides);

  // Debug: Log state changes
  useEffect(() => {
    console.log("Guides State:", {
      guidesCount: guides.length,
      currentPage,
      lastPage,
      hasNextPage,
      total,
      loadingList,
      loadingMore,
    });
  }, [
    guides.length,
    currentPage,
    lastPage,
    hasNextPage,
    total,
    loadingList,
    loadingMore,
  ]);

  // Load more function for infinite scroll
  const loadMore = useCallback(() => {
    console.log("LoadMore called:", { hasNextPage, loadingMore, currentPage });
    if (hasNextPage && !loadingMore) {
      console.log("Dispatching next page:", currentPage + 1);
      dispatch(GuidesService({ page: currentPage + 1 }));
    }
  }, [dispatch, currentPage, hasNextPage, loadingMore]);

  // Use the infinite scroll hook
  const [isFetching] = useInfiniteScroll(
    loadMore,
    hasNextPage,
    loadingList || loadingMore
  );

  useEffect(() => {
    console.log("Initial load - resetting guides...");
    // Reset guides and load first page
    dispatch(resetGuides());
    dispatch(GuidesService({ page: 1 }));
  }, [dispatch]);

  return (
    <PageLayout>
      <ContentContainer>
        <SectionHeader
          title="Meet Our Guides"
          description="Our guides are passionate locals who bring their unique perspectives and expertise to every tour. Get to know the people who will make your journey unforgettable."
        />

        {/* Initial loading state */}
        {loadingList && guides.length === 0 && (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#519489]/20 border-t-[#519489] rounded-full animate-spin"></div>
              <div className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent border-t-[#519489]/50 rounded-full animate-spin animate-reverse"></div>
            </div>
          </div>
        )}

        {/* Error state */}
        {errorList && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 font-medium">{errorList}</p>
            </div>
          </div>
        )}

        {/* Guides grid */}
        {!errorList && guides.length > 0 && <GuideGrid guides={guides} />}

        {/* Loading more indicator */}
        {loadingMore && guides.length > 0 && (
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-4 border-[#519489]/20 border-t-[#519489] rounded-full animate-spin"></div>
              <span className="text-[#519489] font-medium">
                Loading more guides...
              </span>
            </div>
          </div>
        )}

        {/* Manual Load More Button for Testing */}
        {hasNextPage && !loadingMore && guides.length > 0 && (
          <div className="flex justify-center items-center py-12">
            <button
              onClick={loadMore}
              className="bg-[#519489] text-white px-6 py-3 rounded-lg hover:bg-[#519489]/80 transition-colors"
            >
              Load More (Page {currentPage + 1})
            </button>
          </div>
        )}
      </ContentContainer>
    </PageLayout>
  );
};

export default MainContent;
