export enum InputTimeMaxes {
	MAX_MS = 999,
	MAX_SECONDS = 59,
	MAX_MINUTES = 59,
	MAX_HOURS = 23,
	MAX_DAYS = 31
}

export enum InputTimeTypes {
	MILLISECONDS = "MS",
	SECONDS = "SECONDS",
	MINUTES = "MINUTES",
	HOURS = "HOURS",
	DAYS = "DAYS",
}

export interface IInputTimeFields {
	[InputTimeTypes.DAYS]: boolean;
	[InputTimeTypes.HOURS]: boolean;
	[InputTimeTypes.MINUTES]: boolean;
	[InputTimeTypes.SECONDS]: boolean;
	[InputTimeTypes.MILLISECONDS]: boolean;
}
