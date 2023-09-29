import { Module } from '@nestjs/common';
import { Neo4jGraphQL } from '@neo4j/graphql';
import { GraphQLModule } from '@nestjs/graphql';
import neo4j from "neo4j-driver";
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { schema } from './schema';

const driver = neo4j.driver('neo4j://localhost', neo4j.auth.basic('neo4j', 'password'));
const neo4jSchema = new Neo4jGraphQL({typeDefs: schema, driver});


@Module({
  providers: [],
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => {
        const schema = await neo4jSchema.getSchema();

        await neo4jSchema.assertIndexesAndConstraints({
          options: {create: true},
        });

        return {
          playground: true,
          schema,
        };
      },
    }),
  ],
})
export class GqlModule {
}
