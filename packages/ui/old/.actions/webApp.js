import { htmlTraversal, extractHead, extractAbstract, scrollToTop } from '../utils/core'

import { proxyHostList } from '../utils/config'

export const setStatus = (status) => ({
    type: "webApp/SETSTATUS",
    status
})

export const setXmlDoc = (xmlDoc) => ({
    type: "webApp/SETXMLDOC",
    xmlDoc
})

export const setUrl = (url) => ({
    type: "webApp/SETURI",
    url
})

export const setKey = (key) => ({
    type: "webApp/SETKEY",
    key
})

export const setLocation = (location) => {
    if (location === undefined) {
        return ({
            type: "webApp/SETLOCATION",
            location: {}
        })
    }

    if (typeof (location) === 'string') {
        return ({
            type: "webApp/SETLOCATION",
            location: {
                path: location
            }
        })
    }

    if (typeof (location) === 'object') {
        return ({
            type: "webApp/SETLOCATION",
            location
        })
    }
}

/** historyList 为当前完成List, item 为新条目，可为空 */
export const setHistory = (item) => {

    let historyList = JSON.parse(localStorage.getItem('read_history'));
    if (!Array.isArray(historyList)) historyList = [];

    console.log('historyList', historyList)

    if (item) {
        historyList = historyList.filter(v => v.url !== item.url || v.key !== item.key)

        console.log('actions app : history.push: ', item)
        historyList.push(item);
    }

    while (historyList.length > 200) {
        let remove = historyList.shift();
        if (remove.key) localStorage.removeItem(remove.key);
    }

    console.log('actions setHistory 3', historyList);

    // 存储
    let historyStr = JSON.stringify(historyList);
    localStorage.setItem('read_history', historyStr);

    return ({
        type: "webApp/SETHISTORY",
        history: historyList
    })
}

export const setHeads = (heads) => ({
    type: "webApp/SETHEADS",
    heads
})

export const loadXmlDoc = (input) => {
    console.log('action creaters loadXMLDoc')
    if (!input) return;
    return dispatch => {

        let encode = encodeURIComponent(input);
        let url2 = `https://1773134661611650.ap-northeast-1.fc.aliyuncs.com/2016-08-15/proxy/Tr/tr/?url=${encode}`;
        let url = `https://1773134661611650.ap-northeast-1.fc.aliyuncs.com/2016-08-15/proxy/Tr/tr/?url=${encode}`;
        url = `https://1773134661611650.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/wrp/wrp_server/get?url=${encode}`;

        // let url = `http://47.94.145.177:8000/get?url=${encode}`;
        console.log("input:", input)
        let inputObj = new URL(input);
        let timeout = 60000;

        // proxy
        if (proxyHostList.includes(inputObj.host)) {
            url = url2;
            timeout = 80000;
        }

        return new Promise(async (resolve, reject) => {
            let res = await fetch(url, { method: 'GET'})
            let data = await res.json()
            console.log('loadXMlDoc', res, data)
            if (res.status === 200) {
                // dispatch(setXmlDoc(res.data))
                console.log('doc parser')
                dispatch(docParser(data, input))
                // dispatch(setStatus('parsing'))
            } else {
                console.log(`loadxmldoc status!=200, res:${res}`)
                dispatch(setStatus('failed'))
            }

        })
    }

}

export const setElements = (elements) => ({
    type: "webApp/SETELEMENTS",
    elements
})

export const docParser = (doc, baseUrl, key = '') => {
    let t1 = Date.now()
    let dom = (new DOMParser()).parseFromString(doc, 'text/html')

    if (baseUrl) {
        let base = dom.createElement('base');
        console.log('base app.url', baseUrl)
        base.href = new URL(baseUrl).origin;
        dom.head.insertBefore(base, dom.head.firstChild);
    }

    let htmlElements = htmlTraversal(dom.body);
    let t2 = Date.now()
    console.log("traversal Runing time ", t2 - t1)

    // this.htmlElements = htmlElements;
    // this.abstract = null;

    scrollToTop();

    // 提取head， 渲染head
    let heads = extractHead(dom.head);
    // head(headChildList);
    let abstract = extractAbstract(dom);
    abstract = Object.assign(abstract, key ? { key: key } : { url: baseUrl })

    return dispatch => {
        dispatch(setElements(htmlElements))
        dispatch(setHeads(heads))
        dispatch(setStatus('completed'))
        dispatch(setHistory(abstract))
    }
}

export const goRead = (input, currentUrl) => {
    // input 可以是输入框输入, 历史banner中的url, 阅读页面中的url
    return dispatch => {

        let urlPattern = /^https?:\/\/(.+\.\w+.*)|(localhost.*)/
        let isUrl = input.length < 10000 ? urlPattern.test(input) : false

        if (isUrl && input === currentUrl) {
            // 将要打开的页面与当前阅读的页面是同一个
            dispatch(setStatus('parsing'))
            dispatch(setLocation('/wrp-read'))
            return;
        }
        if (!isUrl) {
            // input 不是url， 是文本
            // dispatch(setXmlDoc( input ))
            dispatch(setUrl(''))
            dispatch(setStatus('parsing'))
            dispatch(setLocation('/wrp-read'))

            return;
        }

        // 将要打开的是新页面
        dispatch(setStatus('loading'))
        dispatch(loadXmlDoc(input))
        dispatch(setLocation('/wrp-read'))

    }

}