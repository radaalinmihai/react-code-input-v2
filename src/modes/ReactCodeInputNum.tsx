import Input from "@components/Input";
import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { KeyPress } from "@interfaces/ICodeInputNum";

interface IProps {
	allowNegativeValues?: boolean;
}

const ReactCodeInputNum: FunctionComponent<IProps> = ({ allowNegativeValues = false }) => {
	const [value, setValue] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);

	const checkForNegativeValues = useCallback(
		(val: number) => {
			if (!allowNegativeValues && val > 0) {
				return val;
			}

			return 0;
		},
		[allowNegativeValues],
	);

	const handleKeyPress = useCallback((e: KeyboardEvent) => {
		switch (e.key as KeyPress) {
			case KeyPress.UP:
				setValue((prevNumber) => checkForNegativeValues(prevNumber + 1));
				break;
			case KeyPress.DOWN:
				setValue((prevNumber) => checkForNegativeValues(prevNumber - 1));
				break;
		}
	}, []);

	const handleSetValue = useCallback((value: string) => {
		setValue(~~value);
	}, []);

	useEffect(() => {
		inputRef.current?.addEventListener("keydown", handleKeyPress, false);

		return () => inputRef.current?.removeEventListener("keypress", handleKeyPress, false);
	}, []);

	return (
		<div className="react-code-input--num">
			<Input ref={inputRef} externalValue={value.toString()} onChange={handleSetValue} />
		</div>
	);
};

export default ReactCodeInputNum;
