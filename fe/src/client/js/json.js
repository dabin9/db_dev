fetch('')
    .then((response) => {
        return response.json()
    })
    .then((결과) => {
        console.log(결과)
    })
    .catch(() => {
        console.log("error")
    })