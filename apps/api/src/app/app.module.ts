import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QglModule } from "@ai-suple/graphql";

@Module({
  imports: [QglModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
