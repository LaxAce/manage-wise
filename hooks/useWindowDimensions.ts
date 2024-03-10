import { useState, useEffect } from "react";

import constants from "@constants/index";

const useWindowDimensions = () => {
	const [isMobile, setMobile] = useState(false);

	useEffect(() => {
		function handleResize() {
			setMobile(window.innerWidth < constants.maxMobileWidth);
		}

		handleResize();

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return { isMobile };
}

export default useWindowDimensions
