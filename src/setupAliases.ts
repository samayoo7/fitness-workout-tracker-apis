import path from 'path';
import moduleAlias from 'module-alias';

export const setupAliases = () => {
	const isDevelopment = process.env.NODE_ENV !== 'production' ||
		process.argv[0].includes('ts-node') ||
		process.argv[1].includes('ts-node');
	
	if (isDevelopment) {
		// For development - use src directory
		moduleAlias.addAliases({
			'@': path.join(__dirname),
			'@routes': path.join(__dirname, 'routes'),
			'@utils': path.join(__dirname, 'utils'),
			'@controllers': path.join(__dirname, 'controllers'),
			'@middlewares': path.join(__dirname, 'middlewares'),
			'@models': path.join(__dirname, 'models'),
			'@interfaces': path.join(__dirname, 'interfaces'),
			'@types': path.join(__dirname, 'types'),
			'@config': path.join(__dirname, 'config'),
			'@services': path.join(__dirname, 'services'),
			'@validators': path.join(__dirname, 'validators'),
			'@jobs': path.join(__dirname, 'jobs')
		});
	}
}