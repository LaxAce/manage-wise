import { NavBar, SideBar } from "@components/layouts";
import { PageLayoutProps } from "@components/layouts/types";

const PageLayout = ({ children }: PageLayoutProps) => {
    return (
        <main className="flex relative w-full items-start">
            <div>
                <SideBar />
            </div>
            <div className="w-full">
                <NavBar />
                <div className="bg-white-F4F7FD w-full h-svh pt-[62px] sm:pt-[80px] md:pt-[89px]">
                    {children}
                </div>
            </div>
        </main>
    );
}

export default PageLayout;