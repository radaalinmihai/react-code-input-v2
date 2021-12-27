import React, {FC} from "react";
import * as ReactDOM from "react-dom";
import "./styles/global.css";
import ReactCodeInputTime from "./modes/ReactCodeInputTime";

const ReactCodeInputV2: FC = () => {
	return (
		<ReactCodeInputTime onChange={(time) => console.log("My best time:", time)} label='Duration'/>
	);
}

ReactDOM.render(<React.StrictMode><ReactCodeInputV2/></React.StrictMode>, document.getElementById('root'));
