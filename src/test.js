const data = [
  {
    id: 1,
    description: "this is a d1",
    priority: "2 - High",
  },
  {
    id: 2,
    description: "this is a d2",
    priority: "1 - Critical",
  },
  {
    id: 3,
    description: "[CRITICAL] this is a d3",
    priority: "3 - Medium",
  },
  {
    id: 4,
    description: "this is a d4",
    priority: "4 - Low",
  },
  {
    id: 5,
    description: "URGENT this is a d4",
    priority: "4 - Low",
  },
  {
    id: 6,
    description: "this is a d4",
    priority: "4 - Low",
  },
  {
    id: 7,
    description: "CRITICAL this is a d4",
    priority: "2 - High",
  },
  {
    id: 8,
    description: "this is a d4 HIGH",
    priority: "4 - Low",
  },
  {
    id: 9,
    description: "this is a d4",
    priority: "4 - Low",
  },
  {
    id: 10,
    description: "this is a d4",
    priority: "2 - High",
  },
  {
    id: 11,
    description: "this is a d4",
    priority: "4 - Low",
  },
  {
    id: 12,
    description: "this is a d4",
    priority: "4 - Low",
  },
  {
    id: 13,
    description: `this is a d4. I would 
    like to understand how this exactly works. This is a multiline description.
    Short description: cannot access Dynamics AX.Please treat this as urgent.`,
    priority: "4 - Low",
  },
  {
    id: 14,
    description: `Short description: this is emerGenCY a d4. Even i should not go to new lines.
    But there could be a possibility that i may move to 
    multiple lines to keep the clarity.
    Country: Australia
    Description: I am not able to do any modification on sales orders.Please try to resolve the issues as quickly as possible.
    `,
    priority: "4 - Low",
  },
  {
    id: 15,
    description: "this is a d4",
    priority: "2 - High",
  },
];

const keywords = ["high", "critical", "urgent", "important", "emergency"];
const innerFlaggedWords = ["Short description:"];
const high = "2 - High";
const critical = "1 - Critical";
const filteredArray = data.filter((ele, index) => {
  //return ele["description"].toLowerCase().includes("critical");
  //return ele["priority"] === "1 - Critical" || ele["priority"] === "2 - High";
  const foundKeywords = keywords.some((eachKeyword) =>
    ele["description"].toLowerCase().includes(eachKeyword.toLowerCase())
  );
  const firstNewLineIndex = ele["description"].indexOf("\n");
  let substringSearch = "Short description:";
  if (ele["description"] === substringSearch) {
    ele["description"] = ele["description"].substring(18, firstNewLineIndex);
  }
  const criticalPriority = ele["priority"] === critical;
  const highPriority = ele["priority"] === high;
  return foundKeywords || criticalPriority || highPriority;
});

const filteredArray1 = data
  .filter((ele) => {
    // Check if any keyword is found in the description
    const foundKeywords = keywords.some((eachKeyword) =>
      ele["description"].toLowerCase().includes(eachKeyword.toLowerCase())
    );

    // Extract text till the first newline, if it exists
    const firstNewLineIndex = ele["description"].indexOf("\n");

    if (firstNewLineIndex !== -1) {
      ele["description"] = ele["description"].substring(0, firstNewLineIndex);
    }

    // Handle the case where description starts with "Short description:"
    const substringSearch = "Short description:";
    if (ele["description"].startsWith(substringSearch)) {
      // Strip the description starting from index 18 (after "Short description:") till the first newline
      ele["description"] = ele["description"].substring(
        18,
        // if there is new line or not equal to -1 then strip till first new line ,
        // if there is no new line or equal to -1 then strip till whole length.
        firstNewLineIndex !== -1 ? firstNewLineIndex : ele["description"].length
      );
    }

    // Filter based on priority
    const criticalPriority = ele["priority"].includes("Critical");
    const highPriority = ele["priority"].includes("High");

    // Return if any keyword is found or if the priority is "Critical" or "High"
    return foundKeywords || criticalPriority || highPriority;
  })
  .map((ele) => {
    // Modify the filtered array by stripping the description till the first new line
    const firstNewLineIndex = ele["description"].indexOf("\n");

    if (firstNewLineIndex !== -1) {
      ele["description"] = ele["description"].substring(0, firstNewLineIndex);
    }
    return ele;
  });

function cl(...args) {
  console.log(...args);
}

cl(filteredArray1);
