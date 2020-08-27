require('module-alias/register');
import app from "./app"
const PORT = 5000;

app.get('/healthcheck', function (req, res) {
  res.send('OK')
})

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server listening on PORT:', PORT)
})