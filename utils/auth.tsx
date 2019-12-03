import { useEffect } from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import { NextPageContext, NextPage } from 'next'

export const login = ({ token }: any) => {
  cookie.set('token', token, { expires: 1 })
  Router.push('/profile')
}

export const auth = (ctx: NextPageContext) => {
  const { token } = nextCookie(ctx)

  // If there's no token, it means the user is not logged in.
  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res ? ctx.res.writeHead(302, { Location: '/login' }) : null
      ctx.res ? ctx.res.end() : null
    } else {
      Router.push('/login')
    }
  }

  return token
}

export const logout = () => {
  cookie.remove('token')
  // to support logging out from all windows
  window.localStorage.setItem('logout', String(Date.now()))
  Router.push('/login')
}

export const withAuthSync = (WrappedComponent: NextPage) => {
  const Wrapper = (props: any) => {
    const syncLogout = (event: StorageEvent) => {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        Router.push('/login')
      }
    }

    useEffect(() => {
      window.addEventListener('storage', syncLogout)

      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('logout')
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  Wrapper.getInitialProps = async (ctx: NextPageContext) => {
    const token = auth(ctx)

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx))

    return { ...componentProps, token }
  }

  return Wrapper
}
