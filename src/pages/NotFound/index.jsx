import { useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styles from './index.module.scss'
const NotFound = () => {
  const history = useHistory()
  const [count, setCount] = useState(5)
  //   将定时器存到ref仓库中
  const TimerRef = useRef(-1)
  useEffect(() => {
    // 操作副作用
    TimerRef.current = setInterval(() => {
      console.log('定时器在执行')
      setCount((preCount) => preCount - 1)
    }, 1000)
    // 在组件销毁之前清除副作用
    return () => {
      clearInterval(TimerRef.current)
    }
  }, [])
  //   判断如果count===0，跳转页面
  useEffect(() => {
    if (count === 0) {
      history.push('/home')
    }
  }, [count, history])
  return (
    <div className={styles.root}>
      <p>对不起你访问的页面不存在</p>
      <div>
        将在{count}秒后返回首页,或点击立即返回<Link to="/home">首页</Link>
      </div>
    </div>
  )
}
export default NotFound
