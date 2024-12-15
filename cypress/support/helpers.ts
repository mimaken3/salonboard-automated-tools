export const getEnv = (key: string) => {
    const env = Cypress.env(key) as string | undefined;
    if (!env) {
        throw new Error(`${key} env variable is not set`);
    }
    return env;
}