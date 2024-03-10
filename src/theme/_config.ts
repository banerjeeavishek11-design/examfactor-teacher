import { DarkTheme } from '@react-navigation/native';

import type { ThemeConfiguration } from '@/types/theme/config';

const colorsLight = {
	red500: '#C13333',
	gray800: '#303030',
	gray400: '#4D4D4D',
	gray200: '#A1A1A1',
	gray100: '#DFDFDF',
	gray50: '#EFEFEF',
	purple500: '#44427D',
	purple100: '#E1E1EF',
	purple50: '#1B1A23',
	screenBackgroundColor: "#09070E",
	white:'#fff',
	subHeading:'#8F8F94',
	loginBtnTextColor:'#31313F',
	termsLinkColor:'#27D4FA',
	bottomTabBackground:'#22222E',
	headerBackgroundColor:'#0D0D1B',
	backButtonColor:'#96A7AF',
	cardBackgroundColor:'#222230',
	bottomSheetBackgroundColor:'#1C1827',
	lineBackgroundColor:'#474752',
	subjectDetailsAcheivableScoreColor:'#BDBDC0'
} as const;

const colorsDark = {
	red500: '#C13333',
	gray800: '#E0E0E0',
	gray400: '#969696',
	gray200: '#BABABA',
	gray100: '#000000',
	gray50: '#EFEFEF',
	purple500: '#A6A4F0',
	purple100: '#252732',
	purple50: '#1B1A23',
	screenBackgroundColor: "#09070E",
} as const;

const sizes = [10,12,13,14, 16,18,20, 24, 32, 40, 80] as const;

export const config = {
	colors: colorsLight,
	fonts: {
		sizes,
		colors: colorsLight,
	},
	gutters: sizes,
	backgrounds: colorsLight,
	borders: {
		widths: [1, 2],
		radius: [4, 16],
		colors: colorsLight,
	},
	navigationColors: {
		...DarkTheme.colors,
		background: colorsLight.screenBackgroundColor,
		card: colorsLight.gray50,
	},
	variants: {
		dark: {
			colors: colorsDark,
			fonts: {
				colors: colorsDark,
			},
			backgrounds: colorsDark,
			navigationColors: {
				...DarkTheme.colors,
				background: colorsDark.purple50,
				card: colorsDark.purple50,
			},
		},
	},
} as const satisfies ThemeConfiguration;
