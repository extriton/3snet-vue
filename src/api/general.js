// import axios from 'axios'

const postGeneral = (data) => {
    // axios({ url: 'example.com', data: data, method: 'POST' })
    console.log(data)
    return new Promise (resolve => {
        resolve('Ok')
    })
}

export default {
    postGeneral
}