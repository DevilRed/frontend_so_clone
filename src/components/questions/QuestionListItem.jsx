import { Link } from "react-router-dom";

export const QuestionListItem = ({ question }) => {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <div className="row">
          <div className="col-md-2 d-flex flex-column align-items-end">
            <span className="text-muted">{question?.score}</span>
            <div className="d-flex align-items-center">
              {question?.answers?.map((answer) =>
                answer.best_answer ? (
                  <i
                    className="bi bi-check h3 bg-success text-white mt-2"
                    key={answer.id}
                  ></i>
                ) : (
                  ""
                )
              )}
              <span
                className={`${
                  question?.answers?.length
                    ? "text-success border border-success p-1"
                    : "text-muted"
                }`}
              >
                {question?.answerCount}
              </span>
            </div>
            <span className="text-muted">{question?.viewCount}</span>
          </div>
          <div className="col-md-10 d-flex flex-column align-items-start">
            <h5 className="mb-3">
              <Link
                to={`/question/${question?.slug}`}
                className="text-decoration-none"
              >
                {question.title}
              </Link>
            </h5>
            <div className="d-flex align-self-end">
              <img
                src={question?.user?.image}
                alt="user image"
                className="rounded-circle"
                width={30}
                height={30}
              />
              <span className="text-primary mx-2">{question?.user?.name}</span>
              <span className="text-muted">{question?.created_at}</span>
            </div>
            <div className="d-flex flex-wrap">
              {question?.tags?.map((tag, index) => (
                <span key={index} className="badge bg-primary me-1">
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
