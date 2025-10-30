type TContactItem = {
	text: string;
	value: string;
};

type TContactInfo = Record<string, TContactItem>;

type TSkillCategory = {
	name: string;
	options: string[];
};

type TResponsability = {
	id: number;
	text: string;
};

type TExperienceItem = {
	title: string;
	company: string;
	startDate: string;
	endDate?: string;
	responsibilities: TResponsability[];
};

type TEducationItem = {
	degree: string;
	institution: string;
	startDate: string;
	endDate?: string;
};

type TLanguage = {
	name: string;
	level: string;
};

type TLink = {
	url: string;
	name: string;
};

type TLocaleHeaders = {
	skills: string;
	experience: string;
	education: string;
	languages: string;
	interests: string;
};

type TLocaleContent = {
	headers: TLocaleHeaders;
	skills: Record<string, TSkillCategory>;
	experience: Record<string, TExperienceItem>;
	education: Record<string, TEducationItem>;
	languages: TLanguage[];
	interests: string[];
	link: TLink;
};

type TLocales = {
	en: TLocaleContent;
	es: TLocaleContent;
	[key: string]: TLocaleContent;
};

export type TResume = {
	name: string;
	lastName: string;
	contactInfo: TContactInfo;
	locales: TLocales;
	updatedAt?: string;
	createdAt?: string;
	version: number;
};
