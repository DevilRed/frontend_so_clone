import { Parser } from "html-to-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Answer = ({ answer, question }) => {
  const voteAnswer = async () => {
    console.log("vote answer");
  };
  const { isLoggedIn, token, user } = useSelector((state) => state.user);

  return (
    <div className="card my-2">
      <div className="card-body">
        <div className="row">
          <div className="col-md-3 d-flex flex-column align-items-center">
            {isLoggedIn ? (
              <span
                className="voteUp"
                onClick={() => voteAnswer(answer.id, "up")}
              >
                <i className="bi bi-arrow-up-circle h2"></i>
              </span>
            ) : (
              <Link to="/login" className="voteUp">
                <i className="bi bi-arrow-up-circle h2"></i>
              </Link>
            )}

            <span className="fw-bold">{answer?.score}</span>

            {isLoggedIn ? (
              <span
                className="voteDown"
                onClick={() => voteAnswer(answer.id, "down")}
              >
                <i className="bi bi-arrow-down-circle h2"></i>
              </span>
            ) : (
              <Link to="/login" className="voteDown">
                <i className="bi bi-arrow-down-circle h2"></i>
              </Link>
            )}
          </div>
          <div className="col-md-7">{Parser().parse(answer?.body)}</div>
        </div>
      </div>
      <div className="card-footer">
        <div className="d-flex justify-content-between bg-white">
          <div className="d-flex">
            <img
              src={answer?.user?.image}
              alt="user image"
              className="rounded-circle me-2"
              width={30}
              height={30}
            />
            <span className="text-primary me-2">{answer?.user?.name}</span>
            <span className="text-danger me-2">Asked {answer?.created_at}</span>
          </div>
          {isLoggedIn &&
            question.user.id === user.id &&
            !answer.best_answer && (
              <button className="btn btn-sm btn-success">
                Mark as best answer
              </button>
            )}
        </div>
      </div>
    </div>
  );
};
