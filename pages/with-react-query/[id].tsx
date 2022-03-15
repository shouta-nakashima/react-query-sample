import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import {getAsString} from '../../src/lib/helper'
import { useQuery , useQueryClient } from 'react-query'
import {fetchUser} from '../../src/lib/users'
import Link from "next/link";
import { dataType } from "../../src/types/users";
import Footer from '../../src/components/Footer'

const WithReactQueryUser = () => {
  const router = useRouter()
  const userId = getAsString(router.query.id)

  const queryClient = useQueryClient()
  const usersData:dataType[] | undefined = queryClient.getQueryData('users')

  const options = usersData && usersData.map((user) => {
    let values = {value:'',label:''}
    values.value = String(user.id)
    values.label = user.name
    return values
  })

  const {data,isLoading,isError} = useQuery(['user',userId],() =>fetchUser(userId),{ enabled: !!userId })
  if(isLoading) return <p className={styles.loading}>Loading...</p>
  if(isError) return <p className={styles.error}>Network Error</p>
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          User with <span style={{color:'lightblue'}}>react query</span>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/with-react-query/[id].tsx</code>
        </p>

        <div className={styles.select}>
          <select  onChange={(e) => router.push(`/with-react-query/${ e.target.value }`)}>
            <option value={''}>選択して下さい</option>
            {options && options.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <p>Hi! my name is {data && data.name}!</p>
        <p>Nickname is {data && data.username}</p>
        <p>Contact us at {data && data.email}!</p>

        <div style={{width:'100%',display:'flex',}}>
          <Link href={'/'}>
            <a style={{margin:'0 4px',width:'calc(100% / 2 - 8px)',border:'1px solid gray',textAlign:'center',borderRadius:'10px'}}>
              <p>back to Home</p>
            </a>
          </Link>
          <Link href={'/with-react-query'}>
            <a style={{margin:'0 4px',width:'calc(100% / 2 - 8px)',border:'1px solid gray',textAlign:'center',borderRadius:'10px'}}>
              <p>back with react query page</p>
            </a>
          </Link>
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default WithReactQueryUser;
