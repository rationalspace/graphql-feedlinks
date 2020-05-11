const { GraphQLServer } = require('graphql-yoga')  
const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      feed: (root, args, context, info) => {
        return context.prisma.links()
      },
      link: (_,{id}) => {
        const link = links.find( link => link.id === id)
        return link;
      }
    },
    Mutation: {
        post: (root, args, context) => {
          return context.prisma.createLink({
            url: args.url,
            description: args.description,
          })
        },
    }
  }
  // 3
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context:  { prisma } ,
  })
  server.start(() => console.log(`Server is running on http://localhost:4000`))