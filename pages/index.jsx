import Layout from '../components/layout'
import { getCookie } from 'cookies-next';
import Link from 'next/link'

export default function HomePage({ username }) {
  return (
    <Layout pageTitle="Home">
      <header>
        <nav className="navbar">
          <div className="logo">
            <Link href="/">Voting Website</Link>
          </div>
          <div className="nav-links">
            <ul>
              {username ? (
                <>
                  <li>
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li>
                    <button className="logout-button">
                      <Link href="/api/logout">Logout</Link>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/signup">Signup</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
      {/* <div className="container">
        <h2>Home</h2>
        <div className="input-container">
          <input
            minLength="3"
            name="username"
            id="username"
            type="text"
            placeholder="Username"
            required
          />
          <input
            minLength="5"
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            required
          />
        </div> */}
        {/* <div className="button-container">
          <button className="auth-button">
            <Link href="/login">Login</Link>
          </button>
          <button className="auth-button">
            <Link href="/signup">Signup</Link>
          </button>
        </div> */}
      {/* </div> */}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const req = context.req
  const res = context.res
  var username = getCookie('username', { req, res });
  if (username == undefined) {
    username = false;
  }
  return { props: { username } };
}
