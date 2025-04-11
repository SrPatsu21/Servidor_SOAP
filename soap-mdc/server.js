const http = require('http');
const soap = require('strong-soap').soap;
const fs = require('fs');
const path = require('path');

//* Função para calcular o MDC
function calcularMDC(x, y) {
    while (y) {
        [x, y] = [y, x % y];
    }
    return x;
}

//* Serviço
const service = {
    MDCService: {
        MDCPort: {
            CalculateMDC: function(args) {
                const x = args.x;
                const y = args.y;
                const mdc = calcularMDC(x, y);
                return { MDC: mdc };
            }
        }
    }
};

const wsdlPath = path.join(__dirname, 'wsdl.xml');
const wsdlXML = fs.readFileSync(wsdlPath, 'utf8');

const server = http.createServer((req, res) => {
    res.end('404: Not Found');
});

server.listen(3000, function() {
    console.log('Servidor SOAP rodando em http://localhost:3000/mdc');
    soap.listen(server, '/mdc', service, wsdlXML);
});