import { ChangeEventHandler, FocusEventHandler, forwardRef, useCallback, useEffect, useState } from "react";
import { IInput } from "@interfaces/InputTypes";
import { NUMBER_REG } from "@utilities/constants";
import { addTrailingZero } from "@utilities/helpers";
import clsx from "clsx";

const Input = forwardRef<HTMLInputElement, IInput>(
	(
		{
			onChange,
			placeholder,
			maxLength,
			onlyNumeric = false,
			disabled = false,
			defaultValue = "",
			externalValue,
			onBlur,
			className = "",
		},
		ref,
	) => {
		const [value, setValue] = useState("");
		const handleOnChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
			(e) => {
				if (maxLength && !(e.target.value.length <= maxLength)) {
					return;
				}
				if (onlyNumeric) {
					if (NUMBER_REG.test(e.target.value)) {
						setValue(e.target.value || "");

						return;
					}
					setValue("");
				}
				setValue(e.target.value || "");
			},
			[onlyNumeric, maxLength],
		);
		const handleOnBlur = useCallback<FocusEventHandler<HTMLInputElement>>(
			(e) => {
				handleOnChange(e);
				if (onBlur) {
					onBlur(addTrailingZero(e.target.value));
				}
			},
			[handleOnChange],
		);
		useEffect(() => {
			if (maxLength && defaultValue?.length <= maxLength) {
				setValue(defaultValue);
			}
		}, [maxLength]);
		useEffect(() => {
			if (value) {
				onChange(value);
			}
		}, [value]);

		return (
			<div className="react-code-input--container">
				<input
					ref={ref}
					onBlur={handleOnBlur}
					disabled={disabled}
					value={externalValue || value}
					maxLength={maxLength}
					placeholder={placeholder}
					className={clsx("react-code-input--container-digit", className)}
					onChange={handleOnChange}
					type="text"
				/>
			</div>
		);
	},
);

export default Input;
