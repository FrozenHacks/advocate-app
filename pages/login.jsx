import Layout from '../components/layout'
import { getCookie } from 'cookies-next';
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function LoginPage({ username, uniqueid }) {
  const router = useRouter()
  const { msg } = router.query

  const handleBack = () => {
    router.push('/');
  };

  return (
    <Layout pageTitle="Login">
      <div className="container">
        {/* <Link href="/">Home</Link> */}
        <p>Welcome to Voting Site</p>
        {msg ? (
          <h3 className="red">{msg}</h3>
        ) : (
          <></>
        )}
        <h2>Log in</h2>
        <div className="login-form">
          <form action="/api/login" method="POST">
            <input
              minLength="3"
              name="username"
              id="username"
              type="text"
              placeholder="Username"
              required
              className="text-input"
            />
            <br />
            <input
              minLength="5"
              name="password"
              id="password"
              type="password"
              placeholder="Password"
              required
              className="text-input"
            />
            <br />
            <input type="submit" value="Login" />
            <input type="button" value="Back"  onClick={handleBack}/>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const req = context.req
  const res = context.res
  var username = getCookie('username', { req, res });
  var uniqueid = getCookie('uniqueid', { req, res });
  if (username != undefined) {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  }
  return { props: { username: false, uniqueid: false } };
}
