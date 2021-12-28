export enum InputTimeMaxes {
	MAX_MS = 999,
	MAX_SECONDS = 59,
	MAX_MINUTES = 59,
	MAX_HOURS = 23,
	MAX_DAYS = 31,
}

export enum InputTimeTypes {
	MILLISECONDS = "MS",
	SECONDS = "SECONDS",
	MINUTES = "MINUTES",
	HOURS = "HOURS",
	DAYS = "DAYS",
}

export interface IInputTimeFields {
	DAYS?: boolean;
	HOURS?: boolean;
	MINUTES?: boolean;
	SECONDS?: boolean;
	MS?: boolean;
}

export interface IInputTimeDigitProps {
	onChange: (value: string) => void;
	value: string;
}

export interface IInputTimeHints {
	DAYS?: string;
	HOURS?: string;
	MINUTES?: string;
	SECONDS?: string;
	MS?: string;
}
