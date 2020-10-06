export default (MethodName, Data={}) => 
fetch('https://rest.eurotorg.by/10201/Json', {
            method: 'POST',
            body: JSON.stringify({
                "CRC": "",
                "Packet": {
                    "JWT": "null",
                    MethodName,
                    "ServiceNumber": "767659F1-AB94-4E7B-9112-FC2780E03882",
                    Data
                }
            })
        }).then(resp => resp.json())
        .then(resp=> resp.Table)