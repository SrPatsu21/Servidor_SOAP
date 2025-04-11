const soap = require('strong-soap').soap;

const url = 'http://localhost:3000/mdc?wsdl';
const requestArgs = { x: 1920, y: 1080 };

soap.createClient(url, {}, (err, client) => {
    if (err) return console.error('Erro ao criar cliente:', err);

    client.CalculateMDC(requestArgs, (err, result) => {
        if (err) return console.error('Erro na requisição:', err);

        const mdc = result.MDC;
        const aspectRatioX = requestArgs.x / mdc;
        const aspectRatioY = requestArgs.y / mdc;

        console.log(`MDC: ${mdc}`);
        console.log(`Aspect Ratio: ${aspectRatioX}:${aspectRatioY}`);
    });
});
