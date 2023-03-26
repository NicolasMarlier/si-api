const express = require('express')
const cors = require('cors')
const { pool } = require('./db/pool')
const Invader = require('./models/invader')

const port = process.env.PORT || 3001

const app = express()
app.use(express.json());
app.use(cors());

app.post('/invaders', async(req, res) => {
  const user_id = 1
  try {
    await Invader.save(pool, user_id, req.body)
    res.json({success: true})
  }
  catch(e) {
    console.log(e)
    res.status(500).json({error: e.message})
  }
})

app.get('/invaders', async(req, res) => {
  const user_id = 1
  const invaders = await Invader.list(pool, user_id)
  res.json({data: invaders})
})

app.get('*', function(req, res){
  res.status(404).send('what???');
});

app.listen(port, () => {
  console.log(`Invader API listening on port ${port}`)
})