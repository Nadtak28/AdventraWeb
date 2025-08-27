// Updated useInfiniteScroll hook with debugging
import { useState, useEffect, useCallback } from "react";

const useInfiniteScroll = (loadMore, hasNextPage, loading) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Debug logs
    console.log("Scroll Debug:", {
      scrollTop,
      windowHeight,
      docHeight,
      scrolledToBottom: scrollTop + windowHeight >= docHeight - 100,
      hasNextPage,
      loading,
      isFetching,
    });

    // Check if user has scrolled near the bottom (100px buffer)
    if (scrollTop + windowHeight >= docHeight - 100) {
      if (hasNextPage && !loading && !isFetching) {
        console.log("Triggering load more...");
        setIsFetching(true);
      }
    }
  }, [hasNextPage, loading, isFetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetching) return;

    console.log("Fetching more data...");
    const fetchMoreData = async () => {
      try {
        await loadMore();
        setIsFetching(false);
      } catch (error) {
        console.error("Error loading more data:", error);
        setIsFetching(false);
      }
    };

    fetchMoreData();
  }, [isFetching, loadMore]);

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
