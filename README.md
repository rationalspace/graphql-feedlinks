Queries
//query info
query{
    info
}
//query all links
query{
    feed{
        id
        url
        description
    }
}    
//query by link id
query{
  link(id:"link-0"){
   	id
    url
    description
  }
}
//post a link
mutation {
  post(
    url: "www.prisma.io"
    description: "Prisma replaces traditional ORMs"
  ) {
    id
  }
}
//update a link
mutation{
    update(
        id:"link-0"
        url:"newurl.wordpress.com"
        description:"testing this url"
    )
    {
        id
        description
    }
}
//delete a link
mutation {
  deleteLink(
    id:"link-2"
  )
  {
    id
    url
  }
}
//running the app
>>node src/index.js
