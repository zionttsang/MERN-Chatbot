import React from 'react'
import { useState } from 'react'


const Home = () => {

    // count 的初始值为 0
    const [count, setCount] = useState<number>(0)

    const onClick = () => {
        setCount((prevCount) => prevCount + 1) // 将count在原来的基础上加1
        setTimeout(() => {
            console.log(count) // 分析浏览器打印的结果
        }, 1000)
    }
    return (
        <div>Home
            <button onClick={onClick}>打开开发者工具再点击</button>
        </div>
    )
}


export default Home