import { FunctionComponent } from "react";
import clsx from "clsx";

interface IProps {
	disabled?: boolean;
	className?: string;
}

const ReactCodeInputWrapper: FunctionComponent<IProps> = ({ children, disabled, className = "" }) => {
	return (
		<div className={clsx("react-code-input", disabled && "react-code-input--disabled", className)}>{children}</div>
	);
};

export default ReactCodeInputWrapper;
