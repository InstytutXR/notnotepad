const makeBlock = block => {
  return {
    type: "text",
    message0: "%1",
    args0: [
      {
        type: "field_input",
        name: "text_input",
        text: ""
      }
    ],
    previousStatement: null,
    nextStatement: null,
    tooltip: "just enter some text",
    helpUrl: ""
  };
};
export default makeBlock;
