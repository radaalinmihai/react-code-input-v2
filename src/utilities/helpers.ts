import { MAX_TIME_FIELDS } from "./constants";
import { IInputValue } from "@interfaces/InputTypes";
import { IInputTimeFields, InputTimeMaxes, InputTimeTypes } from "@interfaces/ICodeInputTime";

export const addTrailingZero = (value: string) => {
	if (parseInt(value) < 10 && value.length === 1) {
		return `0${value}`;
	}

	return value;
};

export const createEmptyTimes = (fields: IInputTimeFields) => {
	const times: IInputValue[] = [];
	for (let i = 0; i < MAX_TIME_FIELDS; i++) {
		if (i === 0 && fields[InputTimeTypes.DAYS]) {
			times.push(createTimeField(InputTimeTypes.DAYS, InputTimeMaxes.MAX_DAYS, 1000 * 60 * 60 * 24));
		}
		if (i === 1 && fields[InputTimeTypes.HOURS]) {
			times.push(createTimeField(InputTimeTypes.HOURS, InputTimeMaxes.MAX_HOURS, 1000 * 60 * 60));
		}
		if (i === 2 && fields[InputTimeTypes.MINUTES]) {
			times.push(createTimeField(InputTimeTypes.MINUTES, InputTimeMaxes.MAX_MINUTES, 1000 * 60));
		}
		if (i === 3 && fields[InputTimeTypes.SECONDS]) {
			times.push(createTimeField(InputTimeTypes.SECONDS, InputTimeMaxes.MAX_SECONDS, 1000));
		}
		if (i === 4 && fields[InputTimeTypes.MILLISECONDS]) {
			times.push(createTimeField(InputTimeTypes.MILLISECONDS, InputTimeMaxes.MAX_MS, 1));
		}
	}

	return times;
};

const createTimeField = (type: InputTimeTypes, max: InputTimeMaxes, convertValue: number): IInputValue => ({
	value: "",
	type,
	max,
	convertValue,
});
