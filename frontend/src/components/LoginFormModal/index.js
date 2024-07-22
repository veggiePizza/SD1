// import React, { useState } from 'react';

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Add your form submission logic here
//     console.log('Email:', email);
//     console.log('Password:', password);
//   };

//   return (
//     <div className="logInForm">
//       <h1 className="">Welcome back!</h1>
//       <p className="text-start">Login to your account!</p>
//       <form onSubmit={handleSubmit}>
//         <ul>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               required
//               className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//             <br></br>
//             <br></br>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder='Password'
//               required
//               className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//             <br></br>
//             <br></br>
//             <div className='center'> 
//             <button type="submit" className="center-horizontal">Log In</button>

//             </div>
//         </ul>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;
import React, { useState } from 'react';
import './LoginForm.css'; // Make sure to import your CSS file

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <div className="login-form-container">
      <div className="login-form">
        <h1>Welcome back!</h1>
        <p className="login-text">Login to your account!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="input-field"
          />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="input-field"
          />
          <button type="submit" className="submit-button">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;