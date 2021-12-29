import React, { FunctionComponent } from "react";
import * as ReactDOM from "react-dom";
import "@styles/global.css";
import ReactCodeInputTime from "@modes/ReactCodeInputTime";
import { InputTypes } from "@interfaces/InputTypes";
import ReactCodeInputNum from "@modes/ReactCodeInputNum";

type IProps = {
	type?: InputTypes;
};

const ReactCodeInputV2: FunctionComponent<IProps> = ({ type }) => {
	if (type === InputTypes.TIME) {
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
	}

	if (type === InputTypes.NUM) {
		return <ReactCodeInputNum />;
	}

	return null;
};

ReactDOM.render(
	<React.StrictMode>
		<ReactCodeInputV2 type={InputTypes.NUM} />
	</React.StrictMode>,
	document.getElementById("root"),
);
