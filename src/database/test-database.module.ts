import { Module } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const mongod = new MongoMemoryServer();
        return {
          uri: await mongod.getUri(),
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        };
      },
    }),
  ],
})
export class TestDatabaseModule {}