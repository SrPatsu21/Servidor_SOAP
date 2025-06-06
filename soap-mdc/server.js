const soap = require('soap');
const express = require('express');
const fs = require('fs');
const http = require('http');

const app = express();
const port = 3000;

//* Calcular MDC
function calcularMDC(x, y) {
    while (y) {
        [x, y] = [y, x % y];
    }
    return x;
}

//* servico exposto
const service = {
    MDCService: {
        MDCPort: {
            CalculateMDC(args) {
                const x = parseInt(args.x);
                const y = parseInt(args.y);
                const mdc = calcularMDC(x, y);
                return { MDC: mdc };
            }
        }
    }
};

//* ler o WSDL
const path = require('path');
const xml = fs.readFileSync(path.join(__dirname, 'mdc.wsdl'), 'utf8');


//* HTTP SOAP
const server = http.createServer(app);

soap.listen(server, '/mdc', service, xml);

server.listen(port, () => {
    console.log(`SOAP server rodando em http://localhost:${port}/mdc?wsdl`);
});