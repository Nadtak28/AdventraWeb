import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GuidesService } from "../api/guidesService"; // your thunk import

import PageLayout from "./PageLayout";
import ContentContainer from "./contentContainer";
import SectionHeader from "./sectionHeader";
import GuideGrid from "./guideGrid";

const MainContent = () => {
  const dispatch = useDispatch();

  const {
    list: guides,
    loadingList,
    errorList,
  } = useSelector((state) => state.guides);

  useEffect(() => {
    dispatch(GuidesService());
  }, [dispatch]);

  return (
    <PageLayout>
      <ContentContainer>
        <SectionHeader
          title="Meet Our Guides"
          description="Our guides are passionate locals who bring their unique perspectives and expertise to every tour. Get to know the people who will make your journey unforgettable."
        />

        {loadingList && (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#519489]/20 border-t-[#519489] rounded-full animate-spin"></div>
              <div className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent border-t-[#519489]/50 rounded-full animate-spin animate-reverse"></div>
            </div>
          </div>
        )}

        {errorList && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 font-medium">{errorList}</p>
            </div>
          </div>
        )}

        {!loadingList && !errorList && guides.length > 0 && (
          <GuideGrid guides={guides} />
        )}
      </ContentContainer>
    </PageLayout>
  );
};

export default MainContent;
