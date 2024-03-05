## Getting Started

```
> npm i prisma -D
> npm pirsma init
프리즈마 폴더가 생기고 .env 파일이 생성됨

> brew install planet-scale/tap/pscale
// > brew install mysql-client
> brew upgrade pscale
> pscale
> pscale auth login
> pscale region list
> pscale database create wallet-verification --region ap-northeast-2

> npm install @prisma/client
> npx prisma db push
> npx prisma generate

```

First, run the development server:

```
> pscale auth login
> pscale connect wallet-verification
> npx prisma studio
```

```
> npx prisma generate
> npx prisma db push
```
