const jsonServer = require('json-server');
const auth = require('json-server-auth');
const PORT = 5000;
const app = jsonServer.create();

//Правила для аутентификации
const rules = auth.rewriter({
    // Permission rules
    users: 600,
    //URL /contacts
    // 660
    //User must be logged to write or read the resource.
    contacts: 660,
})

const router = jsonServer.router('db.json')

app.db = router.db

// You must apply the auth middleware before the router
app.use('/api', rules);
app.use('/api', auth);
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Mock api server listening at localhost:${PORT}`)
});