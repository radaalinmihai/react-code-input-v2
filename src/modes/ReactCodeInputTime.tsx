import Input from "@components/Input";
import { Fragment, FunctionComponent, useCallback, useEffect, useMemo, useState } from "react";
import ReactCodeInputWrapper from "@components/ReactCodeInputWrapper";
import { IInputValue } from "@interfaces/InputTypes";
import { addTrailingZero, createEmptyTimes } from "@utilities/helpers";
import { IInputTimeDigitProps, IInputTimeFields, IInputTimeHints, InputTimeTypes } from "@interfaces/ICodeInputTime";
import ReactCodeInputTimeHints from "@components/ReactCodeInputTimeHints";
import clsx from "clsx";

interface IProps {
	label?: string;
	fields?: IInputTimeFields;
	renderDigit?: (props: IInputTimeDigitProps, idx: number) => JSX.Element;
	renderSeparator?: (idx: number) => JSX.Element;
	disabled?: boolean;
	onChange?: (time: number) => void;
	digitClassNames?: string;
	containerClassNames?: string;
	inputContainerClassNames?: string;
	digitPlaceholder?: string;
	hints?: IInputTimeHints;
}

const ReactCodeInputTime: FunctionComponent<IProps> = ({
	label = "",
	disabled,
	fields = {
		[InputTimeTypes.DAYS]: true,
		[InputTimeTypes.HOURS]: true,
		[InputTimeTypes.MINUTES]: true,
		[InputTimeTypes.SECONDS]: false,
		[InputTimeTypes.MILLISECONDS]: false,
	},
	onChange,
	renderDigit,
	digitClassNames = "",
	containerClassNames = "",
	inputContainerClassNames = "",
	renderSeparator,
	digitPlaceholder = "",
	hints = {
		SECONDS: InputTimeTypes.SECONDS,
		DAYS: InputTimeTypes.DAYS,
		MINUTES: InputTimeTypes.MINUTES,
		HOURS: InputTimeTypes.HOURS,
		MS: InputTimeTypes.MILLISECONDS,
	},
}) => {
	const [values, setValues] = useState<IInputValue[]>(createEmptyTimes(fields));
	const handleSetValues = useCallback(
		(idx: number) => (value: string) => {
			setValues((prevValues) =>
				prevValues.map((val, index) => {
					if (idx === index) {
						if (parseInt(value) > val.max) {
							return {
								...val,
								value: addTrailingZero(val.max.toString()),
							};
						}

						return {
							...val,
							value,
						};
					}

					return val;
				}),
			);
		},
		[],
	);

	const handleOnBlur = useCallback(
		(idx: number) => (value: string) => {
			handleSetValues(idx)(addTrailingZero(value));
		},
		[],
	);

	useEffect(() => {
		if (onChange) {
			onChange(
				values.reduce((total, time) => {
					const timeAsNumber = parseInt(time.value);
					if (timeAsNumber) {
						return total + timeAsNumber * time.convertValue;
					}

					return total;
				}, 0),
			);
		}
	}, [values]);

	const renderDefaultDigit = useCallback(
		(value: string, idx: number) => {
			return (
				<Input
					className={digitClassNames}
					onBlur={handleOnBlur(idx)}
					externalValue={value}
					placeholder={digitPlaceholder || "00"}
					disabled={disabled}
					onlyNumeric
					onChange={handleSetValues(idx)}
				/>
			);
		},
		[handleOnBlur, handleSetValues, digitClassNames, digitPlaceholder],
	);

	const renderDefaultSeparator = useCallback(
		(idx: number) => {
			if (idx !== values.length - 1) {
				return <span className="react-code-input--separator">:</span>;
			}

			return null;
		},
		[values.length],
	);

	const handleRenderSeparator = useCallback(
		(idx: number) => {
			if (renderSeparator) {
				return renderSeparator(idx);
			}

			return renderDefaultSeparator(idx);
		},
		[renderSeparator],
	);

	const handleRenderDigit = useCallback((value: string, idx: number) => {
		if (renderDigit) {
			return renderDigit({ value, onChange: handleSetValues(idx) }, idx);
		}

		return renderDefaultDigit(value, idx);
	}, []);

	return (
		<div className={clsx("react-code-input--wrapper", containerClassNames)}>
			{label && <div className="react-code-input--label">{label}</div>}
			<ReactCodeInputWrapper className={inputContainerClassNames} disabled={disabled}>
				{values.map((val, idx) => (
					<Fragment key={`react-code-input-time-${idx}`}>
						{handleRenderDigit(val.value, idx)}
						{handleRenderSeparator(idx)}
					</Fragment>
				))}
			</ReactCodeInputWrapper>
			<ReactCodeInputTimeHints hints={hints} fields={fields} />
		</div>
	);
};

export default ReactCodeInputTime;
