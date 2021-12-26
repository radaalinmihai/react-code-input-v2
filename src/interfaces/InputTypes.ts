export enum InputTypes {
	TEXT = 'text',
	NUM = 'num',
	TEL = 'tel',
	TIME = 'time',
}

export enum InputTimeFields {
	MAX_MS = 1000,
	MAX_SECONDS = 60,
	MAX_MINUTES = 60,
	MAX_HOURS = 24,
	MAX_DAYS = 31
}

export interface IInput {
	onChange: (value: string) => void;
	placeholder?: string;
	maxLength?: number;
	onlyNumeric?: boolean;
	disabled?: boolean;
	defaultValue?: string;
}

export interface IInputValue {
	value: string;
	max: number;
}
