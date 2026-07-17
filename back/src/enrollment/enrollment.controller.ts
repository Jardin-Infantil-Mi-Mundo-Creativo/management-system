import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Param,
  Post,
  Put,
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

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'studentPhoto', maxCount: 1 },
      { name: 'documentsFile', maxCount: 1 },
    ]),
  )
  async completeEnrollment(
    @Param('id') id: string,
    @UploadedFiles()
    files: EnrollmentFiles,
  ) {
    return this.enrollmentService.completeEnrollment(id, files);
  }

  @Get()
  async getEnrollments() {
    return this.enrollmentService.getEnrollments();
  }

  @Patch(':id/withdrawal')
  async withdrawEnrollment(
    @Param('id') id: string,
    @Body('withdrawalDate') withdrawalDate: string,
  ) {
    return this.enrollmentService.withdrawEnrollment(id, withdrawalDate);
  }

  @Delete(':id')
  async deleteEnrollment(@Param('id') id: string) {
    return this.enrollmentService.deleteEnrollment(id);
  }
}
