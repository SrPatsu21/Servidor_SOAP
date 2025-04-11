const soap = require('soap');
const express = require('express');
const fs = require('fs');
const http = require('http');

const app = express();
const port = 3000;

// Função pra calcular MDC
function calcularMDC(a, b) {
    if (!b) return a;
    return calcularMDC(b, a % b);
}

// Define os métodos que o serviço vai expor
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

// Lê o WSDL que você colou
const path = require('path');
const xml = fs.readFileSync(path.join(__dirname, 'mdc.wsdl'), 'utf8');


// Cria o servidor HTTP e sobe o serviço SOAP
const server = http.createServer(app);

soap.listen(server, '/mdc', service, xml);

server.listen(port, () => {
    console.log(`SOAP server rodando em http://localhost:${port}/mdc?wsdl`);
});