import React,{ useState} from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "",confirmPassword:"" });
  const navigate = useNavigate(); // Modern alternative for history

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response = await fetch('http://localhost:8000/api/auth/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
          });

          const json = await response.json();
          console.log(json);

          if (response.ok) {
              localStorage.setItem('token', json.token);
              props.showAlert("Registration successful!", "success");
              navigate('/'); // Redirect after login
          } else {
              props.showAlert(json.error || "Login failed!", "danger");
          }

      } catch (error) {
          props.showAlert("An unexpected error occurred!", "danger");
      }
  };

  const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className='container'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}> 
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} placeholder="Enter your full name" required />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter your email" required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} placeholder="Enter your password" required />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={onChange} placeholder="Confirm your password" required />
        </div>

        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
