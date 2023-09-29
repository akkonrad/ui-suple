import { Module } from '@nestjs/common';
import { Neo4jGraphQL } from '@neo4j/graphql';
import { GraphQLModule } from '@nestjs/graphql';
import neo4j from "neo4j-driver";

const typeDefs = `#graphql
type User {
    name: String!
}
`;

const driver: any = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'password'));
const neoSchema = new Neo4jGraphQL({typeDefs, driver});

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    GraphQLModule.forRoot({
      schema: neoSchema,
      driver: true
    }),
  ]
})
export class QglModule {
}
