import React, { FC } from "react";
import * as ReactDOM from "react-dom";
import "@styles/global.css";
import ReactCodeInputTime from "@modes/ReactCodeInputTime";

const ReactCodeInputV2: FC = () => {
	return (
		<ReactCodeInputTime
			hints={{
				DAYS: "Zile",
				HOURS: "Ore",
				MINUTES: "Minute",
			}}
			onChange={(time) => console.log("My best time:", time)}
			label="Durata"
		/>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<ReactCodeInputV2 />
	</React.StrictMode>,
	document.getElementById("root"),
);
