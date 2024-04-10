import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import styles from './styles/index.module.scss';

export const App = () => {
	const [appData, setAppData] = useState<ArticleStateType>(defaultArticleState);

	const onSubmit = (formData: ArticleStateType) => {
		setAppData(formData);
	};

	const onReset = () => {
		setAppData(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appData.fontFamilyOption.value,
					'--font-size': appData.fontSizeOption.value,
					'--font-color': appData.fontColor.value,
					'--container-width': appData.contentWidth.value,
					'--bg-color': appData.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				initialValues={defaultArticleState}
				onSubmit={onSubmit}
				onReset={onReset}
			/>
			<Article />
		</main>
	);
};
