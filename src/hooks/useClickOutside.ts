import { RefObject, useEffect } from 'react';

export function useClickOutside<T extends HTMLElement = HTMLElement>({
	ref,
	handler,
	mouseEvent = 'mousedown',
	isOpen,
}: {
	ref: RefObject<T>;
	handler: (event: MouseEvent) => void;
	mouseEvent?: 'mousedown' | 'mouseup';
	isOpen?: boolean;
}) {
	useEffect(() => {
		if (!isOpen) return;

		const cb = (event: MouseEvent) => {
			const el = ref?.current;

			// Do nothing if clicking ref's element or descendent elements
			if (!el || el.contains(event.target as Node)) {
				return;
			}

			handler(event);
		};

		window.addEventListener(mouseEvent, cb);

		return () => {
			window.removeEventListener(mouseEvent, cb);
		};
	}, [isOpen]);
}
