import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

// Asynchronous function to bootstrap the NestJS application
async function bootstrap() {
  // Create a Nest application instance
  const app = await NestFactory.create(AppModule);

  // Configure Swagger documentation using DocumentBuilder
  const config = new DocumentBuilder()
    .addBearerAuth() // Add Bearer authentication to Swagger
    .setTitle('Soha Technical Challenge') // Set the title of the Swagger documentation
    .setDescription('API description') // Set the description of the Swagger documentation
    .setVersion('1.0') // Set the version of the Swagger documentation
    .build();

  // Generate Swagger document based on the configuration
  const document = SwaggerModule.createDocument(app, config);

  // Set up Swagger UI at the '/api' endpoint
  SwaggerModule.setup('api', app, document);

  // Start the Nest application and listen on port 3001
  await app.listen(3001);
}

// Call the bootstrap function to start the application
bootstrap();
