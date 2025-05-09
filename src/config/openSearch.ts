import { Client } from '@opensearch-project/opensearch';
import { HttpsAgent } from 'agentkeepalive';

export interface OpenSearchConfig {
	node: string;
	auth: {
		username: string;
		password: string;
	};
}

const httpsAgent = new HttpsAgent({
	maxSockets: 100,
	maxFreeSockets: 10,
	timeout: 60000,
	freeSocketTimeout: 30000,
});

export const openSearchConfig: OpenSearchConfig = {
	node: process.env.OPENSEARCH_NODE || 'https://localhost:9200',
	auth: {
		username: process.env.OPENSEARCH_USERNAME || 'admin',
		password: process.env.OPENSEARCH_PASSWORD || 'admin',
	},
};

export const opensearchClient = new Client({
	...openSearchConfig,
	ssl: { rejectUnauthorized: false },
	agent: httpsAgent,
	requestTimeout: 60000
});

export const EXERCISE_INDEX = 'exercises';
export const WORKOUT_PLAN_INDEX = 'workout_plans';
