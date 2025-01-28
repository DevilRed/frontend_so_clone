import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions, setPage } from "../redux/slices/questionSlice";
import { QuestionList } from "./questions/QuestionList";
import { Spinner } from "./layouts/Spinner";

export const Home = () => {
  const dispatch = useDispatch();
  const { questions, loading, page } = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(fetchQuestions({ page }));
  }, [dispatch, page]);

  const fetchNexPrevQuestionPage = (link) => {
    const url = new URL(link);
    dispatch(setPage(Number(url.searchParams.get("page"))));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-3">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="row my-5">
        <div className="col-md-10 mx-auto">
          <div className="row">
            <QuestionList fetchQuestionsPage={fetchNexPrevQuestionPage} />
          </div>
        </div>
      </div>
    </>
  );
};
