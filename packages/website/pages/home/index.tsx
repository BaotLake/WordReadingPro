import { useState, useRef, ChangeEvent, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReadingHistory, ReadingHistoryItem } from '@wrp/core'

import style from './home.module.scss'
import { ItemCard, GoBar } from '../../components/Home'

export default function Home() {
    const router = useRouter()
    const [focused, setFocused] = useState(false)
    const [input, setInput] = useState('')
    const inputEl = useRef<HTMLInputElement>(null)
    const [historyList, setHistoryList] = useState<
        Partial<ReadingHistoryItem>[]
    >([])

    useEffect(() => {
        const history = new ReadingHistory()
        history.get(50).then((list) => {
            console.log('list', list)
            setHistoryList(list)
        })
    }, [])

    return (
        <div className={style['home-page']}>
            <div className={style['logo-container']}>
                <div className={style['logo-image-wrapper']}>
                    <Image
                        src="/logo.png"
                        layout="fill"
                        alt="Logo"
                    />
                </div>

                <h1
                    className={style['logo-name']}
                    style={{ display: 'none' }}
                >
                    Word Reading Beta
                </h1>
            </div>
            <GoBar />
            <div className={style['card-container']}>
                {historyList.map((item, index) => (
                    <ItemCard key={index} data={item} />
                ))}
            </div>
            <div>{/**推荐文章 */}</div>
        </div>
    )
}
