import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnrollmentModule } from './enrollment/enrollment.module';

@Module({
  imports: [EnrollmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
