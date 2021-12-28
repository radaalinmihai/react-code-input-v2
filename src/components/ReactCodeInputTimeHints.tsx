import { IInputTimeFields, IInputTimeHints, InputTimeTypes } from "@interfaces/ICodeInputTime";
import { FunctionComponent, useCallback } from "react";

interface IProps {
	fields: IInputTimeFields;
	hints: IInputTimeHints;
}

const ReactCodeInputTimeHints: FunctionComponent<IProps> = ({ fields, hints }) => {
	const renderHintText = useCallback(
		(hintEnabled: boolean, defaultValue: InputTimeTypes, idx: number) => {
			if (hintEnabled) {
				if (hints[defaultValue]) {
					return <span key={`field-hint-${idx}`}>{hints[defaultValue]}</span>;
				}

				return <span key={`field-hint-${idx}`}>{defaultValue}</span>;
			}

			return null;
		},
		[hints],
	);
	console.log(hints);

	return (
		<div className="react-code-input--hints">
			{Object.entries(fields).map((field, idx) => renderHintText(field[1], field[0] as InputTimeTypes, idx))}
		</div>
	);
};

export default ReactCodeInputTimeHints;
