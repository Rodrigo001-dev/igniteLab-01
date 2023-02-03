import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Purchase } from './purchase';

@ObjectType('User')
// o Directive serve para dizer para o graphQL qual é a chave em comum entre o
// usuário logado no classroom(student) e o usuário logado no purchase(customer)
@Directive('@key(fields: "authUserId")')
export class Customer {
  id: string;

  @Field(() => ID)
  authUserId: string;

  @Field(() => [Purchase])
  purchases: Purchase[];
}
