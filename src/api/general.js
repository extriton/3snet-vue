// import axios from 'axios'

const postGeneral = (data) => {
    console.log(data)
    return new Promise (resolve => {
        // axios({ url: 'example.com', data: data, method: 'POST' })
        //  .then(resolve => {
        //      resolve(resolve.data)
        //  })
        resolve('Ok')
    })
}

export default {
    postGeneral
}