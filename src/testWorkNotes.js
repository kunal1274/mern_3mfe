// Helper function to parse and group work notes correctly by date
/*
const groupWorkNotesByDate = (workNotesString) => {
  const workNotes = [];
  const regex = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/g; // Regex to match the timestamp
  let matches;
  let currentIndex = 0;

  // Loop through each match (each timestamp)
  while ((matches = regex.exec(workNotesString)) !== null) {
    if (currentIndex !== 0) {
      // Push the previous note into the array (from the last match to current match)
      workNotes.push(
        workNotesString.substring(currentIndex, matches.index).trim()
      );
    }
    // Update currentIndex to start at this match
    currentIndex = matches.index;
  }

  // Push the final note after the last timestamp
  workNotes.push(workNotesString.substring(currentIndex).trim());

  // Group the notes by date
  const notesByDate = {};
  workNotes.forEach((note) => {
    const date = note.match(/\d{4}-\d{2}-\d{2}/)[0]; // Extract only the date part
    if (!notesByDate[date]) {
      notesByDate[date] = [];
    }
    notesByDate[date].push(note); // Group notes by date
  });

  // Concatenate notes for each date
  const concatenatedNotesByDate = {};
  Object.keys(notesByDate).forEach((date) => {
    concatenatedNotesByDate[date] = notesByDate[date].join("\n\n"); // Separate multiple notes by newlines
  });

  return concatenatedNotesByDate;
};

// Sample element with work notes
const ele = {
  "Work notes": `
      2024-09-23 19:56:38 - Purabi Samanta (Work Notes)
      Work Around soulit porivieo. This is for testing and we need to understand and we need to work on this.
  
      2024-09-23 02:45:12 - System (Work notes)
      Proposed as major incident
  
      2024-09-23 01:04:23 - Vinu(Work notes)
      Increasing the priority
  
      2024-09-18 13:32:35 - Purabi Samanta(Work notes)
      High Priority Ticket
  
      2024-09-17 21:34:34 - Faayx(Work notes)
      Hi Tracy,
      The Standaroerueo is not working as per expected behavior and we are working on it.
      Please reach out for further clarification.
      Thank you,
      Fayaze
    `,
};

// Group Work Notes by date and concatenate them for each day
if (ele["Work notes"]) {
  const groupedWorkNotes = groupWorkNotesByDate(ele["Work notes"]);

  // Get the latest date and its concatenated work notes
  const latestDate = Object.keys(groupedWorkNotes).sort(
    (a, b) => new Date(b) - new Date(a)
  )[0];
  ele["Latest Work Note"] = groupedWorkNotes[latestDate]; // Add the latest work note to the element
}

// Output the latest work note
console.log(ele["Latest Work Note"]);

// 2024-09-23 : Purabi Samanta (Work Notes)
// Work Around soulit porivieo. This is for testing and we need to understand and we need to work on this.
// System (Work notes)
// Proposed as major incident
// Vinu(Work notes)
// Increasing the priority
*/

// Helper function to parse and group work notes by date
const groupWorkNotesByDate = (workNotesString) => {
  const workNotes = [];
  const regex = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/g; // Regex to match the timestamp
  let matches;
  let currentIndex = 0;

  // Loop through each match (each timestamp)
  while ((matches = regex.exec(workNotesString)) !== null) {
    if (currentIndex !== 0) {
      // Push the previous note into the array (from the last match to current match)
      workNotes.push(
        workNotesString.substring(currentIndex, matches.index).trim()
      );
    }
    // Update currentIndex to start at this match
    currentIndex = matches.index;
  }

  // Push the final note after the last timestamp
  workNotes.push(workNotesString.substring(currentIndex).trim());

  // Group the notes by date
  const notesByDate = {};
  workNotes.forEach((note) => {
    const date = note.match(/\d{4}-\d{2}-\d{2}/)[0]; // Extract only the date part
    const content = note.replace(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} - /, ""); // Remove the timestamp from the content
    if (!notesByDate[date]) {
      notesByDate[date] = [];
    }
    notesByDate[date].push(content); // Group notes by date
  });

  // Concatenate notes for each date in the desired format
  const formattedNotesByDate = {};
  Object.keys(notesByDate).forEach((date) => {
    formattedNotesByDate[date] = `${date} :\n` + notesByDate[date].join("\n"); // Date followed by notes on new lines
  });

  return formattedNotesByDate;
};

// Sample element with work notes
const ele = {
  "Work notes": `
      2024-09-23 19:56:38 - Purabi Samanta (Work Notes)
      Work Around soulit porivieo. This is for testing and we need to understand and we need to work on this.
  
      2024-09-23 02:45:12 - System (Work notes)
      Proposed as major incident
  
      2024-09-23 01:04:23 - Vinu(Work notes)
      Increasing the priority
  
      2024-09-18 13:32:35 - Purabi Samanta(Work notes)
      High Priority Ticket
  
      2024-09-17 21:34:34 - Faayx(Work notes)
      Hi Tracy,
      The Standaroerueo is not working as per expected behavior and we are working on it.
      Please reach out for further clarification.
      Thank you,
      Fayaze
    `,
};

// Group Work Notes by date and concatenate them for each day in the required format
if (ele["Work notes"]) {
  const groupedWorkNotes = groupWorkNotesByDate(ele["Work notes"]);

  // Get the latest date and its concatenated work notes
  const latestDate = Object.keys(groupedWorkNotes).sort(
    (a, b) => new Date(b) - new Date(a)
  )[0];
  ele["Latest Work Note"] = groupedWorkNotes[latestDate]; // Add the latest work note to the element
}

// Output the latest work note
console.log(ele["Latest Work Note"]);
