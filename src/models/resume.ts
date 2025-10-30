import { type Document, Schema } from 'mongoose';
import type { TResume } from 'types/resume';
import { getModel } from 'utils/db/modelFactory';

export interface IResume extends TResume, Document {}

const ResumeSchema = new Schema<IResume>(
	{
		name: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		contactInfo: {
			phone: {
				text: String,
				value: String,
			},
			email: {
				text: String,
				value: String,
			},
			linkedIn: {
				text: String,
				value: String,
			},
			city: {
				text: String,
				value: String,
			},
		},
		locales: {
			type: Map,
			of: new Schema({
				link: {
					url: String,
					name: String,
				},
				headers: {
					skills: String,
					education: String,
					experience: String,
					interests: String,
					languages: String,
				},
				skills: {
					type: Map,
					of: new Schema({
						name: String,
						options: [String],
					}),
				},
				experience: {
					type: Map,
					of: new Schema({
						title: String,
						company: String,
						startDate: String,
						endDate: String,
						responsibilities: [
							{
								id: Number,
								text: String,
							},
						],
					}),
				},
				education: {
					type: Map,
					of: new Schema({
						degree: String,
						institution: String,
						startYear: String,
						endYear: String,
					}),
				},
				languages: [
					{
						name: String,
						level: String,
					},
				],
				interests: [String],
			}),
		},
	},
	{
		timestamps: true,
	}
);

// This is a singleton;
export const ResumeModel = getModel<IResume>('Resume', ResumeSchema);
