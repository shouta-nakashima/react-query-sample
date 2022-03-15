import styles from '../../styles/Home.module.css'
import Link from "next/link";
import { useRouter } from 'next/router'
import { useQuery } from "react-query";
import {fetchData} from '../../src/lib/users'
import Footer from '../../src/components/Footer'


const WithReactQuery = () => {
  const router = useRouter()
  const users = useQuery('users',fetchData)
  if(users.isLoading) return <p className={styles.loading}>Loading...</p>
  if(users.isError) return <p className={styles.error}>Network Error</p>
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          with <span style={{color:'lightblue'}}>react query</span> page
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/with-react-query.js</code>
        </p>
        <div>
          {users ? users.data?.map((user) => (
            <p
              key={user.id}
              onClick={() => router.push(`/with-react-query/${user.id}`)}
              style={{cursor:'pointer'}}
            >
              {user.name}
            </p>
          )):'data is not found'}
        </div>

        <div style={{width:'100%',display:'flex',}}>
          <Link href={'/'}>
            <a style={{margin:'0 4px',width:'calc(100% / 2 - 8px)',border:'1px solid gray',textAlign:'center',borderRadius:'10px'}}>
              <p>back to Home</p>
            </a>
          </Link>
          <Link href={'/with-useEffect'}>
            <a style={{margin:'0 4px',width:'calc(100% / 2 - 8px)',border:'1px solid gray',textAlign:'center',borderRadius:'10px'}}>
              <p>with useEffect page</p>
            </a>
          </Link>
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default WithReactQuery;
