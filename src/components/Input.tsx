import {ChangeEventHandler, FunctionComponent, useCallback, useEffect, useState} from "react";
import {IInput} from "../interfaces/InputTypes";
import {NUMBER_REG} from "../utilities/constants";

const Input: FunctionComponent<IInput> = ({onChange, placeholder, maxLength = 2, onlyNumeric = false}) => {
	const [value, setValue] = useState<number | string>('');
	const handleOnChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
		if(!(e.target.value.length <= maxLength)) {
			return;
		}
		if(onlyNumeric) {
			if(NUMBER_REG.test(e.target.value)) {
				setValue(parseInt(e.target.value) || '');
				return;
			}
			setValue('');
		}
		setValue(e.target.value || '');
	}, [onlyNumeric, maxLength]);
	useEffect(() => {
		onChange(value);
	}, [value]);
	return (
		<div className='react-code-input--container'>
			<input value={value} maxLength={maxLength} placeholder={placeholder} className='react-code-input--container-digit'
			       onChange={handleOnChange} type='text'/>
		</div>
	);
}

export default Input;
