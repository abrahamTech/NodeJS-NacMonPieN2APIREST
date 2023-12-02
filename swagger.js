const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: "3.0.0",
        info: { 
            title: "REST API Prestamos",
            description: 'Una API para calcular préstamos basados en el tipo de material y el peso en gramos.', 
            version: "1.0.0" 
        },
    },
    apis: ["./swaggerComments.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    console.log(`La documentación de la version 1 esta disponible en http://localhost:${port}/api-docs`)
}

module.exports = {swaggerDocs}
