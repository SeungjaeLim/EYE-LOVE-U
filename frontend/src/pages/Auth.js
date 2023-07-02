import Login from '../components/Login';

export default function Auth( {setUserId }) {
  return (
    <div>
      <Login setUserId={setUserId} />
    </div>
  );
}