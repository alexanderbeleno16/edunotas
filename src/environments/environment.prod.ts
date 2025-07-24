import packageInfo from '../../package.json';

export const environment = {
    production: true,
    appVersion: packageInfo.version,
    urlApi: 'http://localhost:5000/api',
};