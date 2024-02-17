"use client";

import useGeneralStore from "@store/general";
import { PageLayout } from "@components/layouts";

export default function Home() {
  const isSideBarOpen = useGeneralStore(state => state.isSideBarOpen);

  return (
    <PageLayout>
      <main className={`pt-6 pl-5 overflow-auto h-[calc(100svh-65px)] sm:h-[calc(100svh-81px)] md:h-[calc(100svh-89px)] ${isSideBarOpen ? "sm:w-[calc(100svw-250px)] md:w-[calc(100svw-300px)]" : "w-full"}`}>
        <div className="flex gap-6 w-svw">
          <div className="w-[280px] flex-shrink-0">
            <span className="flex items-center mb-6 gap-2 text-xs text-gray-828FA3 tracking-[2.4px] font-semibold"><span className="bg-[#49C4E5] w-[15px] h-[15px] rounded-full" /> TODO (4)</span>

            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Build UI for onboarding flow</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Build UI for onboarding flow</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Research pricing points of various competitors and trial different business models</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
          </div>
          <div className="w-[280px] flex-shrink-0">
            <span className="flex items-center mb-6 gap-2 text-xs text-gray-828FA3 tracking-[2.4px] font-semibold"><span className="bg-[#8471F2] w-[15px] h-[15px] rounded-full" /> DOING (6)</span>

            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Add account management endpoints</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Build UI for onboarding flow</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Build UI for onboarding flow</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Research pricing points of various competitors and trial different business models</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Build UI for onboarding flow</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
          </div>
          <div className="w-[280px] flex-shrink-0">
            <span className="flex items-center mb-6 gap-2 text-xs text-gray-828FA3 tracking-[2.4px] font-semibold"><span className="bg-[#67E2AE] w-[15px] h-[15px] rounded-full" /> DONE (4)</span>

            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Build UI for onboarding flow</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Build UI for onboarding flow</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Build UI for onboarding flow</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Research pricing points of various competitors and trial different business models</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Build UI for onboarding flow</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Build UI for onboarding flow</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Build UI for onboarding flow</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Build UI for onboarding flow</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
          </div>
          <div className="w-[280px] flex-shrink-0">
            <span className="flex items-center mb-6 gap-2 text-xs text-gray-828FA3 tracking-[2.4px] font-semibold"><span className="bg-[#49C4E5] w-[15px] h-[15px] rounded-full" /> TODO (4)</span>

            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Build UI for onboarding flow</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Build UI for onboarding flow</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Build UI for onboarding flow</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Research pricing points of various competitors and trial different business models</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Build UI for onboarding flow</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
          </div>
          <div className="w-[280px] flex-shrink-0">
            <span className="flex items-center mb-6 gap-2 text-xs text-gray-828FA3 tracking-[2.4px] font-semibold"><span className="bg-[#49C4E5] w-[15px] h-[15px] rounded-full" /> TODO (4)</span>

            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Build UI for onboarding flow</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Build UI for onboarding flow</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Build UI for onboarding flow</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Research pricing points of various competitors and trial different business models</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
            <div className="py-[23px] mb-5 bg-white-FFFFFF px-4 rounded-lg shadowx shadow-gray-E4EBFA shadow-lg">
              <h6 className="text-[15px] leading-[19px]">Build UI for onboarding flow</h6>
              <p className="text-xs text-gray-828FA3 mt-2">0 of 6 substasks</p>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
