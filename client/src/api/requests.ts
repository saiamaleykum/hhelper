

const request = async (method: string, endpoint: string, data?: any) => {
    let url = `${process.env.REACT_APP_SERVER_URL}/api/${endpoint}`;
    console.log(url)
    console.log(data)
    if (method === "GET" && data) {
        const queryString = new URLSearchParams(data).toString();
        url += `?${queryString}`; // TODO очень плохо сделано (если >1 то ? не разделяется, нужен &)
    }

    const options: RequestInit = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    }

    if (method === "POST" && data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const jsonData = await response.json();


    if (response.status === 200) {
        return jsonData;
    } else {
        throw Error(response.statusText);
    }
}

export default request;