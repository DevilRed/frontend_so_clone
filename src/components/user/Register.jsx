import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const [submitting, isSubmitting] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <div className="container">
      <div className="row my-5">
        <div className="md-6 mx-auto">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="text-center mt-2">Register</h5>
            </div>
            <div className="card-body">
              <form
                action=""
                className="mt-5"
                onSubmit={(e) => registerUser(e)}
              >
                <div className="mb-3">
                  <label htmlFor="name">Name*</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    onChange={(e) =>
                      setUser({
                        ...user,
                        name: e.target.value,
                      })
                    }
                    value={user.name}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    onChange={(e) =>
                      setUser({
                        ...user,
                        email: e.target.value,
                      })
                    }
                    value={user.email}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password">Password*</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    onChange={(e) =>
                      setUser({
                        ...user,
                        password: e.target.value,
                      })
                    }
                    value={user.password}
                  />
                </div>
                <div className="mb-3">
                  <button className="btn btn-sm btn-dark" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
