abstract class ExampleRepository {
	abstract getExample(): Promise<any>;
}

class ExampleRepositoryImpl extends BaseHttp implements ExampleRepository {
	constructor() {
		super('');
	}

	async getExample() {
		try {
			return this.get('/example');
		} catch (error) {
			throw new HttpException(500, 'Internal  server error');
		}
	}
}
