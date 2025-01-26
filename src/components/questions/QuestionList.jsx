import { QuestionListItem } from "./QuestionListItem";

export const QuestionList = ({ questions }) => {
  return (
    <>
      {questions?.data?.map((question) => (
        <QuestionListItem key={question.id} question={question} />
      ))}
    </>
  );
};
