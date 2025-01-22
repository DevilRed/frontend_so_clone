import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "../layouts/Spinner";
import useValidation from "../../hooks/useValidation";

export const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors([]);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/register",
        user
      ); // from 7.1 min 24.00
      setSubmitting(false);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      setSubmitting(false);
      if (error?.response?.status === 422) {
        setErrors(error.response.data.errors);
      }
      console.log(error);
    }
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
                  {useValidation(errors, "name")}
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
                  {useValidation(errors, "email")}
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
                  {useValidation(errors, "password")}
                </div>
                <div className="mb-3">
                  {submitting ? (
                    <Spinner />
                  ) : (
                    <button className="btn btn-sm btn-dark" type="submit">
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
