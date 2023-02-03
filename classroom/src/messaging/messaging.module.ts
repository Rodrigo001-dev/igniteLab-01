import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

import { CoursesService } from '../services/courses.service';
import { EnrollmentsService } from '../services/enrollments.service';
import { StudentsService } from '../services/students.service';

import { PurchasesController } from './controllers/purchases.controller';

// no nest podemos ter controllers HTTP no modelo MVC onde cada método do controller vai ser uma rota
// mas pro nest ele trata os receptores de mensagem do Kafka também como controllers
// cada método do purchase.controller vai receber um tipo de mensagem do kafka
@Module({
  imports: [DatabaseModule],
  controllers: [PurchasesController],
  providers: [StudentsService, CoursesService, EnrollmentsService],
})
export class MessagingModule {}
