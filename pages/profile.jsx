import { useState } from 'react';
import Layout from '../components/layout';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clientPromise from '../lib/mongodb';

export default function ProfilePage({ username, created, uniqueid }) {
  const [selectedOption, setSelectedOption] = useState('');
  const router = useRouter();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleVoteSubmit = (e) => {
    e.preventDefault();
    // Here you can implement the logic to submit the vote
    console.log('Vote submitted:', selectedOption);
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <Layout pageTitle="Profile">
      <header>
        <nav className="navbar">
          <div className="logo">
            <Link href="/">Voting Website</Link>
          </div>
         
        </nav>
      </header>
      <div className="content-container">
        <h2>{username}'s Profile</h2>
        <p>Account created at <strong>{created}</strong></p>
        <p>Voting ID <strong>{uniqueid}</strong></p>
        <div className="voting-pool-container">
          <h3>Voting Pool</h3>
          <form onSubmit={handleVoteSubmit}>
            <div className="voting-option">
              <input
                type="radio"
                id="option1"
                name="votingOption"
                value="Option 1"
                checked={selectedOption === 'Option 1'}
                onChange={handleOptionChange}
              />
              <label htmlFor="option1">Vivin</label>
              <hr />
            </div>
            <div className="voting-option">
              <input
                type="radio"
                id="option2"
                name="votingOption"
                value="Option 2"
                checked={selectedOption === 'Option 2'}
                onChange={handleOptionChange}
              />
              <label htmlFor="option2">Shasanth</label>
              <hr />
            </div>
            <div className="voting-option">
              <input
                type="radio"
                id="option3"
                name="votingOption"
                value="Option 3"
                checked={selectedOption === 'Option 3'}
                onChange={handleOptionChange}
              />
              <label htmlFor="option3">Faaz</label>
              <hr />
            </div>
            <button type="submit">Vote</button>
            <button type="button" onClick={handleBack}>Back</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  var username = getCookie('username', { req, res });
  var uniqueid = getCookie('uniqueid', { req, res });
  if (username == undefined) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    };
  }
  const client = await clientPromise;
  const db = client.db('Users');
  const users = await db
    .collection('Profiles')
    .find({ Username: username })
    .toArray();
  const userdoc = users[0];
  const created = userdoc['Created'];
  return {
    props: { username: username, created: created, uniqueid: uniqueid }
  };
}
