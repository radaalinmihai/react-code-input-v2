import {MAX_TIME_FIELDS} from "./constants";
import {IInputValue} from "../interfaces/InputTypes";
import {IInputTimeFields, InputTimeMaxes, InputTimeTypes} from "../interfaces/ICodeInputTime";

export const addTrailingZero = (value: string) => {
	if(parseInt(value) < 10 && value.length === 1) {
		return `0${value}`;
	}
	return value;
}

export const createEmptyTimes = (fields: IInputTimeFields) => {
	const times: IInputValue[] = [];
	for(let i = 0; i < MAX_TIME_FIELDS; i++) {
		if(i === 0 && fields[InputTimeTypes.DAYS]) {
			times.push(createTimeField(InputTimeTypes.DAYS, InputTimeMaxes.MAX_DAYS));
		}
		if(i === 1 && fields[InputTimeTypes.HOURS]) {
			times.push(createTimeField(InputTimeTypes.HOURS, InputTimeMaxes.MAX_HOURS));
		}
		if(i === 2 && fields[InputTimeTypes.MINUTES]) {
			times.push(createTimeField(InputTimeTypes.MINUTES, InputTimeMaxes.MAX_MINUTES));
		}
		if(i === 3 && fields[InputTimeTypes.SECONDS]) {
			times.push(createTimeField(InputTimeTypes.SECONDS, InputTimeMaxes.MAX_SECONDS));
		}
		if(i === 4 && fields[InputTimeTypes.MILLISECONDS]) {
			times.push(createTimeField(InputTimeTypes.MILLISECONDS, InputTimeMaxes.MAX_MS));
		}
	}
	return times;
}

const createTimeField = (type: InputTimeTypes, max: InputTimeMaxes): IInputValue => ({
	value: '',
	type,
	max,
});
