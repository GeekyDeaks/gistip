'use strict'


const debug = require('debug')('dynip:godaddy')

const fetch = require('node-fetch')

const domain = process.env['GODADDY_DOMAIN'] || 'flozzl.com'
const name = process.env['GODADDY_HOST'] || '@'
const key = process.env['GODADDY_KEY']
const secret = process.env['GODADDY_SECRET']
const ttl = parseInt(process.env['GODADDY_TTL'] || 3600, 10)

async function update(content) {

    if(!key || !secret) return

    const headers = {
        'Authorization': `sso-key ${key}:${secret}`,
        'Content-Type': 'application/json'
    }
    const url = `https://api.godaddy.com/v1/domains/${domain}/records/A/${name}`

    const body = [{
        data: content.ip,
        ttl
    }]

    debug('updating %s %j, %j', url, headers, body)

    let res = await fetch(url, {
        method: 'put',
        body: JSON.stringify(body),
        headers
    })


    //let json = res.ok ? await res.json() : {}

    debug('updated %s.%s %s', name, domain, res.statusText)

}

module.exports = update