// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

import { test } from 'tap'
import { CloudConnectionPool } from '../../src/pool'
import Connection from '../../src/Connection'

test('Should expose a cloudConnection property', (t: any) => {
  const pool = new CloudConnectionPool({ Connection })
  pool.addConnection('http://localhost:9200/')
  t.ok(pool.cloudConnection instanceof Connection)
  t.end()
})

test('Get connection should always return cloudConnection', (t: any) => {
  const pool = new CloudConnectionPool({ Connection })
  const conn = pool.addConnection('http://localhost:9200/')
  t.deepEqual(pool.getConnection(), conn)
  t.end()
})

test('pool.empty should reset cloudConnection', (t: any) => {
  const pool = new CloudConnectionPool({ Connection })
  pool.addConnection('http://localhost:9200/')
  t.ok(pool.cloudConnection instanceof Connection)
  pool.empty(() => {
    t.strictEqual(pool.cloudConnection, null)
    t.end()
  })
})