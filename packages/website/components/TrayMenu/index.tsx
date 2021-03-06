import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect, useMemo, useRef, useDebugValue } from 'react'

import style from './trayBar.module.scss'

export default function TrayMenu() {
    const router = useRouter()

    const icon = useMemo(
        () => ({
            home: (
                <svg
                    className={style['wrp-nav-item-icon']}
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    width="200"
                    height="200"
                >
                    <path
                        d="M854.08768 503.1168l0 342.08768c0 44.450816-36.040704 80.490496-80.49152 80.490496L612.614144 925.694976 612.614144 664.09984c0-44.450816-36.03968-80.490496-80.490496-80.490496l-40.245248 0c-44.450816 0-80.49152 36.03968-80.49152 80.490496L411.38688 925.696 250.40384 925.696c-44.450816 0-80.490496-36.03968-80.490496-80.490496l0-342.08768L49.175552 503.117824 512 60.416l462.824448 442.701824L854.08768 503.117824z"
                        p-id="13773"
                    ></path>
                </svg>
            ),
            explore: (
                <svg
                    className={style['wrp-nav-item-icon']}
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    width="200"
                    height="200"
                >
                    <path
                        d="M534.378667 574.549333c31.338667 0 58.410667-17.130667 73.152-42.346667 0.149333 0.149333 0.256 0.256 0.405333 0.405333 32.341333-55.658667 57.045333-127.168 74.176-190.869333-57.472 15.466667-121.024 36.949333-173.717333 64.725333-1.365333 0.725333-2.730667 1.450667-4.096 2.176-9.557333 5.141333-12.8 7.445333-13.952 8.405333-24.490667 14.933333-41.024 41.642667-41.024 72.448C449.322667 536.469333 487.402667 574.549333 534.378667 574.549333z"
                        p-id="14571"
                    ></path>
                    <path
                        d="M512.021333 64C264.554667 64 64 264.554667 64 511.978667 64 759.445333 264.554667 960 512.021333 960 759.381333 960 960 759.445333 960 511.978667 960 264.512 759.381333 64 512.021333 64zM603.989333 603.989333c-90.986667 90.944-304.149333 120.213333-304.149333 120.213333s29.269333-213.205333 120.213333-304.149333 304.149333-120.213333 304.149333-120.213333S694.976 513.045333 603.989333 603.989333z"
                        p-id="14572"
                    ></path>
                </svg>
            ),
            reading: (
                <svg
                    className={style['wrp-nav-item-icon']}
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    width="200"
                    height="200"
                >
                    <defs>
                        <style type="text/css"></style>
                    </defs>
                    <path
                        d="M307.2 173.346133c108.049067 17.066667 187.733333 111.325867 187.733333 222.088534v433.032533c0 32.597333-26.112 59.016533-58.299733 58.999467-5.563733 0-11.093333-0.8192-16.452267-2.4064l-217.207466-65.024C153.463467 805.2224 119.466667 759.176533 119.466667 706.884267V212.616533C119.466667 180.0192 145.5616 153.6 177.732267 153.6c3.003733 0 6.007467 0.238933 8.977066 0.699733L307.2 173.346133z m596.650667 30.190934c0.443733 3.003733 0.682667 6.058667 0.682666 9.096533V706.901333c0 52.292267-33.979733 98.3552-83.5072 113.152L603.818667 885.060267c-30.8736 9.216-63.266133-8.6528-72.362667-39.918934a59.716267 59.716267 0 0 1-2.389333-16.657066V395.434667c0-110.7456 79.684267-205.0048 187.733333-222.0544l120.490667-19.063467c31.7952-5.034667 61.5936 16.9984 66.56 49.2032z"
                        p-id="3000"
                    ></path>
                </svg>
            ),
            word: (
                <svg
                    className={style['wrp-nav-item-icon']}
                    version="1.1"
                    viewBox="0 0 200 200"
                >
                    <path d="M78.6,96.4h42.8c10.8,0,19.6-8.8,19.6-19.6V34.1c0-10.8-8.8-19.6-19.6-19.6H78.6C67.8,14.5,59,23.3,59,34.1v42.8	C59,87.7,67.8,96.4,78.6,96.4z M84,44.8c0-8.9,7.2-16,16-16s16,7.2,16,16v32.1c0,3-2.4,5.3-5.3,5.3s-5.3-2.4-5.3-5.3V64.4	c0-2-1.6-3.6-3.6-3.6h-3.6c-2,0-3.6,1.6-3.6,3.6v0v12.5c0,3-2.4,5.3-5.3,5.3S84,79.8,84,76.8V44.8z M98.2,50.1h3.6	c2,0,3.6-1.6,3.6-3.6v-1.8c0-3-2.4-5.3-5.3-5.3s-5.3,2.4-5.3,5.3v1.8C94.7,48.5,96.3,50.1,98.2,50.1L98.2,50.1z M76.8,103.6H34.1	c-10.8,0-19.6,8.8-19.6,19.6v42.8c0,10.8,8.8,19.6,19.6,19.6h42.8c10.8,0,19.6-8.8,19.6-19.6v-42.8	C96.4,112.3,87.7,103.6,76.8,103.6L76.8,103.6z M68.9,146.5c4.8,7.4,2.7,17.3-4.7,22.2c-2.6,1.7-5.7,2.6-8.8,2.6H44.8	c-3,0-5.3-2.4-5.3-5.3v-42.8c0-3,2.4-5.3,5.3-5.3h10.7c8.8,0,16,7.1,16,16c0,3.1-0.9,6.2-2.6,8.8C68.1,143.8,68.1,145.3,68.9,146.5	L68.9,146.5z M55.5,149.9h-1.8c-2,0-3.6,1.6-3.6,3.6v3.6c0,2,1.6,3.6,3.6,3.6h1.8c3,0,5.3-2.4,5.3-5.3	C60.8,152.3,58.4,149.9,55.5,149.9L55.5,149.9z M55.5,128.5h-1.8c-2,0-3.6,1.6-3.6,3.6v3.6c0,2,1.6,3.6,3.6,3.6h1.8	c3,0,5.3-2.4,5.3-5.3C60.8,130.9,58.4,128.5,55.5,128.5L55.5,128.5z M165.9,103.6h-42.8c-10.8,0-19.6,8.8-19.6,19.6v42.8	c0,10.8,8.8,19.6,19.6,19.6h42.8c10.8,0,19.6-8.8,19.6-19.6v-42.8C185.5,112.3,176.7,103.6,165.9,103.6L165.9,103.6z M151.7,160.6	c3,0,5.3,2.4,5.3,5.3s-2.4,5.3-5.3,5.3c-14.8,0-26.7-12-26.7-26.7c0-14.8,12-26.7,26.7-26.7c3,0,5.3,2.4,5.3,5.3	c0,3-2.4,5.3-5.3,5.3c-8.9,0-16,7.2-16,16S142.8,160.6,151.7,160.6z" />
                </svg>
            ),
            about: (
                <svg
                    className={style['wrp-nav-item-icon']}
                    version="1.1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 200 200"
                >
                    <path d="M100,10c-49.7,0-90,40.3-90,90c0,49.7,40.3,90,90,90c49.7,0,90-40.3,90-90C190,50.3,149.7,10,100,10z M97.2,156.3	c-4.3,0-7.8-4.2-7.8-9.3l0-56.7c0-5.1,3.5-9.3,7.8-9.3c4.3,0,7.8,4.2,7.8,9.3l0,56.7C105,152.1,101.5,156.3,97.2,156.3z M97.2,64	c-4.6,0-8.4-4.5-8.4-10l0-0.3c0-5.5,3.8-10,8.4-10c4.6,0,8.4,4.5,8.4,10l0,0.3C105.6,59.6,101.9,64,97.2,64z" />
                </svg>
            ),
        }),
        []
    )

    const trayData = useRef([
        {
            icon: 'home',
            title: '首页',
            pathname: '/home',
            pathRe: /^\/home/,
        },
        {
            icon: 'explore',
            title: '发现',
            pathname: '/explore',
            pathRe: /^\/explore/,
        },
        {
            icon: 'reading',
            title: '阅读',
            pathname: '/reading',
            pathRe: /^\/reading/,
        },
        {
            icon: 'word',
            title: '单词',
            pathname: '/word',
            pathRe: /^\/word/,
        },
        {
            icon: 'about',
            title: '关于',
            pathname: '/about',
            pathRe: /^\/about/,
        },
    ])

    const [isShow, setIsShow] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)
    // const location = useLocation()

    let c = 'var(--t-fore-c)'
    let c2 = 'var(--sc)'
    let colors = [c, c, c, c]
    colors = colors.map((v, i) => {
        return i == currentIndex ? c2 : c
    })

    useEffect(function () {
        if (!isShow) setIsShow(true)

        const handleRouteChange = () => {
            console.log('routeChangeComplete')
            let showTray = false
            if (window.location.pathname === '/reading') {
                // setIsShow(false)
            }
            trayData.current.forEach(({ pathRe }, index) => {
                if (pathRe.test(window.location.pathname)) {
                    setCurrentIndex(index)
                    showTray = true
                }
            })
            setIsShow(showTray)
        }
        handleRouteChange()
        router.events.on('routeChangeComplete', handleRouteChange)
        const handleRouteChangeStart = () => {
            trayData.current.forEach(({ pathRe }, index) => {
                if (pathRe.test(window.location.pathname)) {
                    trayData.current[index].pathname =
                        window.location.pathname + window.location.search
                }
            })
        }
        router.events.on('routeChangeStart', handleRouteChangeStart)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
            router.events.off('routeChangeStart', handleRouteChangeStart)
        }
    }, [])

    return (
        <div
            className={`${style['wrp-nav']} ${
                isShow ? '' : style['wrp-nav-hidden']
            }`}
            data-wrp-action-block="intercept"
        >
            <div className={style['wrp-nav-item-container']}>
                {trayData.current.map((item, index) => (
                    <Link href={item.pathname} key={item.pathname}>
                        <div
                            className={`${style['wrp-nav-item']} ${
                                index === currentIndex &&
                                style['wrp-tary-bar-selected']
                            }`}
                        >
                            {icon[item.icon as keyof typeof icon]}
                            <div className={style['wrp-nav-item-title']}>
                                {item.title}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
