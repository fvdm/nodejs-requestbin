var http = require('http')

module.exports = {
    create:     function( callback ) { talk( 'POST', 'bins', callback ) },
    get:        function( bin, callback ) { talk( 'GET', 'bins/'+ bin, callback ) },
    requests:   function( bin, callback ) { talk( 'GET', 'bins/'+ bin +'/requests', callback ) },
    request:    function( bin, request, callback ) { talk( 'GET', 'bins/'+ bin +'/requests/'+ request, callback ) }
}

function talk( method, path, callback ) {
    var options = {
        host:   'requestb.in',
        path:   '/'+ path,
        method: method
    }
    
    var req = http.request( options )
    
    req.on( 'response', function( res ) {
        var data = ''
        res.on( 'data', function( ch ) { data += ch })
        res.on( 'close', function() { callback( new Error('disconnected') ) })
        res.on( 'end', function() {
            data = data.toString('utf8').trim()
            if( res.statusCode >= 300 ) {
                var err = new Error('HTTP error')
                err.request = options
                err.response = {
                    headers: res.headers,
                    body: data
                }
                callback( err )
            } else if( !data.match( /^(\{.*\}|\[.*\])$/ ) ) {
                var err = new Error('invalid response')
                err.request = options
                err.response = {
                    headers: res.headers,
                    body: data
                }
                callback( err )
            } else {
                data = JSON.parse( data )
                callback( null, data )
            }
        })
    })
    
    req.on( 'error', function( error ) {
        var err = new Error('request failed')
        err/details = error
        callback( err )
    })
    
    req.end()
}
