import 'dotenv/config'
import {fastify} from './routes/init.js'

import './routes/authRoutes.js'
import './routes/paymentRoutes.js'
import './routes/keywordRoutes.js'

import './db.js'



fastify.listen({ host: "0.0.0.0", port: process.env["PORT"] ?? 8000 }, function (err, address) {
  if (err) {
      fastify.log.error(err)
      process.exit(1)
  }
})