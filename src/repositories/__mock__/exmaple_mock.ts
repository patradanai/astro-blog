class ExampleRepositoryImplMock implements ExampleRepository {
    getExample(): Promise<any> {
        throw new Error("Method not implemented.");
    }
}