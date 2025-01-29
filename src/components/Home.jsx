import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestions,
  fetchNextPrevPage,
  filterQuestionsByTag,
  filterQuestionsByUser,
  clearFilter,
} from "../redux/slices/questionSlice";
import { QuestionList } from "./questions/QuestionList";
import { Spinner } from "./layouts/Spinner";

export const Home = () => {
  const dispatch = useDispatch();
  const { showAll, loading, page, choosenTag, choosenUser } = useSelector(
    (state) => state.questions
  );

  useEffect(() => {
    dispatch(fetchQuestions({ page, choosenTag, choosenUser }));
  }, [dispatch, page, choosenTag, choosenUser]);

  const handleFetchNextPrevQuestionPage = (url) => {
    dispatch(fetchNextPrevPage(url));
  };
  const handleFilterByTag = (tag) => dispatch(filterQuestionsByTag(tag));
  const handleClearFilter = () => dispatch(clearFilter());

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
            {showAll && (
              <div className="col-md-12">
                <div className="mb-2">
                  <button className="btn btn-dark" onClick={handleClearFilter}>
                    All questions
                  </button>
                </div>
              </div>
            )}
            <QuestionList
              fetchQuestionsPage={handleFetchNextPrevQuestionPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};
