# Description of react query([Official](https://react-query.tanstack.com/))

## React Queryとは

「Reactにおける非同期データのためのフェッチ、キャッシュ、更新」のライブラリであり、「サーバ状態管理」のライブラリである。

キャッシュを使いデータ取得、更新の状態管理を行うライブラリである。

## Stale-While-Revalidate（SWR）とは

Stale（古くなったもの）-While（〜の間）-Revalidate（再検証）なので、「再検証している間は古いキャッシュを返す」という認識で良いかと思う。

react-queryはこの`Stale-While-Revalidate`を応用したライブラリである

## 前提知識と環境構築

`cacheTime` データをキャッシュし、保持する時間。デフォルトは5分

`staleTime` キャッシュしたデータが古くなったとみなす時間を指す。デフォルトは0。

`staleTime`が0の場合、もしく`staleTime`を超えた場合は再検証が行われる(SWR)

### 環境構築(_app.tsx)

```_app.jsx
import {QueryClient} from 'react-query'

const queryClient = new QueryClient()
```
新しいインスタンスを生成する。この時にデフォルトの設定もすることが可能
```_app.jsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000 //デフォルトのstaleTimeを設定
    }
  }
})
```
最終的には以下のようになる

```_app.tsx
import '../styles/globals.css'
import type { AppProps } from 'next/app'
//react-query packages
import {QueryClientProvider,QueryClient} from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000 //デフォルトのstaleTimeを設定
    }
  }
})

const MyApp = ({ Component, pageProps }: AppProps) => {
//QueryClientProviderでラップしclientに先程作成したqueryClientを渡す
  return (
    <QueryClientProvider client={queryClient}> 
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
export default MyApp
```

### devtools

react queryには開発者用のdevtoolが用意されている

```_app.tsx
import { ReactQueryDevtools } from 'react-query/devtools'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

## useQuery

データ取得時に使うHooks(読み取り)

基本構文
```sample.js
const sample = useQuery('key',fetchFunction)
```
```sample.js
const {data,isLoading,isError} = useQuery('key',fetchFunction)
```
`key`に一意の値を入れる(例えばuser一覧なら'users'など) 

`key`は柔軟に設定でき、下記のような設定も可能
```sample.js
const {data,isLoading,isError} = useQuery(['key',id],fetchFunction)
```
オプション設定も可能
```sample.js
const {data,isLoading,isError} = useQuery(['key',id],() =>fetchFunction(id),{ enabled: !!id })
```
上記の`enabled: !!id`という設定では`id`が存在する場合のみデータを取得させることができる

`data` ・・・ fetchしたデータが格納されている   

`isLoading` ・・・ loading状態をboolにて取得できる  

`isError` ・・・ データ取得に失敗(400や500など)した際に`true`となる  

他にも多数あるので詳細は公式で確認してください。


## useMutation

データの更新時(書き込み)に使用するHooks

基本構文

```sample.ts
const sampleMutate = useMutation(updateFunction)
```
```sample.ts
const {mutate} = useMutation(updateFunction)
```

オプションも設定可能

```sample.ts
const {mutate} = useMutation(updateFunction,{
  onSuccess: () => {
   //更新に成功した際の処理
  },
  onError： () => {
    //エラー時の処理
  }
})
```

使用例

```sample.ts
const {mutate} = useMutation(() =>updateFunction(data),{
  onSuccess: () => {
   //更新に成功した際の処理
  },
  onError： () => {
    //エラー時の処理
  }
})

<button onClick={() => mutate({ id , name })}>
  Create 
</button>
```

## useQueryClient

キャッシュを操作する際に使用(QueryClientインスタンスを返却)

```sample.ts
import { useQueryClient } from 'react-query'
 
 const queryClient = useQueryClient()

```

よく使うメソッド

#### queryClient.getQueryData

すでにキャッシュされているデータを取得する際に使用。キャッシュが存在しない場合は`undefined`が返却される
```sample.ts
const data = queryClient.getQueryData('key')
```

#### queryClient.invalidateQueries

すでにキャッシュが存在する状態で`key`に指定したキャッシュを無効化し、再フェッチする

```sample.ts
queryClient.invalidateQueries('key')
```
