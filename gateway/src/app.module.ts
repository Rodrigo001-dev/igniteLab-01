import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        cors: true,
        context: ({ req }) => {
          return { headers: req.headers };
        },
      },
      gateway: {
        // como cada serviço tem o seu próprio schema o gateway vai pegar os dois
        // schemas e vai criar um superSchema(superGraph)
        // ele vai fazer uma introspecção(Introspect), ou seja, ele vai acessar
        // a URL de cada um dos serviços e vai buscar o schema através da URL
        // é isso que o IntrospectAndCompose faz
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'purchases', url: 'http://localhost:3333/graphql' },
            { name: 'classroom', url: 'http://localhost:3334/graphql' },
          ],
        }),
      },
    }),
  ],
})
export class AppModule {}
