import	React, {useEffect, useContext, createContext}	from	'react';
import useLocalStorage from '../hooks/useLocalStorage'



const	UI = createContext();
export const UIContextApp = ({children}) => {
	const [theme, set_theme] = useLocalStorage('theme', 'light-initial'); 


	useEffect(() => {
		if (theme !== 'light') {
			const lightModeMediaQuery = window.matchMedia('(prefers-color-scheme: light)');

			if (lightModeMediaQuery.matches){
				set_theme('light');
			}
		}
	}, [set_theme, theme]);

	useEffect(() => {
		if (theme === 'light') {
			document.documentElement.classList.add('light');
			document.documentElement.classList.remove('dark');
		} else if (theme === 'dark') {
			document.documentElement.classList.add('dark');
			document.documentElement.classList.remove('light');
		}
	}, [theme]);

	return (
		<UI.Provider
			value={{
				theme,
				switchTheme: () => set_theme(t => t === 'dark' ? 'light' : 'dark'),
			}}>
			{children}
		</UI.Provider>
	);
};

export const useUI = () => useContext(UI);
export default useUI;
