'use strict'

const debug = require('debug')('dynip:gist')

const GitHub = require('github-base')

const github = new GitHub({
    token: process.env['GITHUB_TOKEN']
})

let filename = process.env['GIST_FILENAME'] || 'ip.txt'

async function update(content) {
    const options = { files: { } }
    options.files[filename] = { content: JSON.stringify(content, null, 4) }

    let res = await github.patch('/gists/' + process.env['GIST_ID'], options)
    debug('updated gist %s %s', filename, res.statusMessage)
    
}

module.exports = update