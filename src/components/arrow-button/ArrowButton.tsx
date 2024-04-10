import cn from 'classnames';

import arrow from 'src/images/arrow.svg';

import s from './ArrowButton.module.scss';

interface ArrowButtonProps {
	isOpen?: boolean;
	onClick?: () => void;
}

export const ArrowButton = ({ isOpen, onClick }: ArrowButtonProps) => {
	return (
		<div
			onClick={onClick}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={cn(s.container, { [s.container_open]: isOpen })}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={cn(s.arrow, { [s.arrow_open]: isOpen })}
			/>
		</div>
	);
};
