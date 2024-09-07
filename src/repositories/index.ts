interface Reposities {
	example: ExampleRepository;
}

class BaseRepostiory {
	exmapleRespository: ExampleRepository;

	constructor(
		options: Reposities,
		override: {
			[key: string]: Reposities;
		},
	) {
		this.exmapleRespository = options.example;

        const envonment = import.meta.env.ENVRONMENT ?? 'development'; 
        const overrideEnvronment = override[envonment];       
		if (overrideEnvronment) {
            const overrideReposities = overrideEnvronment;

			this.exmapleRespository = overrideReposities.example;
		}
	}
}

export const reposities = new BaseRepostiory(
	{
		example: new ExampleRepositoryImpl(),
	},
	{
		stub: {
			example: new ExampleRepositoryImplMock(),
		},
		development: {
			example: new ExampleRepositoryImplMock(),
		},
	},
);
