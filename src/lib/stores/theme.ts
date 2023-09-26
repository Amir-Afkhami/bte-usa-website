import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const defaultValue = 'light';

let initialValue: 'light' | 'dark' = defaultValue;

if (
	browser &&
	(window.localStorage.getItem('theme') === 'light' ||
		window.localStorage.getItem('theme') === 'dark')
) {
	initialValue = window.localStorage.getItem('theme') as 'light' | 'dark';
}

const theme = writable<'light' | 'dark'>(initialValue);

theme.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('theme', value);
		if (value === 'light') {
			window.document.body.classList.remove('dark');
		} else if (!window.document.body.classList.contains('dark')) {
			window.document.body.classList.add('dark');
		}
	}
});

export default theme;
