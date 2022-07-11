import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({

  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.phsf8.mongodb.net/vendinha?retryWrites=true&w=majority`),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
