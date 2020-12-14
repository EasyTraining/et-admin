export const calcAnalysis = (questions) => {
  let questionCount = 0;
  let gradeCount = 0;
  let easyCount = 0;
  let normalCount = 0;
  let hardCount = 0;
  questions.forEach((item) => {
    questionCount += 1;
    gradeCount += item.grade || 0;
    if (item.level === "EASY") {
      easyCount += 1;
    }
    if (item.level === "NORMAL") {
      normalCount += 1;
    }
    if (item.level === "HARD") {
      hardCount += 1;
    }
  });
  return {
    questionCount,
    gradeCount,
    easyCount,
    normalCount,
    hardCount,
  };
};

export const initLibraryList = (libraryList, checkedQuestions) => {
  const selectedQuestionIds = checkedQuestions.map((item) => item.from_question_id);
  return libraryList.map((library) => {
    library.questions = (library.questions || []).map((question) => {
      question.checked = selectedQuestionIds.includes(question.id);
      return question;
    });
    return library;
  });
};

export const getCheckedQuestions = (libraryList) => {
  const questions = [];
  libraryList.forEach((library) => {
    (library.questions || []).forEach((question) => {
      const { checked, ...rest } = question;
      if (checked) {
        questions.push({
          ...rest,
          from_library_id: library.id,
          from_library_name: library.name,
          from_question_id: question.id,
          sort: question.sort || 1,
        });
      }
    });
  });
  return questions;
};

export const uncheckQuestion = (libraryList, questionId) => {
  return libraryList.map((library) => {
    library.questions = (library.questions || []).map((question) => {
      if (question.id === questionId) question.checked = false;
      return question;
    });
    return library;
  });
};

export const setQuestionCheck = (libraryList, libraryId, questionId, checked) => {
  return libraryList.map((library) => {
    if (library.id === libraryId) {
      library.questions.map((question) => {
        if (question.id === questionId) {
          question.checked = checked;
        }
        return question;
      });
    }
    return library;
  });
};
