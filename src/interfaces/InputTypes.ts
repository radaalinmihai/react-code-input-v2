import {InputTimeMaxes, InputTimeTypes} from "./ICodeInputTime";

export enum InputTypes {
	TEXT = 'text',
	NUM = 'num',
	TEL = 'tel',
	TIME = 'time',
}

export interface IInput {
	onChange: (value: string) => void;
	onBlur?: (value: string) => void;
	placeholder?: string;
	maxLength?: number;
	onlyNumeric?: boolean;
	disabled?: boolean;
	defaultValue?: string;
	externalValue?: string;
}

export interface IInputValue {
	type: InputTimeTypes;
	value: string;
	max: InputTimeMaxes | number;
}
