import { gql } from 'apollo-server';

export const schema = gql`
    type Supplement {
        name: String!
        ingredients: [Ingredient!]! @relationship(type: "HAS_INGREDIENT", direction: OUT)
        compatibleWith: [Supplement!]! @relationship(type: "COMPATIBLE_WITH", direction: OUT)
        incompatibleWith: [Supplement!]! @relationship(type: "INCOMPATIBLE_WITH", direction: OUT)
        brand: Brand @relationship(type: "BELONGS_TO", direction: OUT)
        soldIn: [Store!]! @relationship(type: "SOLD_IN", direction: OUT)
        mentionedIn: [Publication!]! @relationship(type: "MENTIONED_IN", direction: OUT)
    }

    type Ingredient {
        name: String!
        supports: [Process!]! @relationship(type: "SUPPORTS", direction: OUT)
        inhibits: [Process!]! @relationship(type: "INHIBITS", direction: OUT)
        mentionedIn: [Publication!]! @relationship(type: "MENTIONED_IN", direction: OUT)
    }

    type Process {
        name: String!
        mentionedIn: [Publication!]! @relationship(type: "MENTIONED_IN", direction: OUT)
    }

    type Brand {
        name: String!
        supplements: [Supplement!]! @relationship(type: "BELONGS_TO", direction: IN)
    }

    type Store {
        name: String!
        supplements: [Supplement!]! @relationship(type: "SOLD_IN", direction: IN)
    }

    type Publication {
        title: String!
        date: String!
        supplements: [Supplement!]! @relationship(type: "MENTIONED_IN", direction: IN)
        ingredients: [Ingredient!]! @relationship(type: "MENTIONED_IN", direction: IN)
        processes: [Process!]! @relationship(type: "MENTIONED_IN", direction: IN)
    }
`;
