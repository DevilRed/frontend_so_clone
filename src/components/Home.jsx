import { useEffect, useState } from "react";
import { getEnvironments } from "../helpers/getEnvironments";
import axios from "axios";
import { QuestionList } from "./questions/QuestionList";
import { Spinner } from "./layouts/Spinner";

export const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { VITE_BASE_URL } = getEnvironments();

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${VITE_BASE_URL}/api/questions?page=${page}`
        );
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [page]);

  const fetchNexPrevQuestionPage = (link) => {
    const url = new URL(link);
    setPage(url.searchParams.get("page"));
  };

  if (loading) {
    return (
      <div className="d-flex- justify-content-cente my-3">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="row my-5">
        <div className="col-md-10 mx-auto">
          <div className="row">
            <QuestionList
              questions={questions}
              fetchQuestionsPage={fetchNexPrevQuestionPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};
