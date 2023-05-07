import React, { FC, useEffect, useState } from "react";
import AddTextareaSection from "../Helper/AddTextareaSection";
import UploadImage from "../Helper/UploadImage";
import AddInputsSection from "../Helper/AddInputsSection";
import AddField from "../Helper/AddField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { StringLang } from "../../../types/common";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectCourseCourseQuestions,
  selectCourseIsSent,
  updateCourseQuestions,
} from "../../../store/slices/Admin/CourseSlice";
import {
  selectDiplomaDiplomaQuestions,
  selectDiplomaIsSent,
  updateDiplomaQuestions,
} from "../../../store/slices/Admin/DiplomSlice";

interface Params {
  type: "Course" | "Diploma";
}

interface AnswerElement extends StringLang {
  _id: string;
}

interface listElement {
  q: StringLang;
  a: AnswerElement[];
  _id: string;
}

const Questions: FC<Params> = ({ type }) => {
  let data: listElement[];
  let isSent: boolean;
  if (type === "Course") {
    data = useAppSelector(selectCourseCourseQuestions);
    isSent = useAppSelector(selectCourseIsSent);
  } else if (type === "Diploma") {
    data = useAppSelector(selectDiplomaDiplomaQuestions);
    isSent = useAppSelector(selectDiplomaIsSent);
  }

  const [collapse, setCollapse] = useState<boolean>(false);
  const [list, setList] = useState<listElement[]>(data);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setList(data);
  }, [data]);

  // redux
  useEffect(() => {
    if (type === "Course") dispatch(updateCourseQuestions(list));
    else dispatch(updateDiplomaQuestions(list));
  }, [isSent]);
  // ------------------|

  const addQuestion = () => {
    if (
      list.at(-1)?.q?.EN === "" ||
      list.at(-1)?.q?.AR === "" ||
      list.at(-1)?.a?.at(-1)?.AR === "" ||
      list.at(-1)?.a?.at(-1)?.EN === ""
    )
      return;

    setList((p) => [
      ...p,
      {
        q: {
          AR: "",
          EN: "",
        },
        a: [
          {
            AR: "",
            EN: "",
            _id: Date.now().toString(),
          },
        ],
        _id: Date.now().toString(),
      },
    ]);
  };

  const updateQuestion = (index: number) => (value: StringLang) => {
    setList((p) =>
      [...p].map((ele) =>
        +ele._id === index
          ? {
              ...ele,
              q: value,
            }
          : ele
      )
    );
  };

  const deleteQuestion = (e: string) => {
    setList((p) => {
      if (p.length <= 1) return p;
      return [...p].filter((e2) => e2._id !== e);
    });
  };

  const addAnswer = (qId: string) => () => {
    if (list.at(-1).a.at(-1).AR === "" || list.at(-1).a.at(-1).EN === "")
      return;

    setList((p) =>
      [...p].map((q) =>
        q._id === qId
          ? {
              ...q,
              a: [...q.a, { AR: "", EN: "", _id: Date.now().toString() }],
            }
          : q
      )
    );
  };

  const updateAnswer =
    (qId: string) => (aId: string) => (value: StringLang) => {
      setList((p) =>
        [...p].map((ele) => {
          if (ele._id === qId) {
            ele.a = ele.a.map((answer) =>
              answer._id === aId ? { ...value, _id: answer._id } : answer
            );
          }
          return ele;
        })
      );
    };

  const deleteAnswer = (qId: string) => (aId: string) => {
    setList((p) =>
      [...p].map((ele) => {
        if (ele._id == qId) {
          if (ele.a.length <= 1) return ele;
          return {
            ...ele,
            a: [...ele.a.filter((answer) => answer._id !== aId)],
          };
        }
        return ele;
      })
    );
  };

  return (
    <div className="my-2">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h3>Questions</h3>
        <FontAwesomeIcon
          className="fs-3"
          icon={collapse ? faCaretUp : faCaretDown}
          onClick={() => setCollapse((p) => !p)}
          role="button"
        />
      </div>
      {collapse && (
        <div>
          {list.map((ele, i) => (
            <div key={ele._id} className="position-relative">
              <AddInputsSection
                header="Question"
                update={updateQuestion(+ele._id)}
                value={list[i].q}
              />
              <h5 className="mb-3">Answers</h5>
              {list[i].a.map((answer, j) => (
                <div className="position-relative" key={answer._id}>
                  <AddInputsSection
                    key={answer._id}
                    header={null}
                    update={updateAnswer(ele._id)(answer._id)}
                    value={answer}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="position-absolute fs-5"
                    role="button"
                    style={{
                      top: 15,
                      right: -30,
                    }}
                    onClick={() => deleteAnswer(ele._id)(answer._id)}
                  />
                </div>
              ))}
              <AddField name="Add Answer" addFunction={addAnswer(ele._id)} />
              <FontAwesomeIcon
                className="position-absolute fs-4"
                icon={faTrash}
                onClick={() => deleteQuestion(ele._id)}
                role="button"
                style={{
                  top: 2,
                  right: 5,
                }}
              />
              <hr />
            </div>
          ))}
          <AddField dark name="Add Question" addFunction={addQuestion} />
        </div>
      )}
    </div>
  );
};

export default Questions;
