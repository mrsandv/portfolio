type TContactItem = {
	text: string;
	value: string;
};

type TContactInfo = Record<string, TContactItem>;

type TSkillCategory = {
	name: string;
	options: string[];
};

type Responsibility = {
	id: number;
	text: string;
};

type TExperienceItem = {
	title: string;
	company: string;
	startDate: string;
	endDate: string;
	responsibilities: Responsibility[];
};

type TEducationItem = {
	degree: string;
	institution: string;
	startYear: string;
	endYear: string | 'present';
};

type TLanguage = {
	name: string;
	level: string;
};

type TLink = {
	url: string;
	name: string;
};

type TLocaleContent = {
	headers: {
		skills: string;
		experience: string;
		education: string;
		languages: string;
		interests: string;
	};
	skills: Record<string, TSkillCategory>;
	experience: Record<string, TExperienceItem>;
	education: Record<string, TEducationItem>;
	languages: TLanguage[];
	interests: string[];
	link: TLink;
};

export type TResume = {
	name: string;
	lastName: string;
	contactInfo: TContactInfo;
	locales: Record<string, TLocaleContent>;
};
