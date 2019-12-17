import nextCookie from 'next-cookies'
import Layout from '../components/layout'
import { withAuthSync } from '../utils/auth'
import { NextPage } from 'next'
import { useEffect, HtmlHTMLAttributes } from 'react'

const Dashboard: NextPage<any> = props => {
  useEffect(() => {
    const divElement = document.getElementById('viz1576551388224') as HTMLElement
    const vizElement = divElement.getElementsByTagName('object')[0]
    vizElement.style.width = '1480px'
    vizElement.style.height = '1427px'
    const scriptElement = document.createElement('script')
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js'
    ;(vizElement.parentNode as HTMLElement).insertBefore(scriptElement, vizElement)
  }, [])

  return (
    <Layout isLoggedIn={props.isLoggedIn}>
      <div className="w-100 bg-gray-300">
        <div className="tableauPlaceholder m-auto relative" id="viz1576551388224">
          <noscript>
            <a href="#">
              <img
                className="border-none"
                alt=" "
                src="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ba&#47;BasilCXSupermarketsinDubai&#47;DubaiSupermarkets&#47;1_rss.png"
              />
            </a>
          </noscript>
          <object className="tableauViz display-hidden">
            <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
            <param name="embed_code_version" value="3" />
            <param
              name="path"
              value="views&#47;BasilCXSupermarketsinDubai&#47;DubaiSupermarkets?:embed=y&amp;:display_count=y"
            />
            <param name="toolbar" value="yes" />
            <param
              name="static_image"
              value="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ba&#47;BasilCXSupermarketsinDubai&#47;DubaiSupermarkets&#47;1.png"
            />
            <param name="animate_transition" value="yes" />
            <param name="display_static_image" value="yes" />
            <param name="display_spinner" value="yes" />
            <param name="display_overlay" value="yes" />
            <param name="display_count" value="yes" />
          </object>
        </div>
      </div>
    </Layout>
  )
}

Dashboard.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx)

  let isLoggedIn = false
  token ? (isLoggedIn = true) : null
  return { isLoggedIn }
}

export default withAuthSync(Dashboard)
