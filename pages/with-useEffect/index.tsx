import styles from '../../styles/Home.module.css'
import Link from "next/link";
import { useRouter } from 'next/router'
import { useEffect,useState } from "react";
import {fetchData} from '../../src/lib/users'
import type {dataType} from '../../src/types/users'
import Footer from '../../src/components/Footer'


const WithUseEffect = () => {
  const router = useRouter()
  const [data,setData] = useState<dataType[]>([])
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchData()
      .then((res) => {
        setData(res)
        setLoading(false)
      })
  },[])

  if(loading) return <p className={styles.loading}>Loading...</p>


  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          with <span style={{color:'lightblue'}}>useEffect</span> page
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/with-useEffect.js</code>
        </p>
        <div>
          {data.length > 0 ? data.map((d) => (
            <p style={{cursor:'pointer'}} key={d.id} onClick={() => router.push(`/with-useEffect/${d.id}`)}>{d.name}</p>
          )):'データがありません'}
        </div>

        <div style={{width:'100%',display:'flex',}}>
          <Link href={'/'}>
            <a style={{margin:'0 4px',width:'calc(100% / 2 - 8px)',border:'1px solid gray',textAlign:'center',borderRadius:'10px'}}>
              <p>back to Home</p>
            </a>
          </Link>
          <Link href={'/with-react-query'}>
            <a style={{margin:'0 4px',width:'calc(100% / 2 - 8px)',border:'1px solid gray',textAlign:'center',borderRadius:'10px'}}>
              <p>with reactQuery page</p>
            </a>
          </Link>
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default WithUseEffect;
