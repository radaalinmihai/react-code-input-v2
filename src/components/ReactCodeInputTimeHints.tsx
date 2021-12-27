import {IInputTimeFields} from "../interfaces/ICodeInputTime";
import {FunctionComponent} from "react";

interface IProps {
	fields: IInputTimeFields;
}

const ReactCodeInputTimeHints: FunctionComponent<IProps> = ({fields}) => {
	return (
		<div className='react-code-input--hints'>
			<span>days</span>
			<span>hours</span>
			<span>minutes</span>
		</div>
	);
}

export default ReactCodeInputTimeHints;
