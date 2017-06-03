# percyff

A proof of concept for a perceptual-diff Saas

# Running

Go ahead to a GH repo and configure a new webhook:

* Payload URL: http://YOUR_PUBLIC_IP:3000/webhook
* Content-type: application/json
* Secret: <A_SECRET_YOU_DEFINE>

Then start this app

```bash
WEBHOOK_SECRET=<A_SECRET_YOU_DEFINE> GH_USER=<YOUR_GH_USER> GH_PASS=<YOUR_GH_PASSWD> node index.js
```

_note that you need to match <A_SECRET_YOU_DEFINE> in the webhook_