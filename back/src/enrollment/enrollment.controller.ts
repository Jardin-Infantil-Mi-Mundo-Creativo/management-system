import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import type {
  EnrollmentWithNoFiles,
  EnrollmentFiles,
} from './enrollment.entity';

@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'studentPhoto', maxCount: 1 },
      { name: 'documentsFile', maxCount: 1 },
    ]),
  )
  async postEnrollment(
    @UploadedFiles()
    files: EnrollmentFiles,
    @Body('data') data: string,
  ) {
    const enrollment = JSON.parse(data) as EnrollmentWithNoFiles;
    return this.enrollmentService.postEnrollment(enrollment, files);
  }
}
