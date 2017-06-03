var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/webhook', secret: 'percyff-secret-1942' })

// GH API FOR PUSHING
var GitHubApi = require("github")
var github = new GitHubApi({
    // optional
    debug: true,
    protocol: "https",
    headers: { "user-agent": "Percyff-Service" },
})

github.authenticate({
    type: "basic",
    username: process.env.GH_USER,
    password: process.env.GH_PASS
})


// WEBHOOK server handler
http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('No such location')
  })
}).listen(3000)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
})

handler.on('pull_request', function (event) {
  console.log('Received a pull_request event:\n%s', JSON.stringify(event))
  
  github.repos.createStatus({
    owner: event.payload.pull_request.head.repo.owner.login,
    repo: event.payload.pull_request.head.repo.name,
    sha: event.payload.pull_request.head.sha,
    state: 'success',
    context: 'percyff',
    description: 'Percyff checks',
    target_url: 'http://percyff.io/${project}/${build}/'
  })
})