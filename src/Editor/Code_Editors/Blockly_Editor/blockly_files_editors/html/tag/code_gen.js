const makeBlockCode = block => {
  const TagName = block.name;
  const attribute = "attribute_input";
  const body = "tag_body_input";
  const haveMetadata = block.hasOwnProperty("metadata");
  const nextStatement = "nextStatement";
  const attributeExist =
    haveMetadata && block.metadata.hasOwnProperty("noAttributes")
      ? !block.metadata.noAttributes
      : true;
  const bodyExist =
    haveMetadata && block.metadata.hasOwnProperty("nobody")
      ? !block.metadata.nobody
      : true;
  const notLast =
    haveMetadata && block.metadata.hasOwnProperty("last")
      ? !block.metadata.last
      : true;

  let statement_inputs = [];
  if (attributeExist) statement_inputs.push(attribute);
  if (bodyExist) statement_inputs.push(body);
  return {
    name: TagName,
    blockText:
      "<" +
      (block.metadata.openTag || TagName) +
      (attributeExist ? "%" + attribute + "%" : "") +
      ">\n" +
      (bodyExist ? "%" + body + "%" : "") +
      "\n</" +
      (block.metadata.closeTag || TagName) +
      ">" +
      (notLast ? "%" + nextStatement + "%" : ""),

    statement_inputs: statement_inputs,
    value_inputs: [],
    field_values: [],
    nextStatement: { exist: notLast, str: nextStatement }
  };
};
export default makeBlockCode;
