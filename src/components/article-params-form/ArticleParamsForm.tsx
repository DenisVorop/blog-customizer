import { FormEvent, useRef, useState } from 'react';
import cn from 'classnames';

import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import { ArrowButton } from 'components/arrow-button';

import { Button } from '../button';
import { Form } from '../form/Form';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';

import s from './ArticleParamsForm.module.scss';
import { useClickOutside } from 'src/hooks/useClickOutside';

interface ArticleParamsFormProps {
	initialValues: ArticleStateType;
	onSubmit?: (formData: ArticleStateType) => void;
	onReset?: () => void;
}

export const ArticleParamsForm = ({
	initialValues,
	onSubmit,
	onReset,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formData, setFormData] = useState<ArticleStateType>(initialValues);
	const formRef = useRef<HTMLDivElement | null>(null);

	useClickOutside({
		ref: formRef,
		handler: () => setIsMenuOpen(false),
		isOpen: isMenuOpen,
	});

	const toggleVisibleForm = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const handleChangeOptions =
		(key: keyof ArticleStateType) => (option: OptionType) => {
			setFormData((prev) => ({ ...prev, [key]: option }));
		};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onSubmit?.(formData);
	};

	const handleReset = () => {
		onReset?.();
		setFormData(initialValues);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={toggleVisibleForm} />
			<aside
				className={cn(s.container, { [s.container_open]: isMenuOpen })}
				ref={formRef}>
				<Form
					title='Задайте параметры'
					footer={
						<>
							<Button title='Сбросить' type='reset' onClick={handleReset} />
							<Button title='Применить' type='submit' />
						</>
					}
					handleSubmit={handleSubmit}>
					<Select
						selected={formData.fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={handleChangeOptions('fontFamilyOption')}
					/>
					<RadioGroup
						selected={formData.fontSizeOption}
						options={fontSizeOptions}
						title='размер шрифта'
						name='fontSizeOption'
						onChange={handleChangeOptions('fontSizeOption')}
					/>
					<Select
						selected={formData.fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={handleChangeOptions('fontColor')}
					/>
					<Separator />
					<Select
						selected={formData.backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={handleChangeOptions('backgroundColor')}
					/>
					<Select
						selected={formData.contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={handleChangeOptions('contentWidth')}
					/>
				</Form>
			</aside>
		</>
	);
};
