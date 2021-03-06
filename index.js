'use strict'

require('dotenv').config()

const debug = require('debug')('dynip:main')

const os = require('os')
const fetch = require('node-fetch')
const ms = require('parse-duration')

let update_freq = process.env['UPDATE_FREQ'] || '1h'

const gist = require('./gist')
const goddady = require('./godaddy')

let last_ip = ''

async function poll() {
    let res = await fetch('https://api.ipify.org?format=json')

    let content = await res.json()
    content.updated_at = new Date().toISOString()
    content.updated_by = os.hostname()

    debug(content)

    if( content && last_ip !== content.ip) {
        await gist(content)
        await goddady(content)
        last_ip = content.ip
    }

    debug('next update in %s', update_freq)
    setTimeout(poll, ms(update_freq))

}

poll()

