import React,{useEffect,useState}from 'react';
import { useRouter } from "next/router";
import { getAsString } from "../../src/lib/helper";
import {fetchUser,fetchData} from '../../src/lib/users'
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { dataType } from "../../src/types/users";
import Footer from '../../src/components/Footer'

const WithUseEffectUser = () => {
  const router = useRouter()
  const userId = getAsString(router.query.id)
  const [user,setUser] = useState<dataType>()
  const [users,setUsers] = useState<dataType[]>([])
  const [loading,setLoading] = useState(false)

  const options = users && users.map((user) => {
    let values = {value:'',label:''}
    values.value = String(user.id)
    values.label = user.name
    return values
  })

  useEffect(() => {
    setLoading(true)
    fetchData().then((res) => {
      setUsers(res)
      setLoading(false)
    })
  },[])

  useEffect ( () => {
    setLoading(true)
    fetchUser(userId)
      .then((res) => {
        setUser(res)
        setLoading(false)
      })
  } , [userId] );


  if(loading) return <p className={styles.loading}>Loading...</p>
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          User with <span style={{color:'lightblue'}}>useEffect</span>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/with-useEffect/[id].tsx</code>
        </p>

        <div className={styles.select}>
          <select  onChange={(e) => router.push(`/with-useEffect/${e.target.value}`)}>
            <option value={''}>選択して下さい</option>
            {options.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <p>Hi! my name is {user && user.name}!</p>
        <p>Nickname is {user && user.username}</p>
        <p>Contact us at {user && user.email}!</p>

        <div style={{width:'100%',display:'flex',}}>
          <Link href={'/'}>
            <a style={{margin:'0 4px',width:'calc(100% / 2 - 8px)',border:'1px solid gray',textAlign:'center',borderRadius:'10px'}}>
              <p>back to Home</p>
            </a>
          </Link>
          <Link href={'/with-useEffect'}>
            <a style={{margin:'0 4px',width:'calc(100% / 2 - 8px)',border:'1px solid gray',textAlign:'center',borderRadius:'10px'}}>
              <p>back with useEffect page</p>
            </a>
          </Link>
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default WithUseEffectUser;
