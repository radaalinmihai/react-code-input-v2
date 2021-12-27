import Input from "../components/Input";
import React, {Fragment, FunctionComponent, useCallback, useEffect, useState} from "react";
import ReactCodeInputWrapper from "../components/ReactCodeInputWrapper";
import {IInputValue} from "../interfaces/InputTypes";
import {addTrailingZero, createEmptyTimes} from "../utilities/helpers";
import {IInputTimeFields, InputTimeTypes} from "../interfaces/ICodeInputTime";
import ReactCodeInputTimeHints from "../components/ReactCodeInputTimeHints";

interface IProps {
	label?: string;
	fields?: IInputTimeFields;
	disabled?: boolean;
	onChange?: (time: number) => void;
}

const ReactCodeInputTime: FunctionComponent<IProps> = ({
	                                                       label = '', disabled, fields = {
		[InputTimeTypes.DAYS]: true,
		[InputTimeTypes.HOURS]: true,
		[InputTimeTypes.MINUTES]: true,
		[InputTimeTypes.SECONDS]: false,
		[InputTimeTypes.MILLISECONDS]: false,
	},
	                                                       onChange
                                                       }) => {
	const [values, setValues] = useState<IInputValue[]>(createEmptyTimes(fields));
	const handleSetValues = useCallback((idx: number) => (value: string) => {
		setValues((prevValues) => prevValues.map((val, index) => {
			if(idx === index) {
				if(parseInt(value) > val.max) {
					return {
						...val,
						value: addTrailingZero(val.max.toString())
					}
				}
				return {
					...val,
					value,
				}
			}
			return val;
		}));
	}, []);

	const handleOnBlur = useCallback((idx: number) => (value: string) => {
		handleSetValues(idx)(addTrailingZero(value));
	}, []);

	useEffect(() => {
		if(onChange) {
			onChange(values.reduce((total, time) => {
				const timeAsNumber = parseInt(time.value);
				if(timeAsNumber) {
					return total + timeAsNumber * time.convertValue;
				}
				return total;
			}, 0));
		}
	}, [values]);

	return (
		<div className='react-code-input--wrapper'>
			{label && <div className='react-code-input--label'>{label}</div>}
			<ReactCodeInputWrapper disabled={disabled}>
				{values.map((val, idx) => (
					<Fragment key={`react-code-input-time-${idx}`}>
						<Input onBlur={handleOnBlur(idx)} externalValue={val.value} placeholder='00' disabled={disabled}
						       onlyNumeric
						       onChange={handleSetValues(idx)}/>
						{idx !== values.length - 1 && <span className='react-code-input--separator'>:</span>}
					</Fragment>
				))}
			</ReactCodeInputWrapper>
			<ReactCodeInputTimeHints fields={fields}/>
		</div>
	);
}

export default ReactCodeInputTime;
