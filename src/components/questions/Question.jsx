import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Parser } from "html-to-react";
import { fetchQuestionBySlug } from "../../redux/slices/questionSlice";
import { Spinner } from "../layouts/Spinner";

export const Question = () => {
  const dispatch = useDispatch();
  const { question, loading, error } = useSelector((state) => state.questions);
  const { slug } = useParams();
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchQuestionBySlug({ slug }));
  }, [slug, dispatch]);

  if (error) {
    return (
      <div className="row my-5">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <div className="alert alert-danger my-3">{error}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (loading || !question) {
    return (
      <div className="d-flex justify-content-center my-3">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="row my-5">
      <div className="col-md-10 mx-auto">
        <div className="card">
          <div className="card-header bg-white">
            <h4 className="my-4">{question?.title}</h4>

            <div className="d-flex align-self-end">
              <img
                src={question?.user?.image}
                alt="user image"
                className="rounded-circle me-2"
                width={30}
                height={30}
              />
              <span className="text-primary me-2">{question?.user?.name}</span>
              <span className="text-danger me-2">
                Asked {question?.created_at}
              </span>
              <span className="text-dark">{question?.viewCount}</span>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-3 d-flex flex-column align-itesm-center">
                {isLoggedIn ? (
                  <span className="voteUp">
                    <i className="bi bi-arrow-up-circle h2"></i>
                  </span>
                ) : (
                  <Link to="/login" className="voteUp">
                    <i className="bi bi-arrow-up-circle h2"></i>
                  </Link>
                )}

                <span className="fw-bold">{question?.score}</span>

                {isLoggedIn ? (
                  <span className="voteDown">
                    <i className="bi bi-arrow-down-circle h2"></i>
                  </span>
                ) : (
                  <Link to="/login" className="voteDown">
                    <i className="bi bi-arrow-down-circle h2"></i>
                  </Link>
                )}
              </div>
              <div className="col-md-7">{Parser().parse(question?.body)}</div>
            </div>
          </div>
        </div>
        {question?.tags?.length > 0 && (
          <div className="card-footer bg-white">
            <div className="d-flex flex-wrap">
              {question?.tags?.map((tag, index) => (
                <span key={index} className="badge bg-primary me-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
