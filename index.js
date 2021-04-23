'use strict'

require('dotenv').config()

const debug = require('debug')('gistip')

const os = require('os')

const fetch = require('node-fetch')
const GitHub = require('github-base')
const ms = require('parse-duration')

const github = new GitHub({
    token: process.env['GITHUB_TOKEN']
})

let filename = process.env['GIST_FILENAME'] || 'ip.txt'
let update_freq = process.env['UPDATE_FREQ'] || '1h'

async function poll() {
    let res = await fetch('https://api.ipify.org?format=json')

    let content = await res.json()
    content.updated_at = new Date().toISOString()
    content.updated_by = os.hostname()

    debug(content)

    const options = { files: { } }
    options.files[filename] = { content: JSON.stringify(content, null, 4) }

    res = await github.patch('/gists/' + process.env['GIST_ID'], options)
    //console.log(res.body)
    debug('next update in %s', update_freq)
    setTimeout(poll, ms(update_freq))

}

poll()

