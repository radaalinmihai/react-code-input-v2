import Input from "../components/Input";
import React, {Fragment, FunctionComponent, useCallback, useState} from "react";
import ReactCodeInputWrapper from "../components/ReactCodeInputWrapper";
import {IInputValue} from "../interfaces/InputTypes";

interface IProps {
	fieldsLength: number;
}

const ReactCodeInputTime: FunctionComponent<IProps> = ({fieldsLength}) => {
	const [values, setValues] = useState<IInputValue[]>(Array(fieldsLength).fill({
		value: '',
		disabled: false,
	}));
	const handleSetValues = useCallback((idx: number) => (value: string | number) => {
		setValues((prevValues) => prevValues.map((val, index) => {
			if(idx === index) {
				return {
					...val,
					value,
				}
			}
			return val;
		}));
	}, []);
	return (
		<ReactCodeInputWrapper>
			{values.map((val, idx) => (
				<Fragment key={`react-code-input-timer-${idx}`}>
					<Input placeholder='00' onlyNumeric onChange={handleSetValues(idx)}/>
					{idx !== values.length - 1 && <span className='react-code-input--separator'>:</span>}
				</Fragment>
			))}
		</ReactCodeInputWrapper>
	);
}

export default ReactCodeInputTime;
