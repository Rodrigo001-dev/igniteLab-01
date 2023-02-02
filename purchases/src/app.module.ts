import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';
import { MessagingModule } from './messaging/messaging.module';

// o Module é um arquivo que basicamente reúne um parte da nossa aplicação
// ele une vários outros arquivos em uma coisa só, ou seja, o module agrupa
// vários controllers e providers(providers é todo arquivo que não for controller)
// a regra de negócio sempre vai estar dentro de um arquivo de services
@Module({
  imports: [DatabaseModule, HttpModule, MessagingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
