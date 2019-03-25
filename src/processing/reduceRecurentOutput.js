const reduceRecurentOutput = output => (
  output.reduce(
    ({ tables: prevTables, attributes: prevAttributes }, { tables: currTables, attribute }) => {
      const newTables = [...prevTables, ...currTables];
      const newAttributes = [...prevAttributes];
      if (attribute) newAttributes.push(attribute);

      return {
        tables: newTables,
        attributes: newAttributes,
      };
    },
    { tables: [], attributes: [] },
  )
);

export default reduceRecurentOutput;
