import Input from "../components/Input";
import React, {Fragment, FunctionComponent, useCallback, useEffect, useState} from "react";
import ReactCodeInputWrapper from "../components/ReactCodeInputWrapper";
import {IInputValue} from "../interfaces/InputTypes";
import {addTrailingZero} from "../utilities/helpers";
import {MAX_TIME_FIELDS} from "../utilities/constants";

interface IProps {
	label?: string;
	fieldsLength: number;
	disabled?: boolean;
}

const ReactCodeInputTime: FunctionComponent<IProps> = ({label = '', fieldsLength, disabled}) => {
	const [values, setValues] = useState<IInputValue[]>([]);
	const handleSetValues = useCallback((idx: number) => (value: string) => {
		setValues((prevValues) => prevValues.map((val, index) => {
			if(idx === index) {
				if(!(parseInt(value) < val.max)) {
					return val;
				}
				return {
					...val,
					value: addTrailingZero(value),
				}
			}
			return val;
		}));
	}, []);

	useEffect(() => {
		const maxFields = fieldsLength > MAX_TIME_FIELDS ? MAX_TIME_FIELDS : fieldsLength;
		if(fieldsLength > MAX_TIME_FIELDS) {
			console.warn(`Fields are longer than the maximum allowed, which is ${MAX_TIME_FIELDS}. Fields have been reduced to the maximum allowed`);
		}
		setValues(Array(maxFields).fill({
			value: '',
			max: 0
		}));
		console.log(maxFields);
	}, [fieldsLength]);

	return (
		<>
			{label && <div className='react-code-input--label'>{label}</div>}
			<ReactCodeInputWrapper disabled={disabled}>
				{values.map((val, idx) => (
					<Fragment key={`react-code-input-time-${idx}`}>
						<Input defaultValue='00' disabled={disabled} onlyNumeric
						       onChange={handleSetValues(idx)}/>
						{idx !== values.length - 1 && <span className='react-code-input--separator'>:</span>}
					</Fragment>
				))}
			</ReactCodeInputWrapper>
		</>
	);
}

export default ReactCodeInputTime;
