import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*Swagger config */
  const config = new DocumentBuilder()
    .setTitle("BKTravel API")
    .setDescription('The BKTravel Source API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app
    .listen(process.env.PORT)
    .then(() => {
      console.log(
        `Application is running on: Swagger UI: http://localhost:${process.env.PORT}/api`
      );
    })
    .catch((err) => {
      console.error(err);
    });
}
bootstrap();
