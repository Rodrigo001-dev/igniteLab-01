import { UseGuards } from '@nestjs/common';
import { Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { EnrollmentsService } from '../../../services/enrollments.service';
import { CoursesService } from '../../../services/courses.service';
import { StudentsService } from '../../../services/students.service';

import { AuthorizationGuard } from '../../auth/authorization.guard';

import { Enrollment } from '../models/enrollment';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.enrollmentsService.listAllEnrollments();
  }

  @ResolveField()
  student(@Parent() enrollment: Enrollment) {
    return this.studentsService.getStudentById(enrollment.studentId);
  }

  @ResolveField()
  course(@Parent() enrollment: Enrollment) {
    return this.coursesService.getCourseById(enrollment.courseId);
  }
}
