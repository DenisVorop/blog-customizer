import { FormEvent, ReactNode } from 'react';

import { Text } from '../text';

import s from './Form.module.scss';

interface FormProps {
	title?: string;
	children: ReactNode;
	footer: ReactNode;
	handleSubmit: (e: FormEvent) => void;
}

export const Form = ({ title, children, footer, handleSubmit }: FormProps) => {
	return (
		<form className={s.form} onSubmit={handleSubmit}>
			<div className={s.container}>
				<Text weight={800} size={31} uppercase>
					{title}
				</Text>
				{children}
			</div>
			<div className={s.bottomContainer}>{footer}</div>
		</form>
	);
};
