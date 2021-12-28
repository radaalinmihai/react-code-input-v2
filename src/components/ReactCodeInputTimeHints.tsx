import {IInputTimeFields} from "@interfaces/ICodeInputTime";
import {FunctionComponent} from "react";

interface IProps {
	fields: IInputTimeFields;
}

const ReactCodeInputTimeHints: FunctionComponent<IProps> = ({fields}) => {
	return (
		<div className='react-code-input--hints'>
			{Object.entries(fields).map((field, idx) => field[1] && (
				<span key={`field-hint-${idx}`}>{field[0]}</span>
			))}
		</div>
	);
}

export default ReactCodeInputTimeHints;
