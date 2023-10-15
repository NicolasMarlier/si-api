const express = require('express')
const cors = require('cors')
const { pool } = require('./db/pool')
const Invader = require('./models/invader')
const Hint = require('./models/hint')
const auth = require('./auth');

const port = process.env.PORT || 3001
          

const app = express()
app.use(express.json());
app.use(cors());

const USER_ID = 1

app.post('/invaders', auth, async(req, res) => {
  try {
    await Invader.save(pool, USER_ID, req.body)
    await Invader.process_all_images(pool, user_id)
    res.json({success: true})
  }
  catch(e) {
    console.log(e)
    res.status(500).json({error: e.message})
  }
})

app.get('/invaders', auth, async(req, res) => {
  const invaders = await Invader.list(pool, USER_ID)
  res.json({data: invaders})
})

app.get('/hints', auth, async(req, res) => {
  const hints = await Hint.list(pool, USER_ID)
  res.json({data: hints})
})

app.delete('/hints/:id', auth, async(req, res) => {
  await Hint.destroy(pool, USER_ID, req.params.id)
  res.json({success: true})
})

app.post('/hints', auth, async(req, res) => {
  await Hint.save(pool, USER_ID, req.body)
  res.json({success: true})
})

app.get('*', function(req, res){
  res.status(404).send('what???');
});

app.listen(port, () => {
  console.log(`Invader API listening on port ${port}`)
})