const soap = require('soap');

const url = 'http://localhost:3000/mdc?wsdl';
const args = { x: 1920, y: 1080 };

//* request
soap.createClient(url, function(err, client) {
    if (err) return console.error('Erro ao criar cliente:', err);

    client.CalculateMDC(args, function(err, result) {
        if (err) return console.error('Erro ao chamar serviço:', err);

        const mdc = result.MDC;
        const aspectX = args.x / mdc;
        const aspectY = args.y / mdc;

        console.log(`MDC: ${mdc}`);
        console.log(`Aspect Ratio: ${aspectX}:${aspectY}`);
    });
});