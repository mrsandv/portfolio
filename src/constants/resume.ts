import type { TResume } from 'types/resume';

export const resume: TResume = {
	name: 'Marco Antonio',
	lastName: 'Sandoval Espinosa',
	contactInfo: {
		phone: { text: '+52(55)80-36-73-17', value: 'tel:+525580367317' },
		email: { text: 'mrsandvv@gmail.com', value: 'mailto:mrsandvv@gmail.com' },
		linkedIn: {
			text: 'linkedin.com/in/mrsan',
			value: 'https://www.linkedin.com/in/mrsan/',
		},
		city: { text: 'Mexico City', value: '#' },
	},
	locales: {
		es: {
			link: { url: '/cv.pdf', name: 'PDF' },
			headers: {
				skills: 'Habilidades técnicas',
				education: 'Educación',
				experience: 'Experiencia',
				interests: 'Intereses',
				languages: 'Lenguajes',
			},
			skills: {
				langs: {
					name: 'Lenguajes de programación',
					options: ['Javascript', 'Typescript', 'Go', 'Python'],
				},
				frameworks: {
					name: 'Frameworks',
					options: [
						'ReactJS',
						'NextJS',
						'Svelte',
						'Vue',
						'Expo',
						'Express',
						'Echo',
					],
				},
				front: {
					name: 'Frontend',
					options: [
						'HTML',
						'CSS',
						'SCSS/SASS',
						'Tailwind',
						'MUI',
						'React Native',
					],
				},
				db: {
					name: 'Bases de datos',
					options: ['MongoDB', 'Redis', 'PostgreSQL', 'MariaDB'],
				},
				cloud: {
					name: 'Servicios en la nube',
					options: ['AWS', 'Digital Ocean', 'GCP', 'Vercel', 'Azure'],
				},
				tools: {
					name: 'Herramientas',
					options: [
						'Markdown',
						'Git',
						'Docker',
						'Podman',
						'Kubernetes',
						'LaTeX',
						'Bash',
						'Jasper Reports',
						'Agentes de IA',
					],
				},
			},
			experience: {
				flink: {
					title: 'Líder técnico web',
					company: 'Flink/Webull',
					startDate: 'Ene 2020',
					endDate: 'Jul 2025',
					responsibilities: [
						{
							id: 0,
							text: 'Estandaricé el uso de NextJS y TypeScript como stack principal en todos los proyectos web, liderando la migración de sistemas legacy y su implementación en nuevos desarrollos.',
						},
						{
							id: 1,
							text: 'Diseñé soluciones web de alto rendimiento, con enfoque en la optimización de procesos y la mejora de la experiencia del usuario.',
						},
						{
							id: 2,
							text: 'Implementé pipelines de CI/CD utilizando GitLab CI, AWS ECS/ECR, Lambdas y contenedores, lo que agilizó los procesos de desarrollo y mantenimiento en producción.',
						},
						{
							id: 3,
							text: 'Diseñé e implementé APIs para proyectos web, incluyendo el modelado de esquemas y consultas optimizadas a bases de datos transaccionales.',
						},
						{
							id: 4,
							text: 'Establecí estándares de código y mejores prácticas, con documentación y configuraciones que garantizaron la calidad y consistencia del código.',
						},
						{
							id: 5,
							text: 'Gestioné proyectos con metodologías ágiles, asegurando entregas oportunas y el cumplimiento de objetivos.',
						},
						{
							id: 6,
							text: 'Recopilé y analicé los requisitos de clientes internos, diseñando flujos de trabajo, mockups y funcionalidades alineadas con las necesidades del negocio.',
						},
					],
				},
				forward: {
					title: 'Desarrollador Frontend',
					company: 'Forward company',
					startDate: 'Nov 2018',
					endDate: 'Ene 2020',
					responsibilities: [
						{
							id: 0,
							text: 'Renové el UI de la plataforma LMS de la empresa al migrar el 100% de los estilos inline a un preprocesador SCSS, lo que mejoró la mantenibilidad y la escalabilidad.',
						},
						{
							id: 1,
							text: 'Implementé carga dinámica de contenido en HTML con archivos de configuración y localización, lo que proporcionó una experiencia de usuario más personalizada.',
						},
						{
							id: 2,
							text: 'Colaboré con los stakeholders para recopilar y refinar los requisitos de la plataforma LMS, con flujos de UX intuitivos, mockups y funcionalidades que respondieron a las necesidades de los usuarios.',
						},
						{
							id: 3,
							text: 'Lideré el desarrollo y el mantenimiento de los componentes principales del frontend, asegurando la estabilidad y el rendimiento de la plataforma.',
						},
					],
				},
				spanish: {
					title: 'Consultor de Tecnología',
					company: 'Spanish Training Academy',
					startDate: 'Nov 2018',
					endDate: 'Ene 2020',
					responsibilities: [
						{
							id: 0,
							text: 'Desarrollé un sitio web informativo en WordPress alojado en un servidor Linux Ubuntu, con información sobre los cursos, precios, formularios de contacto y páginas esenciales para promocionar la oferta de la academia.',
						},
						{
							id: 1,
							text: 'Implementé y configuré una plataforma LMS Moodle en un servidor DigitalOcean, con certificados SSL, bases de datos configuradas y administración de usuarios para garantizar una entrega de cursos segura y sin problemas.',
						},
						{
							id: 2,
							text: 'Proporcioné soporte de TI y gestioné las herramientas de GSuite, con el objetivo de mantener operaciones fluidas y mejorar la productividad dentro de la organización.',
						},
					],
				},
			},
			education: {
				unam: {
					degree: 'Licenciatura en Física',
					institution: 'UNAM',
					startYear: '2009',
					endYear: '2015',
				},
				uvm: {
					degree: 'Ing. Diseño de Software y Redes',
					institution: 'UVM',
					startYear: '2023',
					endYear: 'En curso',
				},
			},
			languages: [
				{ name: 'Español', level: 'Nativo' },
				{ name: 'Inglés', level: 'C1' },
			],
			interests: [
				'Ciencias de la computación',
				'Educación',
				'Finanzas',
				'Divulgación científica',
				'Videojuegos',
			],
		},
		en: {
			link: { url: '/resume.pdf', name: 'PDF' },
			headers: {
				skills: 'Tech Skills',
				education: 'Education',
				experience: 'Experience',
				interests: 'Interests',
				languages: 'Languages',
			},
			skills: {
				langs: {
					name: 'Programming Languages',
					options: ['Javascript', 'Typescript', 'Go', 'Python'],
				},
				frameworks: {
					name: 'Frameworks',
					options: [
						'ReactJS',
						'NextJS',
						'Svelte',
						'Vue',
						'Expo',
						'Express',
						'Echo',
					],
				},
				front: {
					name: 'Frontend',
					options: [
						'HTML',
						'CSS',
						'SCSS/SASS',
						'Tailwind',
						'MUI',
						'React Native',
					],
				},
				db: {
					name: 'Databases',
					options: ['MongoDB', 'Redis', 'PostgreSQL', 'MariaDB'],
				},
				cloud: {
					name: 'Cloud Services',
					options: ['AWS', 'Digital Ocean', 'GCP', 'Vercel', 'Azure'],
				},
				tools: {
					name: 'Tools',
					options: [
						'Markdown',
						'Git',
						'Docker',
						'Podman',
						'Kubernetes',
						'LaTeX',
						'Bash',
						'Jasper Reports',
						'IA Agents',
					],
				},
			},
			experience: {
				flink: {
					title: 'Web Tech Lead',
					company: 'Flink/Webull',
					startDate: 'Jan 2020',
					endDate: 'Jul 2025',
					responsibilities: [
						{
							id: 0,
							text: 'Standardized and structured NextJS and TypeScript as core stack across web projects for the business.',
						},
						{
							id: 1,
							text: ' Led the migration of legacy systems to a modern stack and pipelines for existing and new projects.',
						},
						{
							id: 2,
							text: 'Designed high-performance web solutions, focused on optimizing development processes and improving user experience(UX).',
						},
						{
							id: 3,
							text: ' Implemented CI/CD pipelines using GitLab CI, AWS ECS/ECR, Lambdas, and containers, which streamlined development and maintenance processes in production.',
						},
						{
							id: 4,
							text: ' Designed and implemented APIs for company projects, modeling schemas and optimizing queries for transactional databases.',
						},
						{
							id: 5,
							text: ' Established code standards and best practices, creating documentation and configuration guidelines to ensure code quality and consistency.',
						},
						{
							id: 6,
							text: ' Managed projects using agile methodologies, ensuring on-time delivery and achievement of objectives.',
						},
						{
							id: 7,
							text: ' Gathered and analyzed internal projects requirements, design workflows, mockups and required functionality to achieve each project goal.',
						},
					],
				},
				forward: {
					title: 'Frontend developer',
					company: 'Forward company',
					startDate: 'Nov 2018',
					endDate: 'Jan 2020',
					responsibilities: [
						{
							id: 0,
							text: "Tasked with improving the UI of the company's Learning Management System(LMS) by migrating 100% of the inline styles to SCSS files, improving maintainability and scalability.",
						},
						{
							id: 1,
							text: 'Implemented dynamic HTML content delivery, using configuration and localization files for a fully customized user experience.',
						},
						{
							id: 2,
							text: 'Collaborated with stakeholders to gather and refine the LMS platform requirements, designing UX flows, mockups, and functionalities to address user needs and implement new features.',
						},
						{
							id: 3,
							text: 'Led development and maintenance of main web frontend components, ensuring stability and performance of the platform with modern and legacy browsers, including mobile devices.',
						},
					],
				},
				spanish: {
					title: 'Technolofy Consultant',
					company: 'Spanish Training Academy',
					startDate: 'Nov 2018',
					endDate: 'Jan 2020',
					responsibilities: [
						{
							id: 0,
							text: "Developed an informative website in WordPress hosted on a Linux Ubuntu server, managing courses information, prices, contact forms and essential pages to promote the academy's offerings.",
						},
						{
							id: 1,
							text: 'Implemented and configured a Moodle LMS platform on a DigitalOcean server',
						},
						{
							id: 2,
							text: 'Implemented SSL certificates, maintaned platform databases and oversaw user management for the platform teachers to enable seamless and secure teaching courses.',
						},
						{
							id: 3,
							text: 'Provided IT support and managed GSuite tools to ensure smooth operations and improve productivity within the organization.',
						},
					],
				},
			},
			education: {
				unam: {
					degree: 'Physics BS.',
					institution: 'UNAM',
					startYear: '2009',
					endYear: '2015',
				},
				uvm: {
					degree: 'Software and Network Design Engineer',
					institution: 'UVM',
					startYear: '2023',
					endYear: 'Current',
				},
			},
			languages: [
				{ name: 'Spanish', level: 'Native' },
				{ name: 'English', level: 'C1' },
			],
			interests: [
				' Computer science',
				' Finances',
				' Education',
				' Video games',
			],
		},
	},
};
