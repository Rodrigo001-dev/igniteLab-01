import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

import { Enrollment } from './enrollment';

@ObjectType('User')
@Directive('@extends') // eu vou estender o user que já existe dentro de purchases adicionando a informação de enrollments
@Directive('@key(fields: "authUserId")')
export class Student {
  id: string;

  @Field(() => ID)
  @Directive('@external') // eu estou dizendo que o authUserId existe, que é uma informação external, que vem de outro serviço
  authUserId: string;

  @Field(() => [Enrollment])
  enrollments: Enrollment[];
}
