import {ChangeEventHandler} from "react";

export enum InputTypes {
	TEXT = 'text',
	NUM = 'num',
	TEL = 'tel',
	TIME = 'time',
}

export interface IInput {
	onChange: (value: number | string) => void;
	placeholder?: string;
	maxLength?: number;
	onlyNumeric?: boolean;
}

export interface IInputValue {
	value: string | number;
	disabled: boolean;
}
