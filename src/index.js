const { prisma } = require('./generated/prisma-client')
const { GraphQLServer } = require('graphql-yoga')  

// 1
let links = [{
    id: 'link-0',
    url: 'rationalspace.wordpress.com',
    description: 'Blog website'
}]

//! means this value can never be null
// 2
let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    //( without prisma, using memory)
    // feed: () => links, 
    feed: (root, args, context, info) => {
      return context.prisma.links()
    },
    link: (_,{id}) => {
      const link = links.find( link => link.id === id)
      return link;
    }
  },
  Mutation: {  
      updateLink: (parent,args) => {
        const index = links.findIndex(link => link.id === args.id);
        links[index].description = args.description!== undefined ? args.description : links[index].description;
        links[index].url = args.url !== undefined ? args.url : links[index].url;
        return links[index];
      },
      deleteLink : (parent,args) => {
        const removeIndex = links.findIndex(item => item.id === args.id);
        const removedLink = links[removeIndex];
        links.splice(removeIndex, 1);
        return removedLink;
      },
      //( without prisma, using memory)
      // post: (parent,args) => {
      //     const link = {
      //         id: `link-${idCount++}`,
      //         description: args.description,
      //         url: args.url,
      //     }
      //     links.push(link)
      //     return link
      // },
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
  context: { prisma },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))