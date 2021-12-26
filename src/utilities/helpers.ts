export const addTrailingZero = (value: string) => {
	if(parseInt(value) < 10) {
		return `0${value}`;
	}
	return value;
}
