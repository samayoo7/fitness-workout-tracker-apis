import { Client, ClientOptions } from '@elastic/elasticsearch';

// Configuration options with environment variables and defaults
const elasticsearchConfig: ClientOptions = {
	node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
	maxRetries: parseInt(process.env.ELASTICSEARCH_MAX_RETRIES || '5'),
	requestTimeout: parseInt(process.env.ELASTICSEARCH_TIMEOUT || '60000'),
	pingTimeout: 3000,
	compression: true,
	name: 'fitness-tracker-client'
};

// Create singleton instance
const client = new Client(elasticsearchConfig);

/**
 * Tests the Elasticsearch connection and returns cluster information
 * @returns Promise<boolean>
 */
export const testConnection = async (): Promise<boolean> => {
	try {
		const response = await client.info();
		// console.log('Elasticsearch connection successful:', response);
		return true;
	} catch (error) {
		console.error('Elasticsearch connection error:', error);
		return false;
	}
};

// Health check function
export const checkHealth = async (): Promise<boolean> => {
	try {
		const { status } = await client.cluster.health();
		console.log("Elasticsearch cluster health =>", status)
		return status !== 'red';
	} catch (error) {
		console.error('Elasticsearch health check failed:', error);
		return false;
	}
};

export default client;
