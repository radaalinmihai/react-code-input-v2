import {FC, FunctionComponent} from "react";
import clsx from "clsx";

interface IProps {
	disabled?: boolean;
}

const ReactCodeInputWrapper: FunctionComponent<IProps> = ({children, disabled}) => {
	return <div className={clsx('react-code-input', disabled && 'react-code-input--disabled')}>{children}</div>;
}

export default ReactCodeInputWrapper;
