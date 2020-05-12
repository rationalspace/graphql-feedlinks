## Queries
### query info
`query{
    info
}`
### query all links
`query{
    feed{
        id
        url
        description
    }
}`   
### query by link id
`query{
  link(id:"link-0"){
   	id
    url
    description
  }
}`
### post a link
`mutation {
  post(
    url: "www.prisma.io"
    description: "Prisma replaces traditional ORMs"
  ) {
    id
  }
}`
### update a link
`mutation{
    update(
        id:"link-0"
        url:"newurl.wordpress.com"
        description:"testing this url"
    )
    {
        id
        description
    }
}`
### delete a link
`mutation {
  deleteLink(
    id:"link-2"
  )
  {
    id
    url
  }
}`
### signup
`mutation {
  signup(
    name: "Alice"
    email: "alice@prisma.io"
    password: "graphql"
  ) {
    token
    user {
      id
    }
  }
}`
### login
`mutation {
  login(
    email: "alice@prisma.io"
    password: "graphql"
  ) {
    token
    user {
      email
      links {
        url
        description
      }
    }
  }
}
`
### subscription
`subscription {
  newVote {
    id
    link {
      url
      description
    }
    user {
      name
      email
    }
  }
}
`
### vote
`mutation {
  vote(linkId: "__LINKID__") {
    link {
      url
      description
    }
    user {
      name
      email
    }
  }
}
`
### running the app
`>>node src/index.js`
### playgroud
`http://localhost:4000/`
### install prisma, prisma client
`>>sudo npm install -g prisma`\
`>>npm install prisma-client-lib`
### prisma generate client
`prisma generate`
### prisma deploy ( deploys the data model changes and makes endpoints live ( both http & ws ))
`prisma deploy` 
### install bryptjs and jsonwebtoken
`npm install bcryptjs jsonwebtoken`
