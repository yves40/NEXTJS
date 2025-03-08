export async function GET(request) {
  return new Response(
    JSON.stringify([{
      userID: 992929,
      id: 100,
      title: "Data sent by api/posts",
      body: "Hello M'r post, welcome on board"
    }]),
    {
      status: 200,
      header: {
        "Content-Type": 'application/json'
      }
    }
  )
}